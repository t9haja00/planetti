import React from 'react';
import { Route } from 'react-router-dom';
import SettingsNavBar from './common/SettingsNavBar';
import Profile from './Profile';
import ChangePassword from './ChangePassword';
import DeleteAccount from './DeleteAccount';
import styles from '../assets/css/settings.module.css';

const UserSettings = ({
  deleteFeedBack = f => f,
  profileFeedBack = f => f
}) => {
  return (
    <div className='d-flex'>
      <SettingsNavBar />
      <div className="col-7 my-3 mx-2">
        <p className={`${styles.title} h2`}>User Settings</p>
        <Route
          path='/user-settings/user-profile'
          render={() => <Profile profileFeedBack={profileFeedBack}/>} />
        <Route
          path='/user-settings/change-password'
          component={ChangePassword} />
        <Route
          path='/user-settings/delete-account'
          render={routeProps => {
            return <DeleteAccount
              deleteFeedBack={deleteFeedBack}
              {...routeProps} />
          }
          } />
      </div>
    </div>
  );
}

export default UserSettings;