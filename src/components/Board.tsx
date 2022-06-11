import React, {useState, useEffect} from "react";
import BitComponent, {ToggleBitType} from "./Bit";

interface BoardComponentType {
  numberOfRows: number;
  numberOfColumns: number;
}

interface RowType {
  columns: boolean[];
}

const BoardComponent = ({numberOfRows, numberOfColumns}: BoardComponentType) => {
  const [rows, setRows] = useState<RowType[]>([{columns: []}]);
  useEffect(() => {
    //Creating an array of columns based on numberOfRows,
    //each column is created in base of numberOfColumns formatting an array of boolean (false by default)
    const rows = [...Array(numberOfRows).keys()].map(i =>
      ({columns: [...Array(numberOfColumns).keys()].map(i => false)}));
    setRows(rows);
  }, [numberOfRows, numberOfColumns]);
  const toggleBit = ({row, col}:ToggleBitType) => {
    const _rows = rows.map((r, rKey) => {
      if (rKey === row) {
        r.columns[col]=!  r.columns[col];
      }
      return r;
    });
    setRows(_rows);
  }
  return (
    <svg viewBox=" -20 -20 800 500" width="100%" height="100%">
      {rows.map((row, rowKey) =>
        (<text x="2" y="1.25em" key={rowKey}>
          {row.columns.map((col, colKey) =>
              (<BitComponent bitStatus={col} colKey={colKey} rowKey={rowKey} toggleBit={toggleBit}/>)
            )}
        </text>)
      )}
    </svg>
  )

}
export default BoardComponent;
