import React, { Component } from 'react'
import Piano from './components/Piano/Piano'
import Logger from './components/Logger/Logger';

class App extends Component {
constructor(props) {
  super(props)
  this.state = {
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
  }
}
  
  handleClick = (keyName) => {
    const {keysLogged} = this.state
    keysLogged.push(keyName)
    this.setState({keysLogged})
  }

  render() {
    return (
      <div>
        <Piano keys={this.state.keys} handleClick={this.handleClick} />
        <Logger keysLogged={this.state.keysLogged} />
      </div>
    )
  }

}

export default App
