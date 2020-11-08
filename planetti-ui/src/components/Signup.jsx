import React from 'react';
import Joi from 'joi';
import { Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { signup } from '../services/userService';
import Form from './common/Form';
import styles from '../assets/css/signup.module.css';

class Signup extends Form {
  state = {
    data: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    errors: {}
  };

  schema = Joi.object({
    name: Joi
      .string()
      .required()
      .messages({
        'string.empty': `"Name" cannot be empty`,
        'any.required': `"Name" is required`
      })
      .label('Name'),
    email: Joi
      .string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required()
      .messages({
        'string.email': `"Email" must be valid. ex: 'name@domain.com'`,
        'string.empty': `"Email" cannot be empty`,
        'any.required': `"Email" is required`
      })
      .label('Email'),
    password: Joi
      .string()
      .min(5)
      .required()
      .messages({
        'string.empty': `"Password" cannot be empty`,
        'any.required': `"Password" is required`
      })
      .label('Password'),
    confirmPassword: Joi
      .string()
      .valid(Joi.ref('password'))
      .messages({
        'string.empty': `"Password" cannot be empty`,
        'any.only': `"Password" must match`
      })
      .label('Confirm Password')
  });


  doSubmit = async () => {
     try {
        const res = await signup(this.state.data);
        if (res) {
           this.successNote();
        }
     }
     catch (ex) {
        if (ex.response && ex.response.status === 400) {
           const errors = { ...this.state.errors };
           errors.email = ex.response.data;
           this.setState({ errors });
        }
     }
  };

   successNote = () => {
      toast.dark(('Successfully registered!')
      );
   };

  render() {
    return (
      <Card className="text-gray bg-gray-light">
        <Card.Body>
          <form onSubmit={this.handlesubmit} noValidate>
              {this.renderInput('name', 'Name', 'name')}
              {this.renderInput('email', 'Email', 'email')}
              {this.renderInput('password', 'Password', 'password')}
              {this.renderInput('confirmPassword', 'Renter Password', 'password')}
              {this.renderButton('Sign up for Planetti', `${styles['signup-btn']}`)}
          </form>
          <p className="w-100 mb-0 mt-2 text-muted text-small">
            <small>
              By clicking “Sign up for Planetti”, you agree to our Terms of Service and Privacy Statement.
            </small>
          </p>
        </Card.Body>
      </Card>
    )
  }
}

export default Signup;