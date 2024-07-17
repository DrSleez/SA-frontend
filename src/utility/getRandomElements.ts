export default function getRandomElements<T>(array: T[], count: number): T[] {
  const result: T[] = [];
  const usedIndices: Set<number> = new Set();

  if (count > array.length) {
    throw new Error(
      "Die Anzahl der gewünschten Elemente übersteigt die Länge des Arrays."
    );
  }

  while (result.length < count) {
    const randomIndex = Math.floor(Math.random() * array.length);

    if (!usedIndices.has(randomIndex)) {
      usedIndices.add(randomIndex);
      result.push(array[randomIndex]);
    }
  }

  return result;
}
