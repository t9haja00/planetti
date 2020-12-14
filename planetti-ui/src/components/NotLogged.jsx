import React from 'react';
import { Jumbotron, CardDeck, Card, Container } from 'react-bootstrap';
import Signup from './Signup';

const NotLogged = ({ history }) => {

  return (
    <>
      <Jumbotron>
        <div className="container-lg">
          <div
            className="d-block d-sm-flex align-items-center gutter-md-spacious">
            <div className="col-lg-7 col-d-sm-w-100 col-d-block-md text-center">
              <p className="h1 text-wrap">Schedule generator for everyone</p>
            </div>
            <div className="col-lg-5 col-d-sm-w-100">
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
                This is a wider card with supporting text below as a natural lead-in to
                additional content. This content is a little bit longer.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="shadow-lg text-center border-0">
            <Card.Body>
              <Card.Title>Share</Card.Title>
              <Card.Text>
                This card has supporting text below as a natural lead-in to additional
        content.{' '}
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="shadow-lg text-center border-0">
            <Card.Body>
              <Card.Title>Enjoy</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural lead-in to
                additional content. This card has even longer content than the first to
                show that equal height action.
              </Card.Text>
            </Card.Body>
          </Card>
        </CardDeck>
      </Container>
    </>
  );
};

export default NotLogged;