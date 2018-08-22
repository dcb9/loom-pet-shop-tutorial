import React, { Component } from 'react';
import Pet from './Pet.js';
import './Pets.css';
import Contract from '../contract'

const pets = require('../pets.json')

class Pets extends Component {

  constructor(props) {
    super(props)
    this.contract = new Contract()
    this.state = {
      adopters: {},
    }
  }

  async componentWillMount() {
    await this.contract.loadContract()
    this.startFetchAdopters()
  }

  componentWillUnmount() {
    this.stopFetchAdopters()
  }

  isFetchingAdopters = false

  async startFetchAdopters() {
    this.isFetchingAdopters = true

    while (this.isFetchingAdopters) {
      await this.fetchAdopters()
      await sleep(5000)
    }
  }

  stopFetchAdopters() {
    this.isFetchingAdopters = false
  }

  async fetchAdopters() {
    const adopters = await this.contract.getAdopters()
    this.setState({ adopters })
  }

  async handleAdopter(petId) {
    const tx = await this.contract.adopt(petId)
    await this.fetchAdopters()
    return tx
  }

  render() {
    const petsElements = []
    pets.map((pet) => {
      return petsElements.push(<Pet
        key={pet.id}
        pet={pet}
        adopters={this.state.adopters}
        handleAdopter={(petId) => this.handleAdopter(petId)}></Pet>)
    })
    return (
      <div className="container">
        {petsElements}
      </div>
    );
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default Pets;
