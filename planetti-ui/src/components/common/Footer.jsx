import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../../assets/css/footer.module.css';

const iconsUrl = process.env.REACT_APP_API;

const Footer = ({ match }) => {
  const location = useLocation();

  let fixedBottom = "";
  const footer = () => {
    const { pathname } = location;
    if (pathname.toLowerCase() !== '/login') {
      return (
        <div className={`${styles.main} ${fixedBottom}`}>
          <div className="d-flex container justify-content-between flex-row-reverse align-items-center py-3">
            <ul className="list-unstyled d-flex justify-content-center mb-0">
              <li className="mr-3">
                <img className={styles.icon} src={`${iconsUrl}/icons/facebook.svg`} alt='' />
              </li>
              <li className="mr-3">
                <img className={styles.icon} src={`${iconsUrl}/icons/linkedin.svg`} alt='' />
              </li>
              <li className="mr-3">
                <img className={styles.icon} src={`${iconsUrl}/icons/github.svg`} alt='' />
              </li>
            </ul>
            <div>
              <small className="text-muted">© 2020 Planetti Inc.</small>
            </div>
          </div>
        </div>
      )
    }
  }

  return (
    <div className='footer mt-auto'>
      {footer()}
    </div>
  );
};

export default Footer;