import React from "react";
function Questions(props){

    //mapping over answer elements and giving them id
    const answerElements=props.data.answers.map((items)=>{



        let styles={}
        //it works when u call check answer
         if(props.isFinished){
            
            items.isSelec ?
            //if your answer is not correct make it red  -- if its correct turn it to green                   
            items.value != props.data.correctAns ? styles={backgroundColor: "#F8BCBC",border:"none",pointerEvents:"none",userSelect:"none" } : 
            styles={backgroundColor: "#94D7A2",border:"none",pointerEvents:"none",userSelect:"none"} :
            
            //if not selected button equals to correct answer make it green
            items.value === props.data.correctAns ?
            styles={backgroundColor: "#94D7A2",border:"none",pointerEvents:"none",userSelect:"none"}:
            styles={backgroundColor: "#F5F7FB",opacity:"40%",pointerEvents:"none",userSelect:"none"}

        
        //color for selecting answers
        }else{
            items.isSelec ?
            styles={backgroundColor: "#D6DBF5",border:"none" }:
            styles={backgroundColor:  "#F5F7FB"}
        }
        

        return <button 
        key={items.id}
        id={items.id}
        onClick={()=> props.selectChange(items.id,props.data.id)} 
        className="answer-btn"
        style={styles}
        >{atob(items.value)}
        </button>
    })


    //decode base64 atob
    
    return (
        <div className="question-container">
            <p className="question">{atob(props.data.question)}</p>
            <div className="answer-container">
                {answerElements}
            </div>
        </div>
    )
}

export default Questions







