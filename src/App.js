import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import React from "react";
import { foods, carBrands, dogBreeds, jobs, sports, celebrities } from './Words';
import './Home.css';
import Timer from './Timer';

function App() {
  const [target, setTarget] = useState('');
  const [guess, setGuess] = useState('');
  const [shuffledWord, setShuffledWord] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [isInputEmpty, setIsInputEmpty] = useState(true);
  const [timerVisible, setTimerVisible] = useState(false);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [initialTimer, setInitialTimer] = useState(60);
  const [timerKey, setTimerKey] = useState(0);

  function getRandomInt(n) {
    return Math.floor(Math.random() * n);
  }

  function shuffle(word) {
    var arr = word.split('');
    var n = arr.length;

    for (var i = 0; i < n - 1; i++) {
      var j = getRandomInt(n);

      var temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }

    word = arr.join('');
    return word;
  }

  // Function to set the target word based on the selected topic
  function handleTopicSelect(topic) {
    setSelectedTopic(topic);

    // Choose a random word from the selected topic array
    let selectedWord = '';
    switch (topic) {
      case 'foods':
        selectedWord = foods[getRandomInt(foods.length)];
        break;
      case 'carBrands':
        selectedWord = carBrands[getRandomInt(carBrands.length)];
        break;
      case 'dogBreeds':
        selectedWord = dogBreeds[getRandomInt(dogBreeds.length)];
        break;
      case 'jobs':
        selectedWord = jobs[getRandomInt(jobs.length)];
        break;
      case 'sports':
        selectedWord = sports[getRandomInt(sports.length)];
        break;
      case 'celebrities':
        selectedWord = celebrities[getRandomInt(celebrities.length)];
        break;
      default:
        selectedWord = ''; 
    }

    setTarget(selectedWord);
    setShuffledWord(shuffle(selectedWord)); // Shuffle the selected word before setting it as the target
    setIsCorrect(null); // Reset correctness status
    setIsTimerPaused(false);
    setInitialTimer(60);
    setTimerVisible(true);
    setTimerKey(timerKey + 1);
  }

  // set target
  function handleTarget() {
    setShuffledWord(shuffle(target));
  }

  // handle input change
  function handleInputChange(event) {
    setGuess(event.target.value);
    setIsInputEmpty(event.target.value.trim() === '');
  }

  // handle answer submission
  function handleSubmit() {
    if (guess.toLowerCase() === target.toLowerCase()) {
      setIsCorrect(true);
      setIsTimerPaused(true); // Pause the timer when the answer is correct
    } else {
      setIsCorrect(false);
    }
    // Reset the guess to an empty string after submitting
    setGuess('');
  }

  function handleTimeUp() {
    console.log('Time is up!');
    setTimerVisible(false); // Hide the timer when time is up
  }

  return (
    <div className="App">
      <h1>Word Decoder</h1>
      {timerVisible && <Timer key={timerKey} initialTime={initialTimer} onTimeUp={handleTimeUp} isPaused={isTimerPaused} />}
      <div className='home-div'>
        <h1>Choose a topic</h1>
        <div className='topics-container'>
          <button className='foods-button' onClick={() => handleTopicSelect('foods')}>Foods</button>
          <button className='carBrands-button' onClick={() => handleTopicSelect('carBrands')}>Car Brands</button>
          <button className='dogBreeds-button' onClick={() => handleTopicSelect('dogBreeds')}>Dog Breeds</button>
          <button className='jobs-button' onClick={() => handleTopicSelect('jobs')}>Jobs</button>
          <button className='sports-button' onClick={() => handleTopicSelect('sports')}>Sports</button>
          <button className='celebrities-button' onClick={() => handleTopicSelect('celebrities')}>Celebrities</button>
        </div>
        
        <div className='deshuffle'>
          <p>Deshuffle the word below</p>
          <p>{shuffledWord}</p>
        </div>
        <div className='user-input'>
          <input
            type="text"
            placeholder="enter guess"
            value={guess}
            onChange={handleInputChange}
          />
        </div>
        <div className='submit-answer'>
          <button onClick={handleSubmit} disabled={isInputEmpty}>
              Submit Answer
            </button>
        </div>
        <div className='response'>
        {isCorrect === true && (
          <>
            <p>You are correct! You beat the timer! Select a topic for a new word</p>
          </>
        )}
        {isCorrect === false && <p>You are incorrect, try again.</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
