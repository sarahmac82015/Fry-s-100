import React, { useState } from "react";
import correctSound from "./correct.mp3";
import levelUpSound from "./level-up.mp3";

const words = [
    ["the", "of", "and", "a", "to", "in", "is", "you", "that", "it"],  // Sample first 10 words from Fry's list
    ["he", "was", "for", "on", "are", "as", "with", "his", "they", "I"],
    // Add remaining word sets here
];

const Game = () => {
    const [level, setLevel] = useState(1);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [userInput, setUserInput] = useState("");
    const [score, setScore] = useState(0);

    const correctAudio = new Audio(correctSound);
    const levelUpAudio = new Audio(levelUpSound);

    const currentWord = words[level - 1][currentWordIndex];

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    const checkWord = () => {
        if (userInput.toLowerCase().trim() === currentWord.toLowerCase()) {
            correctAudio.play();
            setScore(score + 1);
            if (currentWordIndex + 1 < words[level - 1].length) {
                setCurrentWordIndex(currentWordIndex + 1);
            } else {
                levelUpAudio.play();
                setLevel(level + 1);
                setCurrentWordIndex(0);
            }
        }
        setUserInput("");
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Fry's Sight Words Game</h1>
            <h2>Level {level}</h2>
            <h3 style={{ fontSize: "2em", margin: "20px 0" }}>{currentWord}</h3>
            <input type="text" value={userInput} onChange={handleInputChange} />
            <button onClick={checkWord}>Submit</button>
            <p>Score: {score}</p>
        </div>
    );
};

export default Game;
