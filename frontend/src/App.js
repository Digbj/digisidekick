import "./App.css"
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Components/Home';
import AddUser from "./Components/addUser";
import Footer from "./Components/footer";
import Nav from "./Components/nav";
import AllUser from "./Components/allUser";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/AddUser" element={<AddUser/>}/>
        <Route path="/AllUser" element={<AllUser/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
