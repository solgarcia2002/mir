import React from 'react';
import './App.css';
import BoardContainer from './containers/Board';
import {Card, CardContent} from "@mui/material";
import styled from "@emotion/styled";

const App = ()  =>  (
    <CARD style={{}}>
      <CardContent>
        <h3>Bit Board B</h3>
        <BoardContainer numberOfRows={7} numberOfColumns={24}/>
      </CardContent>
    </CARD>
  );

const CARD = styled(Card)` 
  margin: auto; 
  width: 90%;
  height: fit-content;
  background-color: #EEE;
  border: solid 0.3rem #AAA;`;

export default App;
