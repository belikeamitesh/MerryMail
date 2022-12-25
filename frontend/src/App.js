import {Routes , Route } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
// import Makecard from './Components/Makecard';
import Email from './Components/Email';
import Navbar from './Components/Navbar';
import Authentication from "./Components/Session/index.js"
// import Dashboard from './Components/Dashboard';

function App() {
  return (
      <div className="App">
    <Routes>
      <Route exact path={'/'} element={<><Navbar/>
        <Home/></>} />
      <Route exact path={'/signup'} element={<Signup/>}/>
      <Route exact path={'/login'} element={<Login/>}/>
      {/* <Route exact path={'/makecard'} element={<Makecard/>}/> */}
      <Route exact path={'/send'} element={<Email/>}/>
      
    </Routes>
    {/* <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/login" element={ <Login/> } />
        <Route path="/signup" element={ <Signup/> } />
      </Routes> */}
    </div>
  );
}

export default Authentication(App);
