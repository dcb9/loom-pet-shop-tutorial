import React, { Component } from 'react';
import './App.css';
import Pets from './components/Pets.js'
import { Layout } from 'antd';
import 'antd/dist/antd.css';

const { Header, Footer, Content } = Layout;

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Header className="header">
            <h1>Welcome to Qtum Pet Shop Tutorial</h1>
          </Header>
          <Content>
            <Pets></Pets>
          </Content>
          <Footer className="footer">
            <p>GitHub <a href="https://github.com/dcb9/qtum-pet-shop-tutorial">qtum pet shop tutorial</a></p>
            <p>Maintainer <a href="https://github.com/dcb9">@dcb9</a></p>
          </Footer>
        </Layout>
      </div>
    );
  }
}

export default App;
