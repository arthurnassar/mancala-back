import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { iif, last } from 'rxjs';
import { CreateGameDto } from './dto/create-game.dto';
import { Game, Pit } from './interfaces/game.interface';
import { User } from './interfaces/user.interface';
import { cloneDeep } from 'lodash';

@Injectable()
export class AppService {
  private readonly games: Game[] = [
    {
      id: 6468045108335139000,
      turn: 1,
      pitCount: 16,
      pits: [
        {
          pitNumber: 1,
          pieces: [
            { pieceNumber: 1 },
            { pieceNumber: 2 },
            { pieceNumber: 3 },
            { pieceNumber: 4 },
          ],
        },
        {
          pitNumber: 2,
          pieces: [
            { pieceNumber: 5 },
            { pieceNumber: 6 },
            { pieceNumber: 7 },
            { pieceNumber: 8 },
          ],
        },
        {
          pitNumber: 3,
          pieces: [
            { pieceNumber: 9 },
            { pieceNumber: 10 },
            { pieceNumber: 11 },
            { pieceNumber: 12 },
          ],
        },
        {
          pitNumber: 4,
          pieces: [
            { pieceNumber: 13 },
            { pieceNumber: 14 },
            { pieceNumber: 15 },
            { pieceNumber: 16 },
          ],
        },
        {
          pitNumber: 5,
          pieces: [
            { pieceNumber: 17 },
            { pieceNumber: 18 },
            { pieceNumber: 19 },
            { pieceNumber: 20 },
          ],
        },
        {
          pitNumber: 6,
          pieces: [
            { pieceNumber: 21 },
            { pieceNumber: 22 },
            { pieceNumber: 23 },
            { pieceNumber: 24 },
          ],
        },
        {
          pitNumber: 7,
          pieces: [
            { pieceNumber: 25 },
            { pieceNumber: 28 },
            { pieceNumber: 27 },
            { pieceNumber: 28 },
          ],
        },
        {
          pitNumber: 8,
          pieces: [
            { pieceNumber: 29 },
            { pieceNumber: 30 },
            { pieceNumber: 31 },
            { pieceNumber: 32 },
          ],
        },
        {
          pitNumber: 9,
          pieces: [
            { pieceNumber: 33 },
            { pieceNumber: 34 },
            { pieceNumber: 35 },
            { pieceNumber: 36 },
          ],
        },
        {
          pitNumber: 10,
          pieces: [
            { pieceNumber: 37 },
            { pieceNumber: 38 },
            { pieceNumber: 39 },
            { pieceNumber: 40 },
          ],
        },
        {
          pitNumber: 11,
          pieces: [
            { pieceNumber: 41 },
            { pieceNumber: 42 },
            { pieceNumber: 43 },
            { pieceNumber: 44 },
          ],
        },
        {
          pitNumber: 12,
          pieces: [
            { pieceNumber: 45 },
            { pieceNumber: 48 },
            { pieceNumber: 47 },
            { pieceNumber: 48 },
          ],
        },
        {
          pitNumber: 13,
          pieces: [
            { pieceNumber: 49 },
            { pieceNumber: 50 },
            { pieceNumber: 51 },
            { pieceNumber: 52 },
          ],
        },
        {
          pitNumber: 14,
          pieces: [
            { pieceNumber: 53 },
            { pieceNumber: 54 },
            { pieceNumber: 55 },
            { pieceNumber: 56 },
          ],
        },
        {
          pitNumber: 15,
          pieces: [
            { pieceNumber: 57 },
            { pieceNumber: 58 },
            { pieceNumber: 59 },
            { pieceNumber: 60 },
          ],
        },
        {
          pitNumber: 16,
          pieces: [
            { pieceNumber: 61 },
            { pieceNumber: 62 },
            { pieceNumber: 63 },
            { pieceNumber: 64 },
          ],
        },
      ],
      p1Pit: [],
      p2Pit: [],
      pieces: [],
      player: 997,
    },
  ];

  createGame(pits: number, pieces: number, userId: number): Game {
    // CREATE GAME BASE FORMAT
    const game: Game = {
      id: Math.floor(Math.random() * 10000000000000000000),
      turn: 1,
      pitCount: pits * 2,
      pits: [],
      p1Pit: [],
      p2Pit: [],
      pieces: [],
      player: userId,
    };

    // CREATE PIECES AND ASSIGN THEM TO RESPECTIVE PIT BASED ON DATA RECEIVED
    let piecesCounter = 1;
    for (let i = 1; i <= game.pitCount; i++) {
      const pit: Pit = { pitNumber: i, pieces: [] };
      for (let j = 0; j < pieces; j++) {
        pit.pieces.push({ pieceNumber: piecesCounter });
        piecesCounter++; 
      }
      game.pits.push(pit);
    }

    //PUSH GAME OBJECT TO THE CLASS PROPERTY
    this.games.push(game);

    // return the game created
    return game;
  }

  findAllGames(userId: string): Game[] {
    const filteredGames = this.games.filter((game) => {
      return game.player === Number(userId);
    });

    return filteredGames;
  }

  findGameById(gameId: number): Game | any {
    return this.games.reduce((acc, item) => {
      if (item.id === gameId) {
        acc = item;
      }

      return acc;
    });
  }

  movePiece(gameId: number, pit: number, isFirstMove = true, gamesArray = []): Game[] | string {
    const game = this.findGameById(gameId);
    const halfPits = game.pitCount / 2;
    const p1AllowedPits = pit <= halfPits;
    const p2AllowedPits = pit > halfPits;
    const pitNumberExists = pit > 0 && pit <= game.pitCount;

    // CHECK IF PIT EXISTS
    if (!pitNumberExists) return `O pit selecionado nao existe`;

    // CHECK WICH PLAYER TURN IS
    switch (game.turn) {
      case 1:
        // CHECK IF THIS PLAYER IS ALLOWED TO CHOOSE THIS PIT
        if (!p1AllowedPits && isFirstMove) {
          throw new HttpException(
            'O player 1 nao pode selecionar este buraco',
            HttpStatus.BAD_REQUEST,
          );
        }

        isFirstMove = false;
        let gameResults = this.startPlayerMovement(game, pit, gamesArray);
        if (typeof gameResults === 'string') {
          return gameResults
        }

        let temp = [...gameResults]
        let gameEnded = temp.pop().pits.reduce((acc, item): boolean => {
          if(item.pitNumber <= (game.pitCount / 2) && item.pieces.length !== 0) {
            acc = false;
          } 
          return acc
        }, true)

        if(gameEnded) {
          gameResults[gameResults.length - 1].gameEnded = game.turn
        }

        return gameResults 

      case 2:
        // CHECK IF THIS PLAYER IS ALLOWED TO CHOOSE THIS PIT
        if (!p2AllowedPits && isFirstMove) {
          throw new HttpException(
            'O player 2 nao pode selecionar este buraco',
            HttpStatus.BAD_REQUEST,
          );
        }

        isFirstMove = false
        const anotherGameResults = this.startPlayerMovement(game, pit, gamesArray);
        if (typeof anotherGameResults === 'string') {
          return anotherGameResults
        }

        const anotherTemp = [...anotherGameResults]
        const anotherGameEnded = anotherTemp.pop().pits.reduce((acc, item): boolean => {
          if(item.pitNumber > (game.pitCount / 2) && item.pieces.length !== 0) {
            acc = false;
          } 
          return acc
        }, true)

        if(anotherGameEnded) {
          anotherGameResults[anotherGameResults.length - 1].gameEnded = game.turn
        }

        return anotherGameResults 

      default:
        throw new HttpException(
          'Este jogador nao existe',
          HttpStatus.BAD_REQUEST,
        );
    }
  }

  getPit(game: Game, pit: number): Pit {
    return game.pits.find((element) => {
      return element.pitNumber === pit;
    });
  }

  startPlayerMovement(game: Game, pit: number, gamesArray): Game[] | string{
    let chosenPit = this.getPit(game, pit);
    const playerMovementPieces = {
      count: chosenPit.pieces.length,
      pieces: chosenPit.pieces,
    };
    
    
    // ABORT MOVE IF THE CHOSEN PIT IS EMPTY
    if (chosenPit.pieces.length === 0) {
      throw new HttpException(
        'O pit escolhido esta vazio',
        HttpStatus.BAD_REQUEST,
      );
    }
        
    chosenPit.pieces = [];
    // START MOVEMENT
    let lastPit: Pit = chosenPit;     


    for (let i = 0; i < playerMovementPieces.count; i++) {
      const playerPit = game.turn === 1 ? game.p1Pit : game.p2Pit;
      const p1LastPit = game.pitCount / 2
      const p2LastPit = game.pitCount
      const p2FirstPit = game.pitCount / 2 + 1;


      // CHOOSE THE NEW PIT
      if (lastPit.pitNumber === 88) {
        // 88 IS THE CODE TO SAY THAT THE LAST PIT WAS THE ONE BEFORE THE P1 BIG PIT
        // IF PIT COUNT IS 16 THEN 88 INDICATES THAT THE LAST PIT WAS 8 MEANING THE ALGORITHM
        // NEEDS TO JUMP STRAIGHT TO PIT 9 (GAME PIT COUNT / 2) + 1
        
        chosenPit = this.getPit(game, p2FirstPit);

      } else if (lastPit.pitNumber === 99) {
        // 99 IS THE CODE TO SAY THAT THE LAST PIT WAS THE ONE BEFORE THE P2 BIG PIT
        // IF PIT COUNT IS 16 THEN 99 INDICATES THAT THE LAST PIT WAS 16 MEANING THE ALGORITHM
        // NEEDS TO JUMP STRAIGHT TO PIT 1
        chosenPit = this.getPit(game, 1);

      } else if (lastPit.pitNumber === p1LastPit) {
        if(game.turn === 1) {
          chosenPit = {
            pitNumber: 88, 
            pieces: playerPit,
          };
        } else {
          chosenPit = this.getPit(game, p2FirstPit);
        }

      } else if (lastPit.pitNumber === p2LastPit) {
        if(game.turn === 2) {
          chosenPit = {
            pitNumber: 99, 
            pieces: playerPit,
          };
        } else {
          chosenPit = this.getPit(game, 1);
        }

      } else {
        // IF ANY OF THE ABOVE CONDITIONS ARE MET CHANGE THE PIT TO THE NEXT NUMBER
        chosenPit = this.getPit(game, lastPit.pitNumber + 1);
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
      const result = cloneDeep(game)
      gamesArray.push(result)
      return gamesArray
    }

    if(!lastPitIsPlayerPit && lastPit.pieces.length > 1) {
      const result = cloneDeep(game)
      gamesArray.push(result)
      return this.movePiece(game.id, lastPit.pitNumber, false, gamesArray)
    }

    
    game.turn === 2 ? game.turn = 1 : game.turn = 2
    const result = cloneDeep(game)
    gamesArray.push(result)
    return gamesArray
           
  }

  checkPlayerLastPit(player: 1 | 2, pitCount: number): number {
    if (player === 1) {
      return pitCount / 2;
    }

    return pitCount;
  }
}
