import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/nav';
import Signup from './pages/signup';
import WriteBlog from './pages/writeBlog'
import Home from './pages/Home'
import BlogDetails from './pages/BlogDetails'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Navbar/>}>
          <Route index element={<Home />}></Route>
          <Route path='write' element={<WriteBlog/>}></Route>
          <Route path='signin' element={<Signup type="sign-in"/>}></Route>
          <Route path='signup' element={<Signup type="sign-up"/>}></Route>
          <Route path="blog/:id" element={<BlogDetails/>}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
