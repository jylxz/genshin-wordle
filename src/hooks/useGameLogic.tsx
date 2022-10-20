import { useState, useEffect } from "react";
import { Set } from "typescript";
import getRandomWord from "../services/API/getRandomWord";
import getWordToday from "../services/API/getWordToday";

export interface KeyboardHints {
  incorrect: Set<string>;
  correct: Set<string>;
  close: Set<string>;
}

export interface WordAttempt {
  word: string;
  hints: WordHints[];
}

export interface WordHints {
  letter: string;
  hint: "correct" | "close" | "incorrect";
}

interface CorrectDict {
  [key: string]: number;
}

export default function useGameLogic() {
  const [correctWord, setCorrectWord] = useState("");
  const [currentWord, setCurrentWord] = useState("");
  const [attemptsCount, setAttemptsCount] = useState(0);
  const [wordAttempts, setWordAttempts] = useState<WordAttempt[]>(
    Array(6).fill({
      word: "",
      hints: {},
    })
  );

  const [correctDict, setCorrectDict] = useState<CorrectDict>({});
  const [gameStatus, setGameStatus] = useState("starting");
  const [keyboardHints, setKeyboardHints] = useState<KeyboardHints>({
    incorrect: new Set<string>(),
    close: new Set<string>(),
    correct: new Set<string>(),
  });


  const [startTime, setStartTime] = useState<Date>();
  const [completeTime, setCompleteTime] = useState("");

  useEffect(() => {
    function handleKeyboardEvent(e: KeyboardEvent) {
      inputKey(e.key);
    }

    document.addEventListener("keydown", handleKeyboardEvent);

    return () => {
      document.removeEventListener("keydown", handleKeyboardEvent);
    };
  }, [currentWord, startGame]);

  function inputKey(letter: string) {
    switch (letter) {
      case "Backspace":
        const newAttempt = wordAttempts.map((attempt, index) => {
          if (index === attemptsCount) {
            return {
              word: currentWord.slice(0, -1),
              hints: [],
            };
          }

          return attempt;
        });

        setWordAttempts(newAttempt);
        setCurrentWord((word) => word.slice(0, -1));
        break;
      case "Enter":
        if (currentWord.length === 5) {
          checkAttempt(currentWord);
          setAttemptsCount((count) => count + 1);
          setCurrentWord("");
        }
        break;
      default:
        if (
          /^[a-z]*$/i.test(letter) &&
          currentWord.length < 5 &&
          letter.length === 1
        ) {
          const newAttempt = wordAttempts.map((attempt, index) => {
            if (index === attemptsCount) {
              return {
                word: currentWord + letter,
                hints: [],
              };
            }

            return attempt;
          });

          setWordAttempts(newAttempt);
          setCurrentWord((word) => word + letter);
        }
    }
  }

  function defaultState() {
    setAttemptsCount(0);
    setStartTime(new Date());
    setWordAttempts(
      Array(6).fill({
        word: "",
        hints: {},
      })
    );
    setKeyboardHints({
      incorrect: new Set<string>(),
      close: new Set<string>(),
      correct: new Set<string>(),
    });
    setCorrectDict({})
  }

  async function startGame(mode: "today" | "random") {
    defaultState()

    switch (mode) {
      case "today":
        getWordToday().then((response) => {
          setCorrectWord(response.word);

          const dict: CorrectDict = {};

          response.word.split("").forEach((letter) => {
            dict.hasOwnProperty(letter)
              ? (dict[letter] += 1)
              : (dict[letter] = 0);
          });

          setCorrectDict(dict);
        });
        break;
      case "random":
        await getRandomWord().then((response) => {
          setCorrectWord(response.word);

          const dict: CorrectDict = {};

          response.word.split("").forEach((letter) => {
            dict.hasOwnProperty(letter)
              ? (dict[letter] += 1)
              : (dict[letter] = 1);
          });

          setCorrectDict(dict);
        });
        break;
    }
  }

  function checkAttempt(word: string) {
    switch (true) {
      case attemptsCount <= 5 && word === correctWord:
        getCompleteTime();
        setGameStatus("win");
        break;
      case attemptsCount === 5 && word !== correctWord:
        setGameStatus("lose");
        break;
      default:
        setGameStatus("ongoing");
        adjustKeyboardHints(word);
        adjustWordHints(word);
    }
  }

  function getCompleteTime() {
    const start = startTime;
    const end = new Date();

    if (start && end) {
      const diff = Math.abs(end.getTime() - start.getTime()) / 1000;
      const minutes = Math.floor(diff / 60) % 60;
      const seconds = Math.floor(diff % 60);

      setCompleteTime(`${minutes} minutes and ${seconds < 10 ? `0${seconds}` : seconds} seconds`);
    }
  }

  function adjustKeyboardHints(word: string) {
    const newHints = { ...keyboardHints };

    word.split("").forEach((letter, index) => {
      switch (true) {
        case correctWord.includes(letter) && correctWord.at(index) === letter:
          newHints.close.delete(letter);
          newHints.correct.add(letter);
          break;
        case correctWord.includes(letter):
          newHints.close.add(letter);
          break;
        default:
          newHints.incorrect.add(letter);
      }
    });

    setKeyboardHints(newHints);
  }

  function adjustWordHints(word: string) {
    const attemptsCopy = [...wordAttempts];
    const dict = {
      ...correctDict,
    };
    const hints = Array<WordHints>(5);

    word.split("").forEach((letter, index) => {
      switch (true) {
        case correctWord[index] === letter:
          hints[index] = {
            letter,
            hint: "correct",
          };

          dict[letter] -= 1;
          break;
        case correctWord.includes(letter):
          hints[index] = {
            letter,
            hint: "close",
          };
          break;
        default:
          hints[index] = {
            letter,
            hint: "incorrect",
          };
      }
    });

    hints.forEach((value, index) => {
      switch (value.hint) {
        case "close":
          if (dict[value.letter] === 0) {
            hints[index].hint = "incorrect";
          } else {
            dict[value.letter] -= 1;
          }
      }
    });

    attemptsCopy[attemptsCount].hints = hints;
    setWordAttempts(attemptsCopy);
  }

  return {
    correctWord,
    currentWord,
    completeTime,
    wordAttempts,
    startGame,
    inputKey,
    gameStatus,
    keyboardHints,
  };
}
