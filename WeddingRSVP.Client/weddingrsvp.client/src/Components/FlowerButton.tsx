import Option from '@src/models/Option'
import { classNames } from '../utils'
import React from 'react'

interface OptionsProps {
  option: Option
  onClick: (option: Option) => void
  rotate?: boolean
}

export default function FlowerButton({ option, onClick, rotate = false }: OptionsProps) {
  const style = {
    fontSize: option.text.split(' ').length < 3 ? 'larger' : '25pt',
  }

  const classList = classNames({
    'flower-button': true,
    rotation: rotate,
  })

  const handleClick = () => onClick(option)

  return (
    <button onClick={handleClick} className={classList} style={style}>
      {option.text}
    </button>
  )
}
