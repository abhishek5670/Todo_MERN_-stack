import Header from './components/partials/header.jsx';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './components/home.jsx';
import Register from './components/register.jsx';
import Login from './components/login.jsx';
import { useState } from 'react';

function App() {
  return(
  <>
    <BrowserRouter>
    {/* <Header/> */}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login/>} />
    </Routes>
    </BrowserRouter>

  </>
  )
}

export default App;
