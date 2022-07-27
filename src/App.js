
import './App.css';
import React from 'react'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import Signin from './components/Signin';
function App() {
  const isLoading = React.useState(false);
  // const signedIn = React.useState(false);
  const [token, setToken] = React.useState(
    localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : null
  );
  return (

  <div className='checkLogin'>
    {
      token? <div className='signed_in'>
  
      <Navbar/>
     <Home/>
     <Footer/>
     
   </div>: <Signin/>
    }
  </div>
 
   
  );
}

export default App;
