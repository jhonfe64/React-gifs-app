import React, {useState} from 'react';
import './App.css';
import Header from './components/Header';
import Searching from './components/Searching';


function App() {

  const [darkModeBtn, setDarkModeBtn] = useState(true)

  return (
    <div className={darkModeBtn ? "whiteMode": "darkMode"}>
     <Header setDarkModeBtn={setDarkModeBtn} darkModeBtn={darkModeBtn} />
     <Searching/>
    </div>
  );
}

export default App;

////////////////////////////////





