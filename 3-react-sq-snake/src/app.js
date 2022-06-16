import React from "react";

let snakex = 3;
let snakey = 3;
let snakeDirection = "";
const boardwidth = 10;
const boardHeight = 10;
let appleX = 1;
let appleY = 1;
let snakeLength = 3;
let score = 0;

const getInitialState = size =>
  Array(size)
    .fill(0)
    .map(row =>
      Array(size)
        .fill(0)
        .map(el => ({ snake: 0, apple: 0 }))
    );
export default class Snake extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      board: getInitialState(10)
    };
  }

  componentDidMount() {
    window.addEventListener("keydown", ev => {
      if (ev.key === "ArrowUp") {
        return (snakeDirection = "up");
      }
      if (ev.key === "ArrowDown") {
        return (snakeDirection = "down");
      }
      if (ev.key === "ArrowLeft") {
        return (snakeDirection = "left");
      }
      if (ev.key === "ArrowRight") {
        return (snakeDirection = "right");
      }
    });

    setInterval(() => {
      try {
        if (snakeDirection === "up") {
          snakey--;
        }
        if (snakeDirection === "down") {
          snakey++;
        }
        if (snakeDirection === "left") {
          snakex--;
        }
        if (snakeDirection === "right") {
          snakex++;
        }

        let cell = this.getCell(snakex, snakey);
        if (cell && cell.snake) {
          this.start();
        }
        this.go(snakex, snakey);

        cell = this.getCell(snakex, snakey);
        if (cell && cell.apple) {
          snakeLength++;
          score++;
          this.apple();
        }

        if (
          snakex < 0 ||
          snakey < 0 ||
          snakex >= boardwidth ||
          snakey >= boardHeight
        ) {
          this.start();
        }
      } catch (e) {
        console.log(e.message);
      }
    }, 500);
  }

  gameOver() {
    this.setState({
      board: getInitialState(10)
    });
    // clean timer
    // reset board
  }

  getCell(x, y) {
    if (!this.state.board[x]) return false;
    return this.state.board[x][y];
  }

  apple() {
    appleX = Math.floor(Math.random() * boardwidth);
    appleY = Math.floor(Math.random() * boardHeight);
  }

  start() {
    appleX = 1;
    appleY = 1;
    snakeLength = 3;
    score = 0;
    snakex = 3;
    snakey = 3;
    snakeDirection = "";
    this.setState({
      board: getInitialState(10)
    });
  }

  go = (x, y) => {
    this.setState({
      board: this.state.board.map((row, _x) => {
        return row.map((cel, _y) => {
          if (cel.snake) {
            if (cel.snake === snakeLength) {
              return { snake: 0 };
            } else {
              return { snake: cel.snake + 1 };
            }
          } else {
            return {
              snake: x === _x && y === _y,
              apple: appleX === _x && appleY === _y
            };
          }
        });
      })
    });
  };

  render() {
    return (
      <div className="board">
        {this.state.board.map((row, x) => (
          <div>
            {row.map((cell, y) => (
              <div
                key={x + "-" + y}
                className={
                  (cell.snake ? "snake" : "") || (cell.apple ? "apple" : "")
                }
              />
            ))}
          </div>
        ))}

        <button id="btn" onClick={() => this.start()} type="button">
          New Game
        </button>
        <h1> Score : {score}</h1>
      </div>
    );
  }
}
