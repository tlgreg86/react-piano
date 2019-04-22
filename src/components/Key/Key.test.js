import React from 'react'
import { shallow } from 'enzyme'
import Key from './Key'


describe('Key', () => {
  const handleClick = jest.fn()
  
  const mockProps = {
    keyLabel: 'C',
    classNames: 'key C major',
    handleClick,
  }
  
  const makeWrapper = () => shallow(
    <Key {...mockProps} />
  )

  it('should render without crashing', () => {
    const wrapper = makeWrapper()
    expect(wrapper.exists()).toBe(true)
  });

  it('should render <div /> with correct className', () => {
    const wrapper = makeWrapper()
    expect(wrapper.hasClass("key C major")).toBe(true)
  });

  it('should render <p></p> with correct className and children', () => {
    const wrapper = makeWrapper()
    expect(wrapper.childAt(0).hasClass('key-label')).toBe(true)
    expect(wrapper.childAt(0).contains('C')).toBe(true)
  })

  it('should execute handleClick method when clicked on', () => {
    const wrapper = makeWrapper()
    expect(handleClick).toHaveBeenCalledTimes(0)
    wrapper.simulate('click')
    expect(handleClick).toHaveBeenCalledTimes(1)
  });
  
});
