import './App.css';

// function App() {
//   const [count, setCount] = useState(0);


//   function updatecount() {
//     setCount((count) => count + 1);
//     setCount((count) => count + 1);
//   }

//   useEffect(() => {
//     console.log("useEffect called in App");
//     return () => {
//       console.log("Cleaning function called in App");// cleaning function called similar to Unmount
//     };
//   }, []);

//   return (
//     <>
//       <h1>Welcome to the React world</h1>
//       <Header></Header>
//       <button onClick={updatecount}>Counter {count}</button>
//     </>
//   );
// }

// // // // // function Header() {
// // // // //   const [isVisible, setIsVisible] = useState(true);

// // // // //   useEffect(() => {
// // // // //     console.log("useEffect called in Header");
// // // // //     return () => {
// // // // //       console.log("Unmount called in Header");
// // // // //     };
// // // // //   }, []);

// // // // //   return (
// // // // //     <>

// // // // //       <button onClick={(e) => setIsVisible(!isVisible)}>togle:{isVisible ? "function" : " "}</button>
// // // // //       <h1> this is togle</h1>
// // // // //     </>
// // // // //   );
// // // // // }

import React, { useCallback, useEffect, useState, useMemo, Suspense, lazy } from 'react';

const AboutLazy = lazy(() => import("./componets/About"));
const ContactLazy = lazy(() => import("./componets/contact"))

// 

// 
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom'
import Home from './componets/Home';
import About from './componets/About';
import Contact from './componets/contact';

function App() {
  return (

    <BrowserRouter>

      <Link to={'/'}>Home</Link>
      <Link to={'About'}>About</Link>
      <Link to={'/contact'}>Contact</Link>
      <Routes>

        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/contact" element={<Suspense><ContactLazy /></Suspense>}></Route>
        <Route path="/About" element={<Suspense><AboutLazy /></Suspense>}></Route>
      </Routes>

    </BrowserRouter>
  )
}

export default App;
