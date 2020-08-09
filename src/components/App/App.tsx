import './App.css';
import { Container } from 'react-bootstrap';
import React from 'react';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function App() {
  return (
    <Container>
      <FontAwesomeIcon icon={ faHome } /> Home
    </Container>
  );
}

export default App;
