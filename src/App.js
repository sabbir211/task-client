import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom"
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Navbar from './Components/Navbar/Navbar';
import Behaviors from './Components/Behaviors/Behaviors';
import ImproveBehavior from './Components/Behaviors/ImproveBehavior';
import RequireAuth from './Components/Shared/RequireAuth';
function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<RequireAuth>
          <Behaviors></Behaviors>
        </RequireAuth>}></Route>
        <Route path="/behaviors" element={<RequireAuth>
          <Behaviors></Behaviors>
        </RequireAuth>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/improve/:name" element={<RequireAuth>
          <ImproveBehavior/>
        </RequireAuth>}></Route>
      </Routes>
    </div>
  );
}

export default App;
