import React from 'react';
import './index.css';

function Intro(){
  return(
    <div className="jumbotron py-2 px-3 m-jumbo rounded bg-white text-dark">
      <h1>TicTacToe</h1>
      <p className="lead">This is a simple TicTacToe game app made in React, with React Components and dynamic css styles.</p>
      <hr className="my-4"></hr>
      <p className="lead">
        <a className="btn btn-secondary btn-lg text-light m-3" href="https://github.com/xr-alex/react-tictactoe" target="_blank" rel="noreferrer" role="button">Check out the source code.</a>
        <a className="btn btn-primary btn-lg text-light m-3" href="https://xr-alex.github.io/" target="_blank" rel="noreferrer" role="button">Check out my online portfolio.</a>
      </p>
    </div>
  )
}  

/**
* Square component.
* The 'border' props serve to remove all outside boundaries to allow the buttons to look like a traditional TicTacToe board.
* In this version of TicTacToe, the player symbols 'O' and 'X' are color coded for a better UX.
*/
function Square(props){
  return(
    <button className={"square " + props.border + (props.square_value=="X"?" red":" blue")} onClick={props.onClick}>{props.square_value}</button>
  )
}

/**
 * Board component.
 */
class Board extends React.Component{
  renderSquare(i,border) {
    return ( <Square square_value={this.props.squares[i]} border={border}
      onClick={() => this.props.onClick(i)}/>
    );
  }

  render(){
    return(
    <div>
      <div>
        {this.renderSquare(0,"no-border-left no-border-top")}
        {this.renderSquare(1,"no-border-top")}
        {this.renderSquare(2,"no-border-right no-border-top")}
      </div>
      <div>
        {this.renderSquare(3,"no-border-left")}
        {this.renderSquare(4,"")}
        {this.renderSquare(5,"no-border-right")}
      </div>
      <div>
        {this.renderSquare(6,"no-border-left no-border-bottom")}
        {this.renderSquare(7,"no-border-bottom")}
        {this.renderSquare(8,"no-border-right no-border-bottom")}
      </div>      
    </div>    
  )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(''),
      isO: false,
    };
  }

  /** 
  * Given the square position "(i)" the current board values and state are updated, 
  *  then the game logic is processed.
  */
  handleClick = (i) =>{    
    const squares = this.state.squares;
    if (checkWinner(squares) || squares[i])
      return;
  
    squares[i] = this.state.isO?'O':'X'
    this.setState({squares: squares, isO: !this.state.isO,});
  }
  /**
  * Resets game state values.
  */
  reset = () =>{
    this.setState({
      squares: Array(9).fill(''),
      isO: false,
    });
  }

  /**
  * In this version of TicTacToe, the player symbols 'O' and 'X' are color coded for a better UX.
  */
  render() {
    const current_squares = this.state.squares;    
    let status = checkTie(current_squares)?('Tie'):(checkWinner(current_squares) ? "Winner: ": "Next player: ");
    let player = status=='Tie'?'':(status=="Winner: "? (this.state.isO?'X':'O') :(this.state.isO?'O':'X'))
    let player_span = <span className={player=='O'?"blue":"red"}>{player}</span>

    return (
      <div className='container'>
        <Intro/>
        <div className="game">
          <div className="game-board">
            <Board squares={current_squares} onClick={(i)=> this.handleClick(i)} />          
          </div>        
          <div className="status">{status}{player_span}</div>
          <button className="reset btn btn-danger" onClick={()=>this.reset()}>Reset</button>
        </div>
      </div>
    );
  }
}

/** 
* Since play order is sequential and synchronized we can test out the 8 possible win patterns
*  after each play to determine if the player has won in that turn.
*/
function checkWinner(squares){
  //Horizontal winning positions
  const w_h1 = (squares[0] != '' && squares[0] == squares[1] && squares[1] == squares[2])
  const w_h2 = (squares[3] != '' && squares[3] == squares[4] && squares[4] == squares[5])
  const w_h3 = (squares[6] != '' && squares[6] == squares[7] && squares[7] == squares[8])

  //Vertical winning positions
  const w_v1 = (squares[0] != '' && squares[0] == squares[3] && squares[3] == squares[6])
  const w_v2 = (squares[1] != '' && squares[1] == squares[4] && squares[4] == squares[7])
  const w_v3 = (squares[2] != '' && squares[2] == squares[5] && squares[5] == squares[8])
  
  //Diagonal winning positions
  const w_d1 = (squares[0] != '' && squares[0] == squares[4] && squares[4] == squares[8])
  const w_d2 = (squares[2] != '' && squares[2] == squares[4] && squares[4] == squares[6])

return w_h1 || w_h2 || w_h3 || w_v1 || w_v2 || w_v3 || w_d1|| w_d2
}

/**
* Returns true (to declare a tie) when there are no empty spaces on the board.
*/
function checkTie(squares){
  return squares.indexOf('')==-1
}

export default App
