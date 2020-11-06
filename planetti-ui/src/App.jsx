import React from 'react';
import {Route, Switch} from 'react-router-dom';
import NavBar from './components/common/NavBar';

const App = () => {
  return (
    <div className='container'>
      <NavBar siteName="Planetti" user={null} onLogout=""/>
    </div>
  );
}

export default App;
