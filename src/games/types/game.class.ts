import { HttpException, HttpStatus } from "@nestjs/common";
import { cloneDeep } from "lodash";
import { Game, GameDocument } from "../schema/game.schema";
import { Pit } from "../schema/pit.schema";

export class GameClass {
  private game: Game
  private gamesArray: Game[]
  private isFirstMove: boolean
  constructor(game: GameDocument) {
    this.game = game.toObject()
    this.gamesArray = []
    this.isFirstMove = true
  }

  movePiece(pit: number): Game[] | string {

    const halfPits = this.game.pitCount / 2;
    const p1AllowedPits = pit <= halfPits;
    const p2AllowedPits = pit > halfPits;
    const pitNumberExists = pit > 0 && pit <= this.game.pitCount;
    // CHECK IF PIT EXISTS
    if (!pitNumberExists) return `O pit selecionado nao existe`;
    // CHECK WICH PLAYER TURN IS
    switch (this.game.turn) {
      case 1:
        // CHECK IF THIS PLAYER IS ALLOWED TO CHOOSE THIS PIT
        if (!p1AllowedPits && this.isFirstMove) {
          throw new HttpException(
            'O player 1 nao pode selecionar este buraco',
            HttpStatus.BAD_REQUEST,
          );
        }

        this.isFirstMove = false;
        let gameResults = this._startPlayerMovement(pit);
        if (typeof gameResults === 'string') {
          return gameResults
        }

        let temp = [...gameResults]
        let gameEnded = temp.pop().pits.reduce((acc, item): boolean => {
          if(item.pitNumber <= (this.game.pitCount / 2) && item.pieces.length !== 0) {
            acc = false;
          } 
          return acc
        }, true)

        if(gameEnded) {
          gameResults[gameResults.length - 1].gameEnded = this.game.turn
        }

        return gameResults 
      case 2:
        // CHECK IF THIS PLAYER IS ALLOWED TO CHOOSE THIS PIT
        if (!p2AllowedPits && this.isFirstMove) {
          throw new HttpException(
            'O player 2 nao pode selecionar este buraco',
            HttpStatus.BAD_REQUEST,
          );
        }

        this.isFirstMove = false
        const anotherGameResults = this._startPlayerMovement(pit);
        if (typeof anotherGameResults === 'string') {
          return anotherGameResults
        }

        const anotherTemp = [...anotherGameResults]
        const anotherGameEnded = anotherTemp.pop().pits.reduce((acc, item): boolean => {
          if(item.pitNumber > (this.game.pitCount / 2) && item.pieces.length !== 0) {
            acc = false;
          } 
          return acc
        }, true)

        if(anotherGameEnded) {
          anotherGameResults[anotherGameResults.length - 1].gameEnded = this.game.turn
        }

        return anotherGameResults 

      default:
        throw new HttpException(
          'Este jogador nao existe',
          HttpStatus.BAD_REQUEST,
        );
    }
  }

  // HELPER FUNCTIONS
  _checkPlayerLastPit(player: 1 | 2, pitCount: number): number {
    if (player === 1) {
      return pitCount / 2;
    }

    return pitCount;
  }

  _getPit(pit: number): Pit {
    return this.game.pits.find((element) => {
      return element.pitNumber === pit;
    });
  }

  _startPlayerMovement(pit: number): Game[] | string {
    let chosenPit = this._getPit(pit);
    
    // ABORT MOVE IF THE CHOSEN PIT IS EMPTY
    if (chosenPit.pieces.length === 0) {
      throw new HttpException(
        'O pit escolhido esta vazio',
        HttpStatus.BAD_REQUEST,
      );
    }
    
    // TAKE THE PIECES FROM THE CHOSEN PIT INTO THE 
    // "PLAYER HAND"
    const playerMovementPieces = {
      count: chosenPit.pieces.length,
      pieces: chosenPit.pieces,
    };
    
    
    // EMPTY THE CHOSEN PIT
    chosenPit.pieces = [];
    
    // INITIATE THE LAST PIT
    let lastPit: Pit = chosenPit;     
    // START MOVING THE PIECES 1 BY 1
    for (let i = 0; i < playerMovementPieces.count; i++) {

        const p1LastPit = this.game.pitCount / 2
        const p2LastPit = this.game.pitCount
        const p2FirstPit = this.game.pitCount / 2 + 1;
      

      // TODO PROBABLY PUT THIS INTO A HELPER FUNCTION??
      // OR MAYBE A SWITCH CASE
      // CHOOSE THE NEW PIT
      if (lastPit.pitNumber === 88) {
        // 88 IS THE CODE TO SAY THAT THE LAST PIT WAS THE ONE BEFORE THE P1 BIG PIT
        // IF PIT COUNT IS 16 THEN 88 INDICATES THAT THE LAST PIT WAS 8 MEANING THE ALGORITHM
        // NEEDS TO JUMP STRAIGHT TO PIT 9 (GAME PIT COUNT / 2) + 1
        
        chosenPit = this._getPit(p2FirstPit);

      } else if (lastPit.pitNumber === 99) {
        // 99 IS THE CODE TO SAY THAT THE LAST PIT WAS THE ONE BEFORE THE P2 BIG PIT
        // IF PIT COUNT IS 16 THEN 99 INDICATES THAT THE LAST PIT WAS 16 MEANING THE ALGORITHM
        // NEEDS TO JUMP STRAIGHT TO PIT 1
        chosenPit = this._getPit(1);

      } else if (lastPit.pitNumber === p1LastPit) {
        if(this.game.turn === 1) {
          chosenPit = {
            pitNumber: 88, 
            pieces: this.game.p1Pit,
          } as Pit;
        } else {
          chosenPit = this._getPit(p2FirstPit);
        }

      } else if (lastPit.pitNumber === p2LastPit) {
        if(this.game.turn === 2) {
          chosenPit = {
            pitNumber: 99, 
            pieces: this.game.p2Pit,
          } as Pit;
        } else {
          chosenPit = this._getPit(1);
        }

      } else {
        // IF ANY OF THE ABOVE CONDITIONS ARE MET CHANGE THE PIT TO THE NEXT NUMBER
        chosenPit = this._getPit(lastPit.pitNumber + 1);
      }        

      // TAKE ONE PIECE FROM PLAYER MOVEMENT PIECES AND PUT IN THE CHOSEN PIT
      const selectOnePiece = playerMovementPieces.pieces.pop();
      chosenPit.pieces.push(selectOnePiece);
      lastPit = chosenPit;
    }

    const lastPitIsPlayerPit = lastPit.pitNumber === 88 || lastPit.pitNumber === 99
    // IF THE LASTPIT OF THE MOVE WASN`T THE PLAYERS OWN PIT AND WASN`T EMPTY WHEN THE LAST PIECE WAS DROPPED IN
    // MEANING THAT IT NEEDS TO HAVE MORE THAN 1 PIECE IN IT, THEN THE PLAYER MOVES AGAIN FROM THE SAME SPOT
    if(lastPitIsPlayerPit) {
      const result = cloneDeep(this.game)
      this.gamesArray.push(result)
      return this.gamesArray
    }

    if(!lastPitIsPlayerPit && lastPit.pieces.length > 1) {
      const result = cloneDeep(this.game)
      this.gamesArray.push(result)
      return this.movePiece(lastPit.pitNumber)
    }

    
    this.game.turn === 2 ? this.game.turn = 1 : this.game.turn = 2
    const result = cloneDeep(this.game)
    this.gamesArray.push(result)
    return this.gamesArray
           
  }
  
}