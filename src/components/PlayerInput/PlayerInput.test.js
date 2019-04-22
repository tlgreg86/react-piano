import React from 'react'
import { shallow } from 'enzyme'
import PlayerInput from './PlayerInput'


describe('PlayerInput', () => {
  const handleSubmit = jest.fn()

  const mockProps = {
    handleSubmit,
  }

  const makeWrapper = () => shallow(
    <PlayerInput {...mockProps} />
  )

  it('should render without crashing', () => {
    const wrapper = makeWrapper()
    expect(wrapper.exists()).toBe(true)
  })

  it('should have initial state', () => {
    const wrapper = makeWrapper()
    expect(wrapper.state()).toEqual({
      userInputArray: [],
      userInput: '',
      inputValid: false
    })
  })

  it('should render wrapper <div /> with correct className', () => {
    const wrapper = makeWrapper()
    expect(wrapper.hasClass('player-input-wrapper')).toBe(true)
  })

  it('should render valid input element when inputValid is true or false in state', () => {
    const wrapper = makeWrapper()
    expect(wrapper.childAt(0).childAt(0).hasClass('invalid-input')).toBe(true)
    wrapper.setState({inputValid: true })
    expect(wrapper.childAt(0).childAt(0).hasClass('valid-input')).toBe(true)
  })
  
  it('should render player input form with text area and submit button', () => {
    const wrapper = makeWrapper()
    expect(wrapper.childAt(1).hasClass('player-input')).toBe(true)
    expect(wrapper.find('textarea').exists()).toBe(true)
    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('button').hasClass('submit-playlist')).toBe(true)
  });

  it('should update userInput in state when user types in textarea and validate the input', () => {
    const wrapper = makeWrapper()
    const event1 = {target: {value: 'A'}}
    const event2 = {target: {value: 'A,x'}}

    wrapper.find('textarea').simulate('change', event1)
    expect(wrapper.state()).toEqual({
      userInputArray: ['A'],
      userInput: 'A',
      inputValid: true,
    })
    wrapper.find('textarea').simulate('change', event2)
    expect(wrapper.state()).toEqual({
      userInputArray: ['A','x'],
      userInput: 'A,x',
      inputValid: false,
    })
  })

  it('should execute handleSubmit when button is clicked', () => {
    const wrapper = makeWrapper()
    wrapper.find('button').simulate('click')
    expect(handleSubmit).toHaveBeenCalledTimes(1)
  });

})