import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import CurrentTask from './CurrentTask';
import NewTasks from './NewTasks';
import Navbar from './components/Navbar';


ReactDOM.render(  <BrowserRouter>
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="currentTasks" element={<CurrentTask />} />
    <Route path="newTasks" element={<NewTasks />} />
    <Route
      path="*"
      element={
        <main style={{ padding: "1rem" }}>
          <Navbar/>
          <p>There's nothing here!</p>
        </main>
      }
    />
  </Routes>
</BrowserRouter>, document.getElementById('root'));
