import React from "react";


function MainPart(props){
    return (
        <div className="main">
            <h1 className="main-header">Quizzical</h1>
            <h2 className="main-text">A quick quiz about general knowledge</h2>
            <div className="buttons-div">
                <button className="difficulty-btn" onClick={()=>props.selectDifficulty(1)}>Easy</button>
                <button className="difficulty-btn" onClick={()=>props.selectDifficulty(2)}>Medium</button> 
                <button className="difficulty-btn" onClick={()=>props.selectDifficulty(3)}>Hard</button> 
            </div>

            <button className="main-btn" onClick={props.startQuiz}>Start quiz</button>
        </div>
    )
}

export default MainPart