import React from 'react'
import { shallow } from 'enzyme'
import App from './App'


describe('App', () => {

  const makeWrapper = () => shallow(<App />)

  it('should render without crashing', () => {
    const wrapper = makeWrapper()
    expect(wrapper.exists()).toBe(true)
  })

  it('should update keysLogged in state when handleSubmit is executed', () => {
    const wrapper = makeWrapper()
    const instance = wrapper.instance()

    expect(wrapper.state('keysLogged')).toEqual([])
    instance.handleClick('A')
    expect(wrapper.state('keysLogged')).toEqual(['A'])
  });

  it('should update keysPlayed in state and execute the playPiano method', async () => {
    const wrapper = makeWrapper()
    const instance = wrapper.instance()

    expect(wrapper.state('keysPlayed')).toEqual([])
    jest.spyOn(instance, 'playPiano')
    await instance.handleSubmit(['A','B','C'])
    expect(wrapper.state('keysPlayed')).toEqual(['A', 'B', 'C'])
    expect(instance.playPiano).toHaveBeenCalledTimes(1)
  });

  it.skip('TODO: should update keys state when playPiano is executed');

})