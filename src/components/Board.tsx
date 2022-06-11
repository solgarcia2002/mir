import React, {useState, useEffect} from "react";

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
  const toggleBit = (row: number, column: number) => {
    const _rows = rows.map((r, rKey) => {
      if (rKey === row) {
        r.columns[column]=!  r.columns[column];
      }
      return r;
    });
    setRows(_rows);
  }
  return (
    <svg viewBox=" -20 -20 600 337" width="100%" height="100%">
      {rows.map((row, rowKey) =>
        (<text x="2" y="1.25em" key={rowKey}>
          {row.columns.map((col, colKey) => {
           if( col) {
             return <tspan
               x={colKey * 25}
               y={rowKey * 50}
               fill='coral'
               key={`${rowKey}-${colKey}`}
               onClick={(event) => {
                 toggleBit(rowKey, colKey);
               }}>o</tspan>
           }
           else{ return <tspan
             x={colKey * 25}
             y={rowKey * 50}
             fill='blue'
             key={`${rowKey}-${colKey}`}
             onClick={(event) => {
               toggleBit(rowKey, colKey);
             }}>-</tspan>}
          }
            )}
        </text>)
      )}
    </svg>
  )

}
export default BoardComponent;
