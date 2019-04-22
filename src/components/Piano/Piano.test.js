import React from 'react'
import { shallow } from 'enzyme'
import Piano from './Piano'


describe('Piano', () => {
  const handleClick = jest.fn()

  const mockProps = {
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
    handleClick,
  }

  const makeWrapper = () => shallow(
    <Piano {...mockProps} />
  )

  it('should render without crashing', () => {
    const wrapper = makeWrapper()
    expect(wrapper.exists()).toBe(true)
  })

  it('should render piano wrapper <div /> with correct className', () => {
    const wrapper = makeWrapper()
    expect(wrapper.hasClass('piano-wrapper')).toBe(true)
  })

  it('should render piano container <div /> with correct className', () => {
    const wrapper = makeWrapper()
    expect(wrapper.childAt(0).hasClass('piano-container')).toBe(true)
  })

  it('should render, based on length of keys array, the correct number of keys', () => {
    const wrapper = makeWrapper()
    expect(wrapper.childAt(0).children().length).toEqual(mockProps.keys.length)
  })
})