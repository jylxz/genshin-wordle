import { Word } from "./types/word";

export default async function getRandomWord(): Promise<Word> {
  const API = `${process.env.REACT_APP_API}/words?mode=random`;

  return fetch(API)
    .then((response) => response)
    .then((word) => word.json());
}
