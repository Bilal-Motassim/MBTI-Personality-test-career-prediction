import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Grid from '@mui/material/Grid';
import QuestionsEN from "./QuestionsEN.json";
import QuestionsAR from "./QuestionsAR.json";
import QuestionsFR from "./QuestionsFR.json";
import Question from './Question';
import axios from 'axios';
import NavBar from './NavBar';


function App() {
  const [language,setLanguage] = React.useState("en");
  const [questions, setQuestions] = React.useState(QuestionsEN);
  const [selectedAnswers, setSelectedAnswers] = React.useState(Array(questions.length).fill(''));
  const [currentPage, setCurrentPage] = React.useState(0);
  const [personnality, setper] = React.useState("");
  const [ableToNext, GoNext] = useState(false);
  useEffect(()=>{
    if (language === "ar"){
      setQuestions(QuestionsAR);
    }
    else if(language === "fr"){
      setQuestions(QuestionsFR);
    }else{
      setQuestions(QuestionsEN);
    }
  },[language])
  const handleRadioChange = (event, index) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[index] = event.target.value;
    setSelectedAnswers(newSelectedAnswers);
    let isnotfull = false;
    let count = 0;
    let slice = selectedAnswers.slice(currentPage * 10, currentPage * 10 + 10)
    slice.forEach((v) => {
      if (v === "") {
        count++;
        count > 1 ? isnotfull = true : isnotfull = false;
      }
    });
    console.log(count);
    console.log(slice);
    isnotfull ? GoNext(false) : GoNext(true);
  };

  function chunkArray(array, chunkSize) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }

  const questionsChunks = chunkArray(questions, 10);
  const currentChunk = questionsChunks[currentPage];

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
    GoNext(false);
  };

  // const prevPage = () => {
  //   setCurrentPage(currentPage - 1);
  //   // Reset selected answers when switching pages
  //   setSelectedAnswers(Array(Questions.length).fill(''));
  // };

  const Submit = () => {
    const data = [];
    selectedAnswers.forEach((v, i) => {
      data.push({ [i+1]: v })
    });
    console.log(data);
    axios.post("http://localhost:5000/", {
      data: data
    })
      .then((res) => { setper("Your personality is :" + res.data) })
      .catch((err) => { console.log(err.message) })
  }

  function changeLN(ln){
    setLanguage(ln);
  }

  return (

    <>
      <NavBar changeLN={changeLN}/>
      <Grid
        container
        spacing={2}
      >
        <Grid xs={3}>g</Grid>
        <Grid xs={6}>
          {currentChunk.map((v, index) => (
            <Question
              key={index}
              quest={v.questionNumber + " - " + v.question}
              A={v.options[0].label}
              B={v.options[1].label}
              uncheck={false}
              handleRadio={(event) => handleRadioChange(event, index + currentPage * 10)}
              page={currentPage}
            />
          ))}
          {currentPage === 6 ? <Button color='success' variant="contained" endIcon={<CheckCircleIcon />} onClick={Submit} disabled={!ableToNext}>Submit</Button>
            : <Button color='primary' variant="contained" endIcon={<NavigateNextIcon />} onClick={nextPage} disabled={!ableToNext}>Next</Button>}

          <div>{personnality}</div>
        </Grid>
        <Grid xs={3}></Grid>


      </Grid>

    </>
    // disabled={currentPage === questionsChunks.length - 1}
  );
}



export default App;


