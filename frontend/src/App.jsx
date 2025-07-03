import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/nav';
import Signup from './components/signup';
import WriteBlog from './components/writeBlog';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Navbar/>}>
          <Route path='write' element={<WriteBlog/>}></Route>
          <Route path='signin' element={<Signup type="sign-in"/>}></Route>
          <Route path='signup' element={<Signup type="sign-up"/>}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
