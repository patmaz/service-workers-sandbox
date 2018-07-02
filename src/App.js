import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  componentDidMount() {
    const messageChannel = new MessageChannel();
    messageChannel.port1.onmessage = event => {
      console.log('msg from SW', event.data);
    };
    navigator.serviceWorker.controller &&
      navigator.serviceWorker.controller.postMessage(
        {
          data: 1000,
          func: `
          let count = 0;
          while (count < this.data) {
          console.log('heavy func in SW');
          count++
          }
        `,
        },
        [messageChannel.port2],
      );

    fetch('https://api.punkapi.com/v2/beers')
      .then(res => res.json())
      .then(data => console.log(data))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
