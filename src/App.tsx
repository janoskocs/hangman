import { useCallback, useEffect, useState } from "react";
import words from "./data/wordList.json";
import HangmanDrawing from "./components/HangmanDrawing";
import HangmanWord from "./components/HangmanWord";
import Keyboard from "./components/Keyboard";
const App = () => {

  const [wordToGuess] = useState<string>(() => {
    return words[Math.floor(Math.random() * words.length)]
  })
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  const incorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter))

  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordToGuess.split("").every(letter => guessedLetters.includes(letter))
  const addGuessedLetter = useCallback((letter: string) => {
    if (guessedLetters.includes(letter) || isLoser || isWinner) return
    setGuessedLetters(currentLetters => [...currentLetters, letter])
  }, [guessedLetters])


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
  }, [guessedLetters])


  return (
    <div
      style={{
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "0 auto",
        gap: "2rem"
      }}>

      <p>{isWinner && "You won! Refresh to try again!"}</p>
      <p>{isLoser && "You lost! Refresh to try again!"}</p>

      <HangmanDrawing
        numberOfGuesses={incorrectLetters.length}
      />

      <HangmanWord
        reveal={isLoser}
        guessedLetters={guessedLetters}
        wordToGuess={wordToGuess}
      />

      <div style={{ alignSelf: "stretch" }}>
        <Keyboard
          disabled={isLoser || isWinner}
          activeLetters={guessedLetters.filter(letter => wordToGuess.includes(letter))}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
    </div>
  )
}

export default App
