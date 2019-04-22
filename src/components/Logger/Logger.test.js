import React from 'react'
import { shallow } from 'enzyme'
import Logger from './Logger'


describe('Logger', () => {
  const mockProps = {
    keysLogged: ['A','B','C']
  }

  const makeWrapper = () => shallow(
    <Logger {...mockProps} />
  )

  it('should render without crashing', () => {
    const wrapper = makeWrapper()
    expect(wrapper.exists()).toBe(true)
  })

  it('should render a <div /> with the correct className', () => {
    const wrapper = makeWrapper()
    expect(wrapper.hasClass('logger')).toBe(true)
  })

  it('should render, based on keysLogged, the correct number of children', () => {
    const wrapper = makeWrapper()
    expect(wrapper.children().length).toBe(3)
  })

  it('should render children with correct values', () => {
    const wrapper = makeWrapper()
    expect(wrapper.childAt(0).contains('A')).toBe(true)
    expect(wrapper.childAt(1).contains('B')).toBe(true)
    expect(wrapper.childAt(2).contains('C')).toBe(true)
  })

  it('should render children with correct keys', () => {
    const wrapper = makeWrapper()
    expect(wrapper.childAt(0).key()).toEqual('A-0')
    expect(wrapper.childAt(1).key()).toEqual('B-1')
    expect(wrapper.childAt(2).key()).toEqual('C-2')
  })
})