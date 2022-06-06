import React from 'react';
import './App.css';
import BoardComponent from './components/Board';
import {Card, CardContent} from "@mui/material";

function App() {

  return (
    <Card style={{margin: 'auto', width: '30%', height: 'fit-content', backgroundColor: '#EEE', border: 'solid 0.3rem #AAA'}}>
      <CardContent>
        <h3>Miroculus - Board B</h3>
        <BoardComponent numberOfRows={7} numberOfColumns={24}/>
      </CardContent>
    </Card>
  );
}

export default App;
