import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import words from ".src/data/frys_sight_words";
import correctSound from "./correct.mp3";
import levelUpSound from "./level-up.mp3";


const words = [
  // First 100 Fry's Sight Words (Level 1)
  ["the", "of", "and", "a", "to", "in", "is", "you", "that", "it", "he", "was", "for", "on", "are", "as", "with", "his", "they", "I", "at", "be", "this", "have", "from", "or", "one", "had", "by", "word",
  "but", "not", "what", "all", "were", "we", "when", "your", "can", "said", "there", "use", "an", "each", "which", "she", "do", "how", "their", "if", "will", "up",
  "other", "about", "out", "many", "then", "them", "these", "so", "some", "her", "would", "make", "like", "him", "into", "time", "has", "look", "two", "more",
  "write", "go", "see", "number", "no", "way", "could", "people", "my", "than", "first", "water", "been", "call", "who", "oil", "its", "now", "find", "long", "down",
  "day", "did", "get", "come", "made", "may", "part"],

  // Second 100 Fry's Sight Words (Level 2)
  ["over", "new", "sound", "take", "only", "little", "work", "know", "place", "years", "live", "me", "back", "give", "most", "very", "after", "thing", "our", "just",
  "name", "good", "sentence", "man", "think", "say", "great", "where", "help", "through", "much", "before", "line", "right", "too", "means", "old", "any", "same",
  "tell", "boy", "follow", "came", "want", "show", "also", "around", "form", "three", "small", "set", "put", "end", "does", "another", "well", "large", "must",
  "big", "even", "such", "because", "turn", "here", "why", "ask", "went", "men", "read", "need", "land", "different", "home", "us", "move", "try", "kind", "hand",
  "picture", "again", "change", "off", "play", "spell", "air", "away", "animal", "house", "point", "page", "letter", "mother", "answer", "found", "study", "still",
  "learn", "should", "America", "world"],

  // Level 3 (Third 100 Fry's Sight Words)
  ["high", "every", "near", "add", "food", "between", "own", "below", "country", "plant", "last", "school", "father", "keep", "tree", 
   "never", "start", "city", "earth", "eye", "light", "thought", "head", "under", "story", "saw", "left", "don't", "few", "while", 
   "along", "might", "close", "something", "seem", "next", "hard", "open", "example", "begin", "life", "always", "those", "both", 
   "paper", "together", "got", "group", "often", "run", "important", "until", "children", "side", "feet", "car", "mile", "night", 
   "walk", "white", "sea", "began", "grow", "took", "river", "four", "carry", "state", "once", "book", "hear", "stop", "without", 
   "second", "later", "miss", "idea", "enough", "eat", "face", "watch", "far", "Indian", "really", "almost", "let", "above", 
   "girl", "sometimes", "mountain", "cut", "young", "talk", "soon"]

  // Level 4 (Fourth 100 Words)
  ["high", "every", "near", "add", "food", "between", "own", "below", "country", "plant", "last", "school", "father", "keep", "tree", "never", "start", "city", "earth", "eye",
   "light", "thought", "head", "under", "story", "saw", "left", "don't", "few", "while", "along", "might", "close", "something", "seem", "next", "hard", "open", "example",
   "begin", "life", "always", "those", "both", "paper", "together", "got", "group", "often", "run", "important", "until", "children", "side", "feet", "car", "mile",
   "night", "walk", "white", "sea", "began", "grow", "took", "river", "four", "carry", "state", "once", "book", "hear", "stop", "without", "second", "later", "miss",
   "idea", "enough", "eat", "face", "watch", "far", "Indian", "really", "almost", "let", "above", "girl", "sometimes", "mountain", "cut", "young", "talk", "soon"],

  // Level 5 (Fifth 100 Words)
  ["list", "song", "being", "leave", "family", "it's", "body", "music", "color", "stand", "sun", "questions", "fish", "area", "mark", "dog", "horse", "birds", "problem",
   "complete", "room", "knew", "since", "ever", "piece", "told", "usually", "friends", "easy", "heard", "order", "red", "door", "sure", "become", "top", "ship",
   "across", "today", "during", "short", "better", "best", "however", "low", "hours", "black", "products", "happened", "whole", "measure", "remember", "early",
   "waves", "reached", "listen", "wind", "rock", "space", "covered", "fast", "several", "hold", "himself", "toward", "five", "step", "morning", "passed", "vowel",
   "true", "hundred", "against", "pattern", "numeral", "table", "north", "slowly", "money", "map", "farm", "pulled", "draw", "voice", "seen", "cold", "cried", "plan"],

  // Level 6 (Sixth 100 Words)
  ["notice", "south", "sing", "war", "ground", "fall", "king", "town", "I'll", "unit", "figure", "certain", "field", "travel", "wood", "fire", "upon", "done", "English",
   "road", "half", "ten", "fly", "gave", "box", "finally", "wait", "correct", "oh", "quickly", "person", "became", "shown", "minutes", "strong", "verb", "stars",
   "front", "feel", "fact", "inch", "street", "decided", "contain", "course", "surface", "produce", "building", "ocean", "class", "note", "nothing", "rest", "carefully",
   "scientists", "inside", "wheels", "stay", "green", "known", "island", "week", "less", "machine", "base", "ago", "stood", "plane", "system", "behind", "ran",
   "round", "boat", "game", "force", "brought", "understand", "warm", "common", "bring", "explain", "dry", "though", "language", "shape", "deep", "thousands"],

  // Level 7 (Seventh 100 Words)
  ["clear", "equation", "yet", "government", "filled", "heat", "full", "hot", "check", "object", "am", "rule", "among", "noun", "power", "cannot", "able", "six",
   "size", "dark", "ball", "material", "special", "heavy", "fine", "pair", "circle", "include", "built", "can't", "matter", "square", "syllables", "perhaps",
   "bill", "felt", "suddenly", "test", "direction", "center", "farmers", "ready", "anything", "divided", "general", "energy", "subject", "Europe", "moon",
   "region", "return", "believe", "dance", "members", "picked", "simple", "cell", "paint", "mind", "love", "cause", "rain", "exercise", "eggs", "train",
   "blue", "wish", "drop", "develop", "window", "difference", "distance", "heart", "site", "sum", "summer", "wall", "forest", "probably", "legs", "sat"],

  // Level 8 (Eighth 100 Words)
  ["main", "winter", "wide", "written", "length", "reason", "kept", "interest", "arms", "brother", "race", "present", "beautiful", "store", "job", "edge",
   "past", "sign", "record", "finished", "discovered", "wild", "happy", "hope", "flowers", "clothes", "strange", "gone", "jumped", "baby", "eight", "village",
   "result", "meet", "corner", "root", "send", "soft", "bright", "touch", "gas", "weather", "month", "million", "bear", "finish", "happy", "hope", "flower",
   "clothes", "strange", "gone", "jumped", "baby", "eight", "village", "meet", "corner", "root", "send", "soft", "bright", "touch", "gas", "weather", "month"],

  // Level 9 (Ninth 100 Words)
  ["million", "bear", "finish", "ahead", "stretch", "highway", "flat", "interesting", "build", "materials", "speed", "settle", "speech", "eight", "doctor",
   "tonight", "everybody", "serious", "concern", "report", "court", "laugh", "wrote", "quarter", "dollars", "president", "softly", "love", "stood", "arrive",
   "flower", "clothes", "strange", "gone", "jumped", "baby", "village", "result", "meet", "corner", "root", "send", "soft", "bright", "touch", "gas", "weather",
   "month", "million", "bear", "finish", "ahead", "stretch", "highway", "flat", "interesting", "build", "materials", "speed", "settle", "speech", "eight"],

  // Level 10 (Tenth 100 Words)
  ["doctor", "tonight", "everybody", "serious", "concern", "report", "court", "laugh", "wrote", "quarter", "dollars", "president", "softly", "love", "stood",
   "arrive", "apartment", "wear", "blanket", "rainbow", "surprise", "whistle", "match", "climbed", "grape", "pencil", "pocket", "trouble", "vacation",
   "thirsty", "whisper", "lightning", "squirrel", "belong", "continue", "bicycle", "mystery", "journey", "recognize", "whispered", "temperature", "blanket",
   "muscles", "signal", "creature", "moisture", "gentle", "stomach", "appreciate", "trouble", "tunnel", "distant"]
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
