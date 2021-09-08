import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar'
import style from './app.module.css';


function App() {
  return (
    <div className={style.container}>
      <Navbar />
    </div>
  );
}

export default App;