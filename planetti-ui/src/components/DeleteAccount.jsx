import React from 'react';
import { toast } from 'react-toastify';
import {deleteUserAccount} from '../services/userService';

const DeleteAccount = () => {

  const handleDelete = async () => {
    const userInfo = localStorage.getItem('userInfo');
    const { user_id } = JSON.parse(userInfo);

    await deleteUserAccount(user_id);
    localStorage.removeItem('userInfo');
    window.location = '/';
    successNote();
  };

  const successNote = () => {
    toast.dark(('Saved')
    );
  };

  return (
    <div>
      <h3>Once you delete your account, there is no going back. Please be certain.
      </h3>
      <button onClick={handleDelete}>
        DELETE
      </button>
    </div>
  );
}

export default DeleteAccount;