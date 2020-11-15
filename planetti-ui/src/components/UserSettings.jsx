import React from 'react';
import { Route } from 'react-router-dom';
import SettingsNavBar from './common/SettingsNavBar';
import Profile from './Profile';
import ChangePassword from './ChangePassword';
import DeleteAccount from './DeleteAccount';

const UserSettings = () => {
  return (
    <div className='d-flex'>
      <SettingsNavBar />
      <div className="col-7 my-4 mx-2">
      <h1>User Settings</h1>
        <Route 
          path='/user-settings/user-profile'
          component={Profile} />
        <Route 
          path='/user-settings/change-password' 
          component={ChangePassword} />
        <Route 
          path='/user-settings/delete-account' 
          component={DeleteAccount} />
      </div>
    </div>
  );
}

export default UserSettings;