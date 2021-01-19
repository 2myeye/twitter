import React, { useEffect, useState } from 'react';
import IndexRouter from 'components/IndexRouter';
import { authService } from "fbase";


const App = () => {
  const [init,setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj,setUserObj] = useState(null);

  useEffect(()=>{
    authService.onAuthStateChanged((user)=>{
      if(user){
        setIsLoggedIn(true);
        setUserObj(user);
      } else{
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  },[])

  return (
    <div>
      {init ? <IndexRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : "Initializing.."}
    </div>
  );
}

export default App;
