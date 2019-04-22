import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class PlayerInput extends Component {
  state = {
    userInputArray: [],
    userInput: '',
    inputValid: false,
  }

  handleChange = (value) => {
    const userInputArray = value.split(',')
    console.log(userInputArray)
    this.setState({
      userInputArray,
      userInput: value,
    })
    this.validateString(value)
  }

  validateString = (value) => {
    let inputValid = /^([CcDdEFfGgAaB]{1},)*[CcDdEFfGgAaB]$/.test(value)
    this.setState({inputValid})
  }

  render() {
    const {handleSubmit} = this.props
    return (
      <div className='player-input-wrapper'>
        {
          this.state.inputValid ? 
            <div><span className='valid-input'>√</span> Valid Input</div> 
            : <div><span className='invalid-input'>X</span> Invalid Input</div> 
        }
        <div className='player-input'>
          <textarea 
            onChange={(e) => this.handleChange(e.target.value)}
            value={this.state.userInput}
          />
          <button
            className='submit-playlist'
            disabled={!this.state.inputValid}
            onClick={() => handleSubmit(this.state.userInputArray)}
          >
            Submit
          </button>
        </div>
      </div>
    )
  }
}

PlayerInput.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}
