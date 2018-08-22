import React, { Component } from 'react';
import "./Pet.css"
import { Button } from 'antd';
import { Card } from 'antd';

class Pet extends Component {
  render() {
    const pet = this.props.pet
    return (
      <div className="box">
      <Card title={pet.name}>
          <div><img className="pic" src={pet.picture} alt="" /></div>
          <p>Breed: {pet.breed}</p>
          <p>Age: {pet.age}</p>
          <p>Location: {pet.age}</p>
          <p>Adopter: </p>
          <p>
            <Button>Adopt</Button>
          </p>
      </Card>
      </div>
    );
  }
}

export default Pet;
