import React from "react";
import MainPart from './components/MainPart';
import Questions from './components/Quetions';
import {nanoid} from "nanoid"
import yellowBlob from "./img/yellow.png"
import blueBlob from "./img/blue.png"
import Category from "./components/Category";

function App() {
  //state for conditional rendering 
  const [isAlive,setIsAlive]=React.useState(false);


  //state for holding quiz finished or not 
  const [isFinished,setIsFinished]=React.useState(false) 
  
  //state for holding api data (questions and answers)
  const [questionData,setQuestionData]=React.useState([]);

  //state for right answers
  const [count,setCount]=React.useState(0)

  //state for difficulty
  const [difficulty,setDifficulty]=React.useState({value:"easy"})

  //state for restart game 
  const [restart,setRestart]=React.useState(false)

  //state for category
  const [category,setCategory]=React.useState({category: "any"})


  
  //mixing answers in array
  const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);
  
  //fetch data from api
  // https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&encode=base64
  React.useEffect(()=> {
    async function getQuestions(){
      //changing the API with respect to the difficulty
      let res={}
      category.category === "any" ?
       res = await fetch(`https://opentdb.com/api.php?amount=5&difficulty=${difficulty.value}&encode=base64`):
       res = await fetch(`https://opentdb.com/api.php?amount=5&category=${category.category}&difficulty=${difficulty.value}&encode=base64`)
      console.log(res)
      const data = await res.json()
      // console.log(data)
      let questionsList=[]
      data.results.forEach(questionEl =>{
        let quesionId=nanoid()
        let answerArray=shuffleArray([...questionEl.incorrect_answers, questionEl.correct_answer]) 
        let answerList=[]
        answerArray.forEach((answerEl,index) =>{
          answerList.push({id:quesionId+index,value:answerEl,isSelec:false,isCorrect:false})
        })
        questionsList.push({id:quesionId, answers:answerList, question:questionEl.question, correctAns:questionEl.correct_answer})
      })
      //  console.log(questionsList)

      setQuestionData(questionsList)
    }
    getQuestions()
  },[restart,difficulty,category])

  // console.log(questionData)

  //function for selecting difficulty
  function selectDifficulty(id){
    switch (id) {
      //easy
      case (1):
        setDifficulty({value:"easy"})
        break;
        //medium
        case (2): 
        setDifficulty({value:"medium"})
        break;
        //hard
      case (3):
        setDifficulty({value:"hard"})
        break;
      default:
        break;
    }
  }

  //function for selecting category
  function handleChange(event) {
    console.log(event)
    const {name, value} = event.target
    setCategory(prevCategory => {
        return {
            ...prevCategory,
            [name]:value
        }
    })
  }

  //starting quiz
  function startQuiz(){
    setIsAlive(prevAlive=> !prevAlive)
    setCount(0)
  }
  //goingback to main menu
  function backToMenu(){
    setIsAlive(prevAlive=> !prevAlive)
    playAgain()
  }

  //color change function (id = each answer id ; questionId = each question component id)
  function selectChange(id,questionId){
    setQuestionData(prevData=>{
      return prevData.map(items=>{ 
        const newAnswers=items.answers.map(item2=>{
         if(item2.id === id){ 
            //item2 return
            return ({...item2,isSelec:!item2.isSelec})
         }else{
            //item2 return
            return(
              items.id === questionId ? 
              {...item2,isSelec:false} : 
              {...item2}
              )
         }
        })
        //prevdata return
        return( 
            {...items,answers:newAnswers}   
          )
      })   
    })
  }

  //Checking correct answers and calculating percentage and count
  function checkAnswers(){
    questionData.forEach(items=>{
    items.answers.forEach(item2=>{   
      if (item2.isSelec){
        items.correctAns=== item2.value ? setCount(prevCount=>prevCount+1): console.log("wrong answer")
      }      
    })
  })
  setIsFinished(prevFinished => !prevFinished)
}


//Restart game 
function playAgain(){
  // setQuestionData([]);
  setCount(0)
  //recalling useEffect
  setIsFinished(prevFinished => !prevFinished)
  //hiding play again button
  setRestart(prevStart=>!prevStart)
}
  

  //Setting question data components 
  const questionElements = questionData.map(items => {
    
    return ( 
        <div key={items.id}>
        <Questions  key={items.id} data={items} selectChange={selectChange} isFinished={isFinished}/>
        <hr className="container-line"></hr> 
       </div>  
    )
  })


  return (
    <div className="App">
      {
        isAlive ?
        
        <div className="question1">
          {questionElements}
        {isFinished ?
          <div>
            <p className="score--text">You scored {count}/5  correct answers (%{(count/5)*100})</p> 
            <button className="playagain-btn" onClick={playAgain}>Play again</button>
            <button className="mainmenu-btn" onClick={backToMenu}>Main Menu</button>
          </div>:
          
          <button className="checkans-btn" onClick={checkAnswers}>Check Answers</button>
        
        }
        </div>:
        <div className="mainmenu-part">
          <MainPart startQuiz={startQuiz} selectDifficulty={selectDifficulty} />
          <Category category={category} handleChange={handleChange} />
        </div>
      }
      
    </div>
  )
}

export default App
