import { useState } from "react";
import words from "./data/wordList.json";
import HangmanDrawing from "./components/HangmanDrawing";
import HangmanWord from "./components/HangmanWord";
import Keyboard from "./components/Keyboard";
const App = () => {

  const [wordToGuess, setWordToGuess] = useState<string>(() => {
    return words[Math.floor(Math.random() * words.length)]
  })
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  return (
   <div style={{maxWidth: "800px", display: "flex", flexDirection: "column", alignItems:"center" }}>
      <p>Lose Win</p>
      <HangmanDrawing />
      <HangmanWord />
      <Keyboard />

   </div>
  )
}

export default App
