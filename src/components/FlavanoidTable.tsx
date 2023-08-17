import React, { useMemo } from "react";
import { WineDataType } from "../utils/types";
import { calculateMean } from "../utils/helperFunctions";

type FlavanoidTableProps = {
  wineData: WineDataType;
  uniqueAlcoholClasses: Array<number>;
};

function FlavanoidTable({
  wineData,
  uniqueAlcoholClasses,
}: FlavanoidTableProps) {
  const flavanoidValues = useMemo(() => {
    const classWiseValues: Record<string, Array<number>> = {};

    uniqueAlcoholClasses.forEach((classValue) => {
      const filteredWineData = wineData.filter(
        (wine) => wine.Alcohol === classValue
      );
      const flavanoidValuesArr = filteredWineData.map((data) =>
        Number(data.Flavanoids)
      );

      classWiseValues[classValue] = flavanoidValuesArr;
    });

    return classWiseValues;
  }, [uniqueAlcoholClasses, wineData]);

  // * calculating flavanoid mean
  const flavanoidsMeanValues = useMemo(() => {
    const meanValues: Array<string | number> = [];

    uniqueAlcoholClasses.forEach((classValue) => {
      const flavanoidMean = calculateMean(flavanoidValues[classValue]);

      meanValues.push(flavanoidMean);
    });

    return meanValues;
  }, [uniqueAlcoholClasses, flavanoidValues]);

  return (
    <table>
      <caption>📈 Mean, Median and Mode of Flavanoids</caption>
      <thead>
        <tr>
          <th>Measure</th>
          {uniqueAlcoholClasses.map((classValue) => (
            <th key={`alcohol_class_${classValue}`}>{`Class ${classValue}`}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        <tr>
          <th>Flavanoids Mean</th>
          {flavanoidsMeanValues.map((value, index) => (
            <td key={`flavanoid_mean_${index}`}>{value}</td>
          ))}
        </tr>
        <tr>
          <th>Flavanoids Median</th>
          <td>2</td>
        </tr>
        <tr>
          <th>Flavanoids Mode</th>
          <td>6</td>
        </tr>
      </tbody>
    </table>
  );
}

export default FlavanoidTable;
