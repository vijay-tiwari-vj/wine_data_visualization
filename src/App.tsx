import React, { useMemo } from "react";
import RawWineData from "./data/Wine-Data.json";
import { calculateMean } from "./utils/helperFunctions";

function App() {
  // * updated wine data with necessary fields
  const wineData = useMemo(() => {
    return RawWineData.map((alcoholData) => ({
      Alcohol: alcoholData.Alcohol,
      Ash: alcoholData.Ash,
      Magnesium: alcoholData.Magnesium,
      Flavanoids: alcoholData.Flavanoids,
      Hue: alcoholData.Hue,
    }));
  }, []);

  const uniqueAlcoholClasses = useMemo(() => {
    const alcoholClasses = wineData.map((data) => data.Alcohol);
    return [...new Set(alcoholClasses)];
  }, [wineData]);

  // * calculating flavanoid mean
  const flavanoidsMeanValues = useMemo(() => {
    const meanValues: Array<string | number> = [];

    uniqueAlcoholClasses.forEach((classValue) => {
      const filteredWineData = wineData.filter(
        (wine) => wine.Alcohol === classValue
      );
      const flavanoidValues = filteredWineData.map((data) =>
        Number(data.Flavanoids)
      );

      const flavanoidMean = calculateMean(flavanoidValues);
      meanValues.push(flavanoidMean);
    });

    return meanValues;
  }, [uniqueAlcoholClasses, wineData]);

  return (
    <div className="container">
      <table>
        <caption>📈 Mean, Median and Mode of Flavanoids</caption>
        <thead>
          <tr>
            <th>Measure</th>
            {uniqueAlcoholClasses.map((classValue) => (
              <th
                key={`alcohol_class_${classValue}`}
              >{`Class ${classValue}`}</th>
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
    </div>
  );
}

export default App;
