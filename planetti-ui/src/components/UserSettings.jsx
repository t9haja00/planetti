import React from 'react';
import { Route } from 'react-router-dom';
import SettingsNavBar from './common/SettingsNavBar';
import Profile from './Profile';
import ChangePassword from './ChangePassword';
import DeleteAccount from './DeleteAccount';
import styles from '../assets/css/settings.module.css';

const UserSettings = ({
  match,
  deleteFeedBack = f => f,
  profileFeedBack = f => f
}) => {
  return (
    <div className='d-flex'>
      <SettingsNavBar />
      <div className="col-7 my-3 mx-2">
        <p className={`${styles.title} h2`}>User Settings</p>
        <Route
          path={`${match.path}/user-profile`}
          render={() => <Profile profileFeedBack={profileFeedBack}/>} />
        <Route
          path={`${match.path}/change-password`}
          component={ChangePassword} />
        <Route
          path={`${match.path}/delete-account`}
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