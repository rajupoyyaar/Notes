import React,{useState} from "react"
import './App.css';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import LandingPage from './Pages/LandingPage';
import MyNotes from './Pages/MyNotes';
import Login from './Pages/Login';
import Register from './Pages/Register';
import CreateNote from './Pages/CreateNote';
import SingleNote from './Pages/SingleNote';
import Profile from "./Pages/Profile";

function App() {
  const [search,setSearch] = useState("")
  console.log(search)
  return (
    <div >
      <BrowserRouter>
        <Header setSearch={setSearch}/>
         <Routes>
           <Route path='/' Component={ LandingPage } exact />
           <Route path='/login' Component = {Login}/>
           <Route path='/register' Component = {Register}/>
           <Route path="/profile" Component= {Profile}/>
           <Route path='/createnote' Component = {CreateNote}/>
           <Route path='/note/:id' Component={SingleNote}/> 
           <Route path='/mynotes' element={<MyNotes search={search} /> }/>
         </Routes>
        <Footer />    
      </BrowserRouter>     
    </div>
  );
}

export default App;
