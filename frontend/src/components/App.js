import React, { useState } from 'react';
import IndexRouter from 'components/Router';
import { authService } from "fbase";


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);

  return (
    <div>
      <IndexRouter isLoggedIn={isLoggedIn} />
    </div>
  );
}

export default App;
