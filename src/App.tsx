import { useEffect, useState } from "react";
import words from "./data/wordList.json";
import HangmanDrawing from "./components/HangmanDrawing";
import HangmanWord from "./components/HangmanWord";
import Keyboard from "./components/Keyboard";
const App = () => {

  const [wordToGuess, setWordToGuess] = useState<string>(() => {
    return words[Math.floor(Math.random() * words.length)]
  })
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  const incorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter))

  const addGuessedLetter = (letter: string) => {
    if (guessedLetters.includes(letter)) return
      setGuessedLetters(currentLetters => [...currentLetters, letter])
    
  }

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const key = event.key;

      if (!key.match(/^[a-z]$/)) return;

      event.preventDefault();
      addGuessedLetter(key);
    }

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    }
  }, [])

  return (
    <div style={{ maxWidth: "800px", display: "flex", flexDirection: "column", alignItems: "center", margin: "0 auto", gap: "2rem" }}>
      <p>Lose Win</p>
      <HangmanDrawing numberOfGuesses={incorrectLetters.length}/>
      <HangmanWord guessedLetters={guessedLetters} wordToGuess={wordToGuess}/>
      <div style={{ alignSelf: "stretch" }}>
        <Keyboard />
      </div>


    </div>
  )
}

export default App
