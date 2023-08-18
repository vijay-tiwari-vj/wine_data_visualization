// * calculate mean of values
export const calculateMean = (values: Array<number>) => {
  if (!values.length) return 0;

  const numberOfValues = values.length;
  const sumOfValues = values.reduce((previousValue, currentValue) => {
    return previousValue + currentValue;
  }, 0);

  return (sumOfValues / numberOfValues).toFixed(3);
};

// * calculate median of values
export const calculateMedian = (values: Array<number>) => {
  if (!values.length) return 0;

  let median = 0;
  const numberOfValues = values.length;
  const isOddNumberOfValues = numberOfValues % 2 !== 0;

  if (isOddNumberOfValues) {
    // * if number of values is odd
    const medianValueIndex = (numberOfValues + 1) / 2;
    median = values[medianValueIndex];
  } else {
    // * if number of values is even
    const firstMiddleValueIndex = numberOfValues / 2;
    const secondMiddleValueIndex = firstMiddleValueIndex + 1;

    const numerator =
      values[firstMiddleValueIndex] + values[secondMiddleValueIndex];

    median = numerator / 2;
  }

  return median.toFixed(3);
};

// * calculate mode of values
export const calculateMode = (values: Array<number>) => {
  if (!values.length) return 0;
  let valuesSet: Record<number, number> = {};

  for (let i = 0; i < values.length; ++i) {
    const value = values[i];

    if (!Object.keys(valuesSet).includes(value.toString())) {
      // * setting value's count to 1 if doesn't exist in set
      valuesSet[value] = 1;
    } else {
      // * increment count of value if already exists
      valuesSet[value] += 1;
    }
  }

  const sortedSet = Object.entries(valuesSet).sort((a, b) => b[1] - a[1]);
  const maxKeyValuePair = sortedSet?.[0];
  const valueOfMaxFrequency = maxKeyValuePair?.[0];

  return valueOfMaxFrequency || null;
};
