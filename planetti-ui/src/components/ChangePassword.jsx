import React from 'react';
import Joi from 'joi';
import { toast } from 'react-toastify';
import { Card } from 'react-bootstrap';
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


  // doSubmit = async () => {
  //   try {
  //     const res = await signup(this.state.data);
  //     if (res) {
  //       this.props.history.push('/login');
  //       this.successNote();
  //     }
  //   }
  //   catch (ex) {
  //     if (ex.response && ex.response.status === 400) {
  //       const errors = { ...this.state.errors };
  //       errors.email = ex.response.data;
  //       this.setState({ errors });
  //     }
  //   }
  // };

  successNote = () => {
    toast.dark(('Successfully registered!')
    );
  };

  render() {
    return (
      <Card className="text-gray bg-gray-light mb-5">
        <Card.Body>
          <form onSubmit={this.handlesubmit} noValidate>
            {this.renderInput('oldPassword', 'Old Password', 'password')}
            {this.renderInput('newPassword', 'New Password', 'password')}
            {this.renderInput('confirmNewPassword', 'Renter New Password', 'password')}
            {this.renderButton('Change password')}
          </form>
        </Card.Body>
      </Card>
    );
  }
}

export default ChangePassword;