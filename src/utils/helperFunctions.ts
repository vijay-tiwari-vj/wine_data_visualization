// * calculate mean of values
export const calculateMean = (values: Array<number>) => {
  if (!values.length) return 0;

  const numberOfValues = values.length;
  const sumOfValues = values.reduce((previousValue, currentValue) => {
    return previousValue + currentValue;
  }, 0);

  return (sumOfValues / numberOfValues).toFixed(3);
};
