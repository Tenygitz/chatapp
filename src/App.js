
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import {BrowserRouter as Router,Routes,Route, Navigate} from "react-router-dom"
import HomePage from './pages/HomePage';
import { AuthContext } from './context/AuthContext';
import { useContext } from "react";

function App() {
  const{ currentUser}=useContext(AuthContext)
  console.log(currentUser)
  const ProtectedRoute=({Children})=>{
        if(!currentUser){
          return<Navigate to="/login"></Navigate>// to hide homepage ,use protctedroute
        }
          return Children
        
  }

  
  return (
    <Router>

    <div className="App">
      <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      
      
      </Routes>
    </div>
    </Router>
  );
}

export default App;
