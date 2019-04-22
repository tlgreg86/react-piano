import React, { Component } from 'react'
import Piano from './components/Piano/Piano'
import Logger from './components/Logger/Logger';
import PlayerInput from './components/PlayerInput/PlayerInput';

class App extends Component {
  state = {
    keys: [
      { keyLabel: 'C', type: 'major', isActive: false },
      { keyLabel: 'c', type: 'minor', isActive: false },
      { keyLabel: 'D', type: 'major', isActive: false },
      { keyLabel: 'd', type: 'minor', isActive: false },
      { keyLabel: 'E', type: 'major', isActive: false },
      { keyLabel: 'F', type: 'major', isActive: false },
      { keyLabel: 'f', type: 'minor', isActive: false },
      { keyLabel: 'G', type: 'major', isActive: false },
      { keyLabel: 'g', type: 'minor', isActive: false },
      { keyLabel: 'A', type: 'major', isActive: false },
      { keyLabel: 'a', type: 'minor', isActive: false },
      { keyLabel: 'B', type: 'major', isActive: false },
    ],
    keysLogged: [],
    keysPlayed: [],
  }
  
  handleClick = (keyName) => {
    const {keysLogged} = this.state
    keysLogged.push(keyName)
    this.setState({keysLogged})
  }

  handleSubmit = async (data) => {
    await this.setState({keysPlayed: data})
    this.playPiano()
  }

  changeKeyState = async (key, keyPlayed) => {
    Object.assign(key, { isActive: true })
    this.setState({keys: this.state.keys})
    await setTimeout(() => {
      Object.assign(key, { isActive: false })
      this.setState({ keys: this.state.keys })
    }, 1000)
    this.handleClick(keyPlayed)
  }

  playPiano = () => {
    let counter = 0
    const timer = setInterval(() => {
      if(counter >= this.state.keysPlayed.length) {
        clearInterval(timer)
      }
      this.state.keys.find(key =>
        key.keyLabel === this.state.keysPlayed[counter] && this.changeKeyState(key, this.state.keysPlayed[counter])
      )
      counter ++
    }, 1000)
  }

  render() {
    return (
      <div>
        <Piano keys={this.state.keys} handleClick={this.handleClick} />
        <Logger keysLogged={this.state.keysLogged} />
        <PlayerInput handleSubmit={this.handleSubmit}/>
      </div>
    )
  }

}

export default App
