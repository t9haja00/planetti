import React from 'react';
import Joi from 'joi';
import { toast } from 'react-toastify';
import { changeNameAndEmail, getUserInfoById } from '../services/userService';
import Form from './common/Form';

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

  async componentDidMount() {
    const userInfo = localStorage.getItem('userInfo');
    const { name, email } = JSON.parse(userInfo);
    const data = {
      ...this.state.data,
      name,
      email
    };

    this.setState({ data });
  }

  doSubmit = async () => {
    const { data } = this.state;
    const userInfo = localStorage.getItem('userInfo');
    const { user_id } = JSON.parse(userInfo);

    try {
      await changeNameAndEmail(data, user_id);
      const { data: newUserInfo } = await getUserInfoById(user_id);
      if (newUserInfo) {
        localStorage.setItem('userInfo', JSON.stringify(newUserInfo));
        this.props.profileFeedBack();
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
    toast.dark(('Saved')
    );
  };

  render() {
    return (
          <form onSubmit={this.handlesubmit} noValidate>
            {this.renderInput('name', 'Name', 'name')}
            {this.renderInput('email', 'Email', 'email')}
            {this.renderButton('Save')}
          </form>
    );
  }
}

export default Profile;