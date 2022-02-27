import React, { useState } from 'react';
import Square from './Square';


function Board() {
	const initalSquares=Array(9).fill(null)
	const [squares,setSquares]= useState(initalSquares)
	const[xIsNext, setXiIsNext]=useState(true)

	const winner=calcWinner(squares)

	const status= winner?
	`Winner: ${winner}`
	:`Next turn: ${xIsNext?'X':'O'}`

	const handleClickEvent=(i)=>
    {
        //1. make a copy of squares
		const newSquares=[...squares]

		const winnerDeclared=Boolean(calcWinner(newSquares))
		const squareFilled=Boolean(newSquares[i])

		if(squareFilled || winnerDeclared)
		{
			console.log("yes")
			return;
		}

		//2. Mutate the copy, setting the i-th element to 'x'
		newSquares[i]=xIsNext?'X':'O'

		//3. call the setSquares function with the mutaed copy
		setSquares(newSquares) 
		setXiIsNext(!xIsNext) //make the opponent the next in turn 

		// console.log("square "+i+" clicked")
		// console.log(winnerDeclared)
		// console.log(squareFilled)

		
    }

	const renderSquare=(i)=>{
		return(	
				<Square 
					value={squares[i]}
					onClickEvent={()=>
					{
						handleClickEvent(i)
					}
					}
				/>	
		)
}	
	

	
	function calcWinner(squares)
	{
		const lines=[
			[0,1,2],[3,4,5],[6,7,8],
			[0,3,6],[1,4,7],[2,5,8],
			[0,4,8],[2,4,6]
		]

		for(let line of lines)
		{
			const[a,b,c]=line
			if(squares[a] && squares[a]===squares[b] && squares[a]===squares[c])
			{
				return squares[a]
			}
		}
		return null
	}
	return <div style={{
		backgroundColor:'skyblue',
		mragin:10,
		padding:20,
		textAlign:'center'
	}}>
		<div>{status}</div>
		<div className='board-row'>
			{renderSquare(0)}
			{renderSquare(1)}
			{renderSquare(2)}
		</div>

		<div className='board-row'>
		{renderSquare(3)}
		{renderSquare(4)}
		{renderSquare(5)}
		</div>

		<div className='board-row'>
		{renderSquare(6)}
		{renderSquare(7)}
		{renderSquare(8)}
		</div>
	</div>;
}
export default Board