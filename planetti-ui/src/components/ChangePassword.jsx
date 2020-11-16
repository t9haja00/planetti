import React from 'react';
import Joi from 'joi';
import { toast } from 'react-toastify';
import { changePassword } from '../services/changePasswordService';
import Form from './common/Form';

class ChangePassword extends Form {
  state = {
    data: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    },
    errors: {}
  };

  schema = Joi.object({
    oldPassword: Joi
      .string()
      .required()
      .messages({
        'string.empty': `"Password" cannot be empty`,
        'any.required': `"Password" is required`
      })
      .label('Old Password'),
    newPassword: Joi
      .string()
      .min(5)
      .required()
      .messages({
        'string.empty': `"Password" cannot be empty`,
        'any.required': `"Password" is required`
      })
      .label('New Password'),
    confirmNewPassword: Joi
      .string()
      .valid(Joi.ref('newPassword'))
      .messages({
        'string.empty': `"Confirmation Password" cannot be empty`,
        'any.only': `"Confirmation Password" must match "New Password"`
      })
      .label('Confirm Password')
  });

  doSubmit = async () => {
    const userInfo = localStorage.getItem('userInfo');
    const { email } = JSON.parse(userInfo);

    try {
      await changePassword(this.state.data, email);

      this.successNote();

      const data = {
        ...this.state.data,
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      }
      this.setState({ data });
    }
    catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.oldPassword = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  successNote = () => {
    toast.dark(('Password changed successfully'));
  };

  render() {
    return (
          <form onSubmit={this.handlesubmit} noValidate>
            {this.renderInput('oldPassword', 'Old Password', 'password')}
            {this.renderInput('newPassword', 'New Password', 'password')}
            {this.renderInput('confirmNewPassword', 'Renter New Password', 'password')}
            {this.renderButton('Change password')}
          </form>
    );
  }
}

export default ChangePassword;