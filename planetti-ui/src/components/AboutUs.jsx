import React from "react";
import { Card } from "react-bootstrap";
import styles from "../assets/css/aboutus.module.css";
import logo from "../assets/images/logo_no_bg.svg";
function AboutUs() {
  return (
    <div className={styles.wrapper}>
      <Card className={styles.items}>
        <Card.Body className={styles.card_style}>
          <Card.Title>
            <h4> What is Planetti?</h4>
          </Card.Title>
          <hr></hr>
            <p>Planetti is a highly customizeable schedule generator application, 
              it is usefull for keeping track of multiple schedules one might need.
              <br></br>
              One of our core principles, is that scheduling should be possible without
              any dependance on third-parties that host the schedule application.</p>
        </Card.Body>
      </Card>
      <Card className={styles.items}>
        <Card.Body className={styles.card_style}>
          <Card.Title>
            <h4> How do I use Planetti?</h4>
          </Card.Title>
          <hr></hr>
            <p>Planetti is quite straightforward to use, there are no limitations (yet) on the amount of schedules
              one can create or delete per day, so experiment!<br></br> You can create schedules from the main page,
              by clicking the "Create new schedule" button.
            </p>
        </Card.Body>
      </Card>
      <Card className={styles.items}>
        <Card.Body className={styles.card_style}>
          <Card.Title>
            <h4>How do I add custom input fields?</h4>
          </Card.Title>
          <hr></hr>
            <p>To add custom input fields to your schedule, for example, a field called "name" or "last name",
              "phone number" or "email-adress". You can add these fields during the schedule creation, by clicking on
              the "add custom event titles" button.<br></br> With this you can add up to four custom fields,
              and make them mandatory if needed.
            </p>
        </Card.Body>
      </Card>
      <Card className={styles.items}>
        <Card.Body className={styles.card_style}>
          <Card.Title>
            <h4>How do I change my user settings?</h4>
          </Card.Title>
          <hr></hr>
            <p>To change your user settings, like email or password. You can do that by going to the user settings page,
              by clicking your username in the topright of the screen. Here you can edit your user settings,
              and if you want to start over, you can also delete your account.
            </p>
        </Card.Body>
      </Card>
      <Card className={styles.items}>
        <Card.Body className={styles.card_style}>
          <Card.Title>
            <h4>Can I edit my schedule settings?</h4>
          </Card.Title>
          <hr></hr>
            <p>If you want to change your schedule title and or description, you can do that from the main page
              by clicking the "edit" button. You cannot edit the custom fields, timespan or colors from here.
              To do that, you need to make a new schedule, and delete your old one. 
              You can delete your schedule by clicking on the "delete" button on the main page, of the schedule 
              you want to delete.
            </p>
        </Card.Body>
      </Card>
      <img src={logo} className={styles.logo} alt="logo"/>
    </div> 
  );
}
export default AboutUs;
