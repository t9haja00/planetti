import React from 'react';
import styles from '../../assets/css/footer.module.css';

const iconsUrl = process.env.REACT_APP_API;

const Footer = () => {
  return (
    <div className='footer mt-auto'>
      <div className={styles.main}>
        <div className="d-flex container justify-content-between flex-row-reverse align-items-center py-3">
          <ul className="list-unstyled d-flex justify-content-center mb-0">
            <li className="mr-3">
              <img className={styles.icon} src={`${iconsUrl}/icons/facebook.svg`} />
            </li>
            <li className="mr-3">
              <img className={styles.icon} src={`${iconsUrl}/icons/linkedin.svg`} />
            </li>
            <li className="mr-3">
              <img className={styles.icon} src={`${iconsUrl}/icons/github.svg`} />
            </li>
          </ul>
          <div>
            <small className="text-muted">© 2020 Planetti Inc.</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;