import React, { Component } from 'react';
import Pet from './Pet.js'
import './Pets.css';

const pets = require("../pets.json")

class Pets extends Component {
  render() {
    const petsElements = []
    pets.map((pet) => petsElements.push(<Pet key={pet.id} pet={pet}></Pet>))
    return (
      <div className="container">
        {petsElements}
      </div>
    );
  }
}

export default Pets;
