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
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/jami-hannus-428a281b1"
                  onClick={() => {
                    window.open('https://www.linkedin.com/in/karim-abdelrahman86');
                    window.open('https://www.linkedin.com/in/alexander-veliev-784ba8201');
                  }}>
                  <img className={styles.icon} src={`${iconsUrl}/icons/linkedin.svg`} alt='' />
                </a>
              </li>
              <li className="mr-3">
                <a target="_blank" href="https://github.com/k-rahman/planetti">
                  <img className={styles.icon} src={`${iconsUrl}/icons/github.svg`} alt='' />
                </a>
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