import { Word } from "./types/word";

export default async function getWordToday(): Promise<Word> {
  const API = `${process.env.REACT_APP_API}/words?mode=today`;

  return fetch(API)
    .then((response) => response)
    .then((word) => word.json());
}
