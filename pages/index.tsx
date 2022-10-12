import questions from "../questions.json";
import Head from "next/head";
import { useState } from "react";
import Link from 'next/link'

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([] as any);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  
  const handleAnswerOption = (answer: any) => {
    setSelectedOptions([
      (selectedOptions[currentQuestion] = { answerByUser: answer }),
    ]);
    setSelectedOptions([...selectedOptions]);
  };

  const handlePrevious = () => {
    const prevQues = currentQuestion - 1;
    prevQues >= 0 && setCurrentQuestion(prevQues);
  };

  const handleNext = () => {
    const nextQues = currentQuestion + 1;
    nextQues < questions.length && setCurrentQuestion(nextQues);
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
    <div className="flex flex-col w-screen bg-[#e32b22]">
      <Head>
        <title>Quiz App</title>
      </Head>
        {showScore ? (
        <div className="flex flex-row w-screen px-5 h-screen justify-center items-center">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-white">
              You scored {score} out of {questions.length}
            </h1> 
              <a className="text-2xl text-rain" href="https://elestoque.org/">
                Back to El Estoque
              </a>          
            </div>
        </div>
        ) : (
          <>
          <div className="flex flex-col lg:flex-row w-screen">
            <div className="w-screen lg:w-1/2 px-5 h-screen justify-center items-center">
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
            <div className="flex justify-between w-full mt-4 text-white">
              <button
                onClick={handlePrevious}
                className="w-[49%] py-3 bg-[#ffcf01] rounded-lg"
              >
                Previous
              </button>
              <button
                onClick={
                  currentQuestion + 1 === questions.length
                    ? handleSubmitButton
                    : handleNext
                }
                className="w-[49%] py-3 bg-[#ffcf01] rounded-lg left"
              >
                {currentQuestion + 1 === questions.length ? "Submit" : "Next"}
              </button>
            </div>
            </div>
            <div className="flex flex-col w-screen lg:w-1/2 px-5 h-screen justify-start lg:justify-end items-center">
              <img src={questions[currentQuestion].image} className="lg:h-4/5"></img>
            </div>
          </div>
          </>
        )}
    </div>
  );
}