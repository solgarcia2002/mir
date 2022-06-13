import React, {useState, useEffect} from "react";
import styled from '@emotion/styled'

export interface ToggleBitType {
  row: number;
  col: number;
}

interface BitType {
  bitStatus: boolean;
  colKey: number;
  rowKey: number;
  toggleBit: ({row, col}: ToggleBitType) => void;
}

const BitComponent = ({bitStatus, colKey, rowKey, toggleBit}: BitType) => {
  const [bitState, setBitState] = useState<boolean>(false);
  useEffect(() => {
    setBitState(bitStatus);
  }, [bitStatus]);

  return (<TSPAN
    x={colKey * 30}
    y={rowKey * 50}
    fill={bitState ? 'coral' : 'teal'}
    onClick={(event) => {
      toggleBit({row:rowKey, col:colKey});
    }}>{bitState ? 'o' : '-'}</TSPAN>);

}
const TSPAN = styled.tspan`
  cursor: pointer;
  font-size: 2rem;
  text-align: center;
`;

export default BitComponent;
