import {LoginPage} from "./Promodoro/LoginPage";
import {Timer} from "./pages/Timer"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path="/" exact Component={LoginPage}/>
          <Route  path="/timer" exact Component={Timer}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
