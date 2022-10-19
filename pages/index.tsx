import questions from "../questions.json";
import Head from "next/head";
import { useState } from "react";
import Link from 'next/link'

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([] as any);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showBlurb, setShowBlurb] = useState(false);
  
  const handleAnswerOption = (answer: any) => {
    setSelectedOptions([
      (selectedOptions[currentQuestion] = { answerByUser: answer }),
    ]);
    setSelectedOptions([...selectedOptions]);
  };

  const loadPage = (answer: any) => {
    setSelectedOptions([
      (selectedOptions[currentQuestion+1] = { answerByUser: answer }),
    ]);
    setSelectedOptions([...selectedOptions]);
  };

  const handleCheck = () => {
    setShowBlurb(!showBlurb);
  }

  const handleNext = () => {
    const nextQues = currentQuestion + 1;
    nextQues < questions.length && setCurrentQuestion(nextQues);
    setShowBlurb(!showBlurb);
    loadPage("none")
  };

  const handleSubmitButton = () => {
    let newScore = 0;
    for (let i = 0; i < questions.length; i++) {
      questions[i].answerOptions.map(
        (answer) =>
          answer.isCorrect &&
          answer.answer === selectedOptions[i]?.answerByUser &&
          (newScore += 1)
      );
    }
    setScore(newScore);
    setShowScore(true);
  };

  return (
    <div className={showScore ? 
      ("flex flex-col w-screen bg-[url('../public/FinalBackground.png')] bg-no-repeat bg-cover bg-center bg-fixed") : 
      ("flex flex-col w-screen bg-[#e32b22]")}>
      <Head>
        <title>El Estoque September News Quiz</title>
      </Head>
        {showScore ? (
        <div className="flex flex-row w-screen px-5 h-screen justify-center items-start [url('../public/FinalBackground.png')] bg-no-repeat bg-cover bg-center bg-fixed">
          <div className="text-center py-20">
            <p className="text-3xl font-semibold text-white justify-center">
              Nice Work!
            </p>
            <h1 className="text-3xl font-semibold text-white justify-center">
              You scored {score} out of {questions.length}
            </h1>           
          </div>
        </div>
        ) : (
          <>{ showBlurb ? (
          <div className={(selectedOptions[currentQuestion].answerByUser === questions[currentQuestion].correctAnswer)
            ? ("w-screen justify-center items-center bg-[#A9D49F]") :  
            ("w-screen justify-center items-center bg-[#FFA6A6]")}>
            <div className="flex flex-col w-screen h-screen justify-center items-center">
              <div className="w-2/3">
                <p className="text-xl text-white">
                {(selectedOptions[currentQuestion].answerByUser === questions[currentQuestion].correctAnswer)
                  ? ("Correct") :  
                  ("Incorrect")}
                </p>
                <p className="text-3xl text-white pt-3">
                  {questions[currentQuestion].question}
                </p>
                <p className="text-2xl text-white pt-5">
                  Answer: {questions[currentQuestion].correctAnswer}
                </p>
                <p className="text-m m:text-xl text-white py-10">
                  {questions[currentQuestion].blurb}
                </p>
                <button
                  onClick={
                    currentQuestion + 1 === questions.length
                      ? handleSubmitButton
                      : handleNext
                  }
                  className={(selectedOptions[currentQuestion].answerByUser === questions[currentQuestion].correctAnswer)
                    ? ("w-[49%] py-3 bg-[#88d177] rounded-lg") :  
                    ("w-[49%] py-3 bg-[#fa7373] rounded-lg")}
                  >
                  {
                    currentQuestion + 1 === questions.length
                      ? "Submit"
                      : "Next"
                  }
                </button>
              </div>
            </div>
          </div>
          ) : (
          <div className="flex flex-col justify-end lg:flex-row w-screen">
            <div className="w-screen lg:w-1/2 px-5 h-1/2 justify-center items-center">
              <div className="flex flex-col items-start w-full">
                <h4 className="mt-10 text-xl text-white/60">
                  Question {currentQuestion + 1} of {questions.length}
                </h4>
                <div className="mt-4 text-2xl text-white">
                  {questions[currentQuestion].question}
                </div>
              </div>
              <div className="flex flex-col w-full">
                {questions[currentQuestion].answerOptions.map((answer, index) => (
                  <div
                    key={index}
                    className="flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer border-black/10 rounded-xl bg-[#f3655a]"
                    onClick={(e) => handleAnswerOption(answer.answer)}
                  >
                    <input
                      type="radio"
                      name={answer.answer}
                      value={answer.answer}
                      checked={
                        answer.answer ===
                        selectedOptions[currentQuestion]?.answerByUser
                      }
                      onChange={(e) => handleAnswerOption(answer.answer)}
                      className="w-6 h-6 bg-black"
                    />
                    <p className="ml-6 text-white">{answer.answer}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-row justify-between w-full mt-4 text-white">
                <button
                  onClick={handleCheck}
                  className="w-[40%] h-1/4 py-3 bg-[#ffcf01] rounded-lg left"
                >
                  {currentQuestion + 1 === questions.length ? "Submit" : "Check"}
                </button>
                <div className="flex w-[50%] px-5 justify-start lg:justify-end items-center">
                  <img src={questions[currentQuestion].image}></img>
                </div>
              </div>
            </div>
            
          </div>
          )}</>
        )}
    </div>
  );
}