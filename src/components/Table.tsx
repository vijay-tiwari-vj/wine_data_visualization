import React from "react";

type TableProps = {
  tableType: string;
  classes: Array<number>;
  meanValues: Array<string | number>;
  medianValues: Array<string | number>;
  modeValues: Array<string | number>;
};

function Table({
  tableType,
  classes,
  meanValues,
  medianValues,
  modeValues,
}: TableProps) {
  return (
    <table>
      <caption>📈 Mean, Median and Mode of {tableType}</caption>
      <thead>
        <tr>
          <th>Measure</th>
          {classes.map((classValue) => (
            <th key={`alcohol_class_${classValue}`}>{`Class ${classValue}`}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        <tr>
          <th>{tableType} Mean</th>
          {meanValues.map((value, index) => (
            <td key={`${tableType}_mean_${index}`}>{value}</td>
          ))}
        </tr>
        <tr>
          <th>{tableType} Median</th>
          {medianValues.map((value, index) => (
            <td key={`${tableType}_median_${index}`}>{value}</td>
          ))}
        </tr>
        <tr>
          <th>{tableType} Mode</th>
          {modeValues.map((value, index) => (
            <td key={`${tableType}_mode_${index}`}>{value || "NA"}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

export default Table;
