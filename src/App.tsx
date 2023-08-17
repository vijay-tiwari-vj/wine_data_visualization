import React, { useMemo } from "react";
import RawWineData from "./data/Wine-Data.json";
import FlavanoidTable from "./components/FlavanoidTable";
import { WineDataType } from "./utils/types";

function App() {
  // * updated wine data with necessary fields
  const wineData: WineDataType = useMemo(() => {
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

  return (
    <div className="container">
      <FlavanoidTable
        wineData={wineData}
        uniqueAlcoholClasses={uniqueAlcoholClasses}
      />
    </div>
  );
}

export default App;
