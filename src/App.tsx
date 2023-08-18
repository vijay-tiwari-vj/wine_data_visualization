import React, { useMemo } from "react";
import RawWineData from "./data/Wine-Data.json";
import { WineDataType } from "./utils/types";
import {
  calculateMean,
  calculateMedian,
  calculateMode,
} from "./utils/helperFunctions";
import Table from "./components/Table";

function App() {
  // * updated wine data with necessary fields
  const wineData: WineDataType = useMemo(() => {
    return RawWineData.map((alcoholData) => {
      // * calculating gamma
      const Gamma = (
        (Number(alcoholData.Ash) * Number(alcoholData.Hue)) /
        Number(alcoholData.Magnesium)
      ).toFixed(2);

      return {
        Alcohol: alcoholData.Alcohol,
        Ash: alcoholData.Ash,
        Magnesium: alcoholData.Magnesium,
        Flavanoids: alcoholData.Flavanoids,
        Hue: alcoholData.Hue,
        Gamma: Number(Gamma),
      };
    });
  }, []);

  // * unique alcohol classes in wine data set
  const uniqueAlcoholClasses = useMemo(() => {
    const alcoholClasses = wineData.map((data) => data.Alcohol);
    return [...new Set(alcoholClasses)];
  }, [wineData]);

  // * creating class-wise sorted flavanoid and gamma values
  const [flavanoidValues, gammaValues] = useMemo(() => {
    const classWiseFlavanoidValues: Record<string, Array<number>> = {};
    const classWiseGammaValues: Record<string, Array<number>> = {};

    uniqueAlcoholClasses.forEach((classValue) => {
      const filteredWineData = wineData.filter(
        (wine) => wine.Alcohol === classValue
      );
      const flavanoidValuesArr = filteredWineData.map((data) =>
        Number(data.Flavanoids)
      );
      const gammaValuesArr = filteredWineData.map((data) => Number(data.Gamma));

      const sortedFlavanoidValues = flavanoidValuesArr.sort((a, b) => a - b);
      const sortedGammaValues = gammaValuesArr.sort((a, b) => a - b);

      classWiseFlavanoidValues[classValue] = sortedFlavanoidValues;
      classWiseGammaValues[classValue] = sortedGammaValues;
    });

    return [classWiseFlavanoidValues, classWiseGammaValues];
  }, [uniqueAlcoholClasses, wineData]);

  // * calculating mean for flavanoids and gamma
  const [flavanoidsMeanValues, gammaMeanValues] = useMemo(() => {
    const flavanoidMeanArr: Array<string | number> = [];
    const gammaMeanArr: Array<string | number> = [];

    uniqueAlcoholClasses.forEach((classValue) => {
      const flavanoidMean = calculateMean(flavanoidValues[classValue]);
      const gammaMean = calculateMean(gammaValues[classValue]);

      flavanoidMeanArr.push(flavanoidMean);
      gammaMeanArr.push(gammaMean);
    });

    return [flavanoidMeanArr, gammaMeanArr];
  }, [uniqueAlcoholClasses, flavanoidValues, gammaValues]);

  // * calculating median for flavanoids and gamma
  const [flavanoidsMedianValues, gammaMedianValues] = useMemo(() => {
    const flavanoidMedianArr: Array<string | number> = [];
    const gammaMedianArr: Array<string | number> = [];

    uniqueAlcoholClasses.forEach((classValue) => {
      const flavanoidMedian = calculateMedian(flavanoidValues[classValue]);
      const gammaMedian = calculateMedian(gammaValues[classValue]);

      flavanoidMedianArr.push(flavanoidMedian);
      gammaMedianArr.push(gammaMedian);
    });

    return [flavanoidMedianArr, gammaMedianArr];
  }, [uniqueAlcoholClasses, flavanoidValues, gammaValues]);

  // * calculating mode for flavanoids and gamma
  const [flavanoidsModeValues, gammaModeValues] = useMemo(() => {
    const flavanoidModeArr: Array<any> = [];
    const gammaModeArr: Array<any> = [];

    uniqueAlcoholClasses.forEach((classValue) => {
      const flavanoidMode = calculateMode(flavanoidValues[classValue]);
      const gammaMode = calculateMode(gammaValues[classValue]);

      flavanoidModeArr.push(flavanoidMode);
      gammaModeArr.push(gammaMode);
    });

    return [flavanoidModeArr, gammaModeArr];
  }, [uniqueAlcoholClasses, flavanoidValues, gammaValues]);

  return (
    <div className="container">
      <Table
        tableType="Flavanoids"
        classes={uniqueAlcoholClasses}
        meanValues={flavanoidsMeanValues}
        medianValues={flavanoidsMedianValues}
        modeValues={flavanoidsModeValues}
      />
      <Table
        tableType="Gamma"
        classes={uniqueAlcoholClasses}
        meanValues={gammaMeanValues}
        medianValues={gammaMedianValues}
        modeValues={gammaModeValues}
      />
    </div>
  );
}

export default App;
