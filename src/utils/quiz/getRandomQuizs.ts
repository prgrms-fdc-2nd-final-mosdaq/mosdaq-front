export function getRandomQuizs<T>(array: T[], count: number = 10): T[] {
  const result: T[] = [];
  const usedIndices = new Set<number>();

  while (result.length < count) {
    const randomIndex = Math.floor(Math.random() * array.length);

    if (!usedIndices.has(randomIndex)) {
      result.push(array[randomIndex]);
      usedIndices.add(randomIndex);
    }
  }

  return result;
}

// 예시 사용법
// const myArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
// const selectedElements = getRandomQuizs(myArray);
// // console.log(selectedElements);
