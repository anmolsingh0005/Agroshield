import Home from './Components/Home';
import Footer from './Components/Footer';
import Form from './Components/Form';
import './App.css';
import { useNavigate } from 'react-router-dom';
import { Route, Routes} from 'react-router-dom';
import Landingpage from './Components/Landingpage';
import NoteState from './Context/NoteState';
import Data from './Components/Data';
import NotFoundPage from './Components/NotFoundpage';
import { useEffect } from 'react';
import Edit from './Components/Edit';
import Editaccess from './Components/Editaccess';


function App() {
  const navigate=useNavigate();
  const isLoggedIn=sessionStorage.getItem("username")
  useEffect(()=>{
    if(isLoggedIn){
      navigate('/home')
    }
  },[])

  return (
    <div className="App">
     <NoteState>
      <Routes>
        <Route path='/editaccess' element={<Editaccess/>} />
        <Route path='/edit/:id' element={<Edit/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/' element={<Landingpage />} />
        <Route path='/form' element={<Form/>} />
        <Route path='/home/:id' element={<Data/>} />
        <Route path='*' element={<NotFoundPage/>} />
      </Routes>
     
      <Footer/>
      </NoteState>
      
      
    </div>
  );
}

export default App;
