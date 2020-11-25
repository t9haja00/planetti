import React from 'react';
import { Link } from 'react-router-dom';
import Joi from 'joi';
import { signin } from '../services/authService';
import Form from '../components/common/Form';
import styles from '../assets/css/signin.module.css';

class Signin extends Form {
  state = {
    data: { email: '', password: '' },
    errors: {}
  };

  schema = Joi.object({
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
      .required()
      .messages({
        'string.empty': `"Password" cannot be empty`,
        'any.required': `"Password" is required`
      })
      .label('Password')
  });

  componentDidMount() {
    if (localStorage.getItem('userInfo')) {
      this.props.history.replace('/');
    }
  }

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const { data: userInfo } = await signin(data.email, data.password);

      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      this.props.history.push('/');
      this.props.signin();
    }
    catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <>
        <div className="text-center pt-4 pb-3">
          <Link
            to="/"
            className="text-decoration-none">
            <p
              className={styles['navbar-brand']}
            >Planetti</p>
          </Link>
        </div>
        <div className={`${styles['auth-form']} container px-3`}>
          <form onSubmit={this.handlesubmit} noValidate>
            <div className="text-center">
              <p className="h3 font-weight-light">Sign in to Planetti</p>
            </div>
            <div
              className={`${styles['auth-form-body']} mt-3 p-4 rounded border shadow`}>
              {this.renderInput('email', 'Email address')}
              {this.renderInput('password', 'Password', 'password')}
              {this.renderButton('Sign in')}
            </div>
          </form>
        </div>
        <div className="container text-center mt-4">
          <small className="text-muted">© 2020 Planetti Inc.</small>
        </div>
      </>
    );
  }
};

export default Signin;