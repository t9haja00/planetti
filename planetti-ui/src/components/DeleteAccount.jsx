import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Joi from 'joi';
import { toast } from 'react-toastify';
import Form from './common/Form';
import { deleteUserAccount } from '../services/userService';
import styles from '../assets/css/delete-account.module.css';

class DeleteAccount extends Form {
  state = {
    show: false,
    data: {
      confirm: ''
    },
    errors: {}
  };

  schema = Joi.object({
    confirm: Joi
      .string()
      .required()
      .allow('DELETE')
      .only()
      .messages({
        'string.empty': `Write "DELETE" or  click cancel`,
        'any.required': `Write "DELETE" or  click cancel`
      })
      .label('confirm')
  });

  handleClose = () => {
    let data = { ...this.state.data };
    data.confirm = '';
    this.setState({ show: false, data });
  };

  handleShow = () =>
    this.setState({ show: true });

  doSubmit = async () => {
    const userInfo = localStorage.getItem('userInfo');
    const { user_id } = JSON.parse(userInfo);

    await deleteUserAccount(user_id);

    localStorage.removeItem('userInfo');
    this.props.history.replace('/');
    this.props.deleteFeedBack();
  };

  render() {
    return (
      <>
        {this.state.show &&
          <Modal
            centered
            show={this.state.show}
            onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title className={styles['modal-title']}>
                Delete Account
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p className='h5 mb-5 text-center'>
                We are sad to see you go!
              </p>
                {this.renderInput('confirm', 'Please confirm by Writing "DELETE"')}
            </Modal.Body>
            <Modal.Footer className={styles['modal-footer']}>
              <Button 
                className='btn-danger'
                onClick={this.handlesubmit}>
                Delete my account
              </Button>
              <Button 
                className={styles.cancel}
                onClick={this.handleClose}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        }
        <div
          className='border border-1 border-danger p-3'>
          <p className='h5'>Please be careful, Once you delete your account, you will not be able to access your schedules anymore.
      </p>
          <button
            className='btn btn-danger mt-3'
            onClick={this.handleShow}>
            DELETE
      </button>
        </div>
      </>
    );
  }
}

export default DeleteAccount;