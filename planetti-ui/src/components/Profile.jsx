import React from 'react';
import Joi from 'joi';
import { Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Form from './common/Form';
import styles from '../assets/css/usersettings.module.css';

class Profile extends Form {
  state = {
    data: {
      name: '',
      email: ''
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
      .label('Email')
  });

  // doSubmit = async () => {
  //    try {
  //       const res = await signup(this.state.data);
  //       if (res) {
  //         this.props.history.push('/login');
  //          this.successNote();
  //       }
  //    }
  //    catch (ex) {
  //       if (ex.response && ex.response.status === 400) {
  //          const errors = { ...this.state.errors };
  //          errors.email = ex.response.data;
  //          this.setState({ errors });
  //       }
  //    }
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
              {this.renderInput('name', 'Name', 'name')}
              {this.renderInput('email', 'Email', 'email')}
              {this.renderButton('Save', `${styles['signup-btn']}`)}
            </form>
          </Card.Body>
        </Card>
    );
  }
}

export default Profile;