import {
  Client, LocalAddress, CryptoUtils, LoomProvider
} from 'loom-js'

import Web3 from 'web3'
import Adoption from './contracts/Adoption.json'

export default class Contract {
  async loadContract() {
    this._createClient()
    this._createCurrentUserAddress()
    this._createWebInstance()
    await this._createContractInstance()
  }

  _createClient() {
    this.privateKey = CryptoUtils.generatePrivateKey()
    this.publicKey = CryptoUtils.publicKeyFromPrivateKey(this.privateKey)
    this.client = new Client(
      'default',
      'ws://127.0.0.1:46657/websocket',
      'ws://127.0.0.1:9999/queryws',
    )

    this.client.on('error', msg => {
      console.error('Error on connect to client', msg)
      console.warn('Please verify if loom command is running')
    })
  }

  _createCurrentUserAddress() {
    this.currentUserAddress = LocalAddress.fromPublicKey(this.publicKey).toString()
  }

  _createWebInstance() {
    this.web3 = new Web3(new LoomProvider(this.client, this.privateKey))
  }

  async _createContractInstance() {
    const networkId = await this._getCurrentNetwork();
    this.currentNetwork = Adoption.networks[networkId];

    if (!this.currentNetwork) {
      throw Error('Contract not deployed on DAppChain');
    }

    const ABI = Adoption.abi;
    this.adoptionInstance = new this.web3.eth.Contract(ABI, this.currentNetwork.address, {
      from: this.currentUserAddress
    })
  }

  async _getCurrentNetwork() {
    return await this.web3.eth.net.getId()
  }

  adopt(petId) {
    return this.adoptionInstance.methods.adopt(petId).send({
      from: this.currentUserAddress
    })
  }

  getAdopters() {
    return this.adoptionInstance.methods.getAdopters().call({
      from: this.currentUserAddress
    })
  }
}
