import React, { useMemo } from "react";
import { WineDataType } from "../utils/types";
import {
  calculateMean,
  calculateMedian,
  calculateMode,
} from "../utils/helperFunctions";

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
      const sortedFlavanoidValues = flavanoidValuesArr.sort((a, b) => a - b);

      classWiseValues[classValue] = sortedFlavanoidValues;
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

  // * calculating flavanoid median
  const flavanoidsMedianValues = useMemo(() => {
    const medianValues: Array<string | number> = [];

    uniqueAlcoholClasses.forEach((classValue) => {
      const flavanoidMedian = calculateMedian(flavanoidValues[classValue]);

      medianValues.push(flavanoidMedian);
    });

    return medianValues;
  }, [uniqueAlcoholClasses, flavanoidValues]);

  // * calculating flavanoid mode
  const flavanoidsModeValues = useMemo(() => {
    const modeValues: Array<any> = [];

    uniqueAlcoholClasses.forEach((classValue) => {
      const flavanoidMode = calculateMode(flavanoidValues[classValue]);

      modeValues.push(flavanoidMode);
    });

    return modeValues;
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
          {flavanoidsMedianValues.map((value, index) => (
            <td key={`flavanoid_median_${index}`}>{value}</td>
          ))}
        </tr>
        <tr>
          <th>Flavanoids Mode</th>
          {flavanoidsModeValues.map((value, index) => (
            <td key={`flavanoid_mode_${index}`}>{value || "NA"}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

export default FlavanoidTable;
