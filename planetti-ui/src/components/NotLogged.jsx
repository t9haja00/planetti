import React from 'react';
import { Jumbotron, CardDeck, Card, Container } from 'react-bootstrap';
import Signup from './Signup';

const NotLogged = ({ history }) => {

  return (
    <>
      <Jumbotron>
        <div className="container-lg">
          <div
            className="d-flex align-items-center gutter-md-spacious">
            <div className="col-7 text-center">
              <p className="h1 text-wrap">Schedule generator for every day activities and more!</p>
            </div>
            <div className="col-5">
              <Signup history={history} />
            </div>
          </div>
        </div>
      </Jumbotron>
      <Container className="my-5">
        <CardDeck>
          <Card className="shadow-lg text-center border-0">
            <Card.Body>
              <Card.Title>Create</Card.Title>
              <Card.Text>
                Create customizable schedules <br/>
                Allows up to 4 custom fields <br/>
                Select your favorite color
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="shadow-lg text-center border-0">
            <Card.Body>
              <Card.Title>Share</Card.Title>
              <Card.Text>
                Share your unique schedules with other people without them having to register
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="shadow-lg text-center border-0">
            <Card.Body>
              <Card.Title>Be Green Leave It On The Screen</Card.Title>
              <Card.Text>
                Save Paper <br />
                Save Trees
              </Card.Text>
            </Card.Body>
          </Card>
        </CardDeck>
      </Container>
    </>
  );
};

export default NotLogged;