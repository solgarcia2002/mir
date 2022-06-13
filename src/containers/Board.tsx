import React, {useState, useEffect} from "react";
import BitComponent, {ToggleBitType} from "../components/Bit";
import {Button, Snackbar, Alert} from "@mui/material";
import styled from "@emotion/styled";

interface BoardComponentType {
  numberOfRows: number;
  numberOfColumns: number;
}

interface RowType {
  columns: boolean[];
}

interface ClustersType {
  Clusters: number [][];
}

interface PopulateBoardType {
  data: ClustersType | null | undefined;
  numberOfRows: number;
  numberOfColumns: number;
}

const BoardContainer = ({numberOfRows, numberOfColumns}: BoardComponentType) => {
  const [rows, setRows] = useState<RowType[]>([{columns: []}]);
  const [data, setData] = useState<ClustersType | null>();
  const [openErrorToast, setOpenErrorToast] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch('http://localhost:3001/savedBits.json');
        setData(await result.json());
      } catch (e) {
        setOpenErrorToast(true);
      }
    }
    fetchData();
  }, [])
  const setBoardWithData = ({data, numberOfRows, numberOfColumns}: PopulateBoardType) => {

    //Creating an array of columns based on numberOfRows,
    //each column is created in base of numberOfColumns formatting an array of boolean (false by default)
    //If data will be populated with it
    const clustersSaved = data?.Clusters.flatMap((d: any[]) => d);
    const _rows = [...Array(numberOfRows).keys()].map(r =>
      ({
        columns: [...Array(numberOfColumns).keys()].map(c =>
          // Populating board with data provided by the API
          !!(clustersSaved?.find((cluster) => cluster[0] === c && cluster[1] === r
          )))
      }));
    return _rows;
  }
  useEffect(() => {
    setRows(setBoardWithData({data, numberOfRows, numberOfColumns}));
  }, [numberOfRows, numberOfColumns, data]);

  const toggleBit = ({row, col}: ToggleBitType) => {
    const _rows = rows.map((r, rKey) => {
      if (rKey === row) {
        r.columns[col] = !r.columns[col];
      }
      return r;
    });
    setRows(_rows);
  }
  const handleCloseToast = () => setOpenErrorToast(false);
  const submitBoard = async () => {
    try {
      const config = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rows),
      }
      //simulating POST to a fantastic endpoint ;)
      const response = await fetch('http://localhost:3001/savedBits.json', config);
      if (response.ok) {
        return response
      } else {
        setOpenErrorToast(true);
      }
    } catch (error) {
      setOpenErrorToast(true);
    }
  }

  const handleResetRows = () => {

    setRows(setBoardWithData({data, numberOfRows, numberOfColumns}));
  }

  return (
    <div>
      <svg viewBox=" -20 -20 800 500" width="100%" height="100%">
        {rows.map((row, rowKey) =>
          (<text x="2" y="1.25em" key={rowKey}>
            {row.columns.map((col, colKey) =>
              (<BitComponent
                key={`${rowKey}-${colKey}`}
                bitStatus={col}
                colKey={colKey}
                rowKey={rowKey}
                toggleBit={toggleBit}/>)
            )}
          </text>)
        )}
      </svg>
      <ACTIONS>
        <Button variant="outlined" onClick={handleResetRows}>Reset Board </Button>
        <Button variant="contained" onClick={submitBoard}>Submit Board</Button>
      </ACTIONS>
      <Snackbar open={openErrorToast} autoHideDuration={6000} onClose={handleCloseToast}>
        <Alert onClose={handleCloseToast} severity="error" sx={{width: '100%'}}>
          Some error occurs when Fetching data
        </Alert>
      </Snackbar>
    </div>
  )
}
const ACTIONS = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  button {
    margin: 0 1rem;
  }
`;

export default BoardContainer;
