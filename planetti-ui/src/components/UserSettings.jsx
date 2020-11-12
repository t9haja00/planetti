import React from 'react';
import { Route } from 'react-router-dom';
import SettingsNavBar from './common/SettingsNavBar';
import Profile from './Profile';
import ChangePassword from './ChangePassword';
import DeleteAccount from './DeleteAccount';

const UserSettings = () => {
  return (
    <>
      <h1>User Settings</h1>
      <div className="container">
        <SettingsNavBar />
        <Route path='/user-settings/user-profile' component={Profile} />
        <Route path='/user-settings/change-password' component={ChangePassword} />
        <Route path='/user-settings/delete-account' component={DeleteAccount} />
      </div>
    </>
  );
}

export default UserSettings;