
import './App.css';
import  Loading  from "./components/Loading";
import data from "./assets/data"
import React from 'react'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import Signin from './components/Signin';
import { Outlet, Link } from "react-router-dom";
function App() {
  const [isLoading, setIsLoading]  = React.useState(false);
  const [isSignedout, setIsSignedout]  = React.useState(false);
  const [user, setUser] = React.useState( localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  :{});
  const [loginData, setLoginData] = React.useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );
  const role = user?user.role: null;
  const [token, setToken] = React.useState(
    localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : null
  );
 

  const signOut = (e)=>{
    setIsLoading(true);
    setIsSignedout(true)
    data.signOut(data.auth).then(() => {
      // Sign-out successful.
      localStorage.removeItem("token");
      localStorage.removeItem("loginData");
      localStorage.removeItem("user");
      setIsLoading(false)
      window.location.reload();
    }).catch((error) => {
      // An error happened.
      alert("error in signing out!");
      setIsLoading(false);
      console.log(error);
    });
   
   }
  const getUserInfo = async()=>{
    setIsLoading(true);
    let idToken = await data.getIdToken();
    if(!idToken){
     idToken=token;
   }
   try {
     let config = {
       headers: {
         Authorization: `Bearer ${idToken}`,
       },
     };
     const response = await data.axios.get(
       `${data.BASE_URL}/internalUsersDetails`,
     
       config
     );
 
     const resp = response.data;
 
     setIsLoading(false);
     if(response.status === 404){
       alert(resp);
       signOut();
       return;
     }
     setUser(resp)
     localStorage.setItem("user",JSON.stringify(resp));
     // if(resp.role !== "writer"){
     //   alert("This is not a writer's profile, Please retry with a writer account.")
     //   signOut();
     // }
     return resp;
   } catch (errors) {
    setIsLoading(false);
     console.error(errors);
    
     alert("There was some problem is fetching data, please try again");
   }
 
   }
 
   React.useEffect(() => {
   
    if(!isSignedout && token){

      getUserInfo();
    }
   }, [])
  



  if(token){
 
    if(role==="writer"){
      return  (
        isLoading?(  <div>
          <Navbar/>
          <div className="app__wrapper">
          <Loading/>
        
        
          </div>
        
        
         <Footer/>
          </div>):(   <div>
        <Navbar/>
        <div className="app__wrapper">
        <ul className='app__links__tasks'>
          <h1>Podium Pro Writers</h1>
        {/* <button className="googleSignIn" onClick={handleSignOut}> Sign Out </button> */}
        <li className='p__opensans'>   <button className='custom__button' onClick={signOut}>Sign Out</button></li>
        <li className='p__opensans'> <Link to="/currentTasks"> <button className='custom__button'> View ongoing tasks </button></Link></li>
        <li className='p__opensans'><Link to="/newTasks">  <button className='custom__button'>Accept/Reject tasks</button></Link> </li>
        <Outlet />
      </ul>
        </div>
     
    
       <Footer/>
        </div>)
     
      )
    }else{
      return( isLoading?(  <div>
        <Navbar/>
        <div className="app__wrapper">
        <Loading/>
      
      
        </div>
      
      
       <Footer/>
        </div>):
        <div>
        <Navbar/>
        <div className="app__wrapper">
          <p>
            <h1> Coming Soon</h1>
          </p>
        <ul className='app__navbar-links'>
        {/* <button className="googleSignIn" onClick={handleSignOut}> Sign Out </button> */}
        <li className='p__opensans'>   <button onClick={signOut}>Sign Out</button></li>
       
        <Outlet />
      </ul>
        </div>
     
    
       <Footer/>
        </div>
      )
    }
       
       
      
      }else {
        return  <Signin/>
      }

 
}

export default App;
