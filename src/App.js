import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import React from "react";
import { foods, carBrands, dogBreeds, jobs } from './Words';
import './Home.css';

function App() {
  const [target, setTarget] = useState('');
  const [guess, setGuess] = useState('');
  const [shuffledWord, setShuffledWord] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);

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
      default:
        selectedWord = ''; // Clear target if an unknown topic is selected
    }

    setTarget(selectedWord);
    setShuffledWord(shuffle(selectedWord)); // Shuffle the selected word before setting it as the target
    setIsCorrect(null); // Reset correctness status
  }

  // set target
  function handleTarget() {
    setShuffledWord(shuffle(target));
  }

  // handle input change
  function handleInputChange(event) {
    setGuess(event.target.value);
  }

  // handle answer submission
  function handleSubmit() {
    if (guess.toLowerCase() === target.toLowerCase()) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    // Reset the guess to an empty string after submitting
    setGuess('');
  }

  return (
    <div className="App">
      <h1>Word Decoder</h1>
      <div className='home-div'>
        <h1>Choose a topic</h1>
        <div className='topics-container'>
          <button className='foods-button' onClick={() => handleTopicSelect('foods')}>Foods</button>
          <button className='carBrands-button' onClick={() => handleTopicSelect('carBrands')}>Car Brands</button>
          <button className='dogBreeds-button' onClick={() => handleTopicSelect('dogBreeds')}>Dog Breeds</button>
          <button className='jobs-button' onClick={() => handleTopicSelect('jobs')}>Jobs</button>
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
          <button onClick={handleSubmit}>Submit Answer</button>
        </div>
        <div className='response'>
        {isCorrect === true && (
          <>
            <p>You are correct! The word is {target}</p>
          </>
        )}
        {isCorrect === false && <p>You are incorrect, try again.</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
