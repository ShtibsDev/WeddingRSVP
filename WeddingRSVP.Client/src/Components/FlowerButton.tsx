import Option from '../models/Option'
import { classNames, isMobile } from '../utils'
import React from 'react'
import YesNoOption from '../models/YesNoOption'

interface OptionsProps {
  option: Option | YesNoOption
  onClick: (option: Option | YesNoOption) => void
  rotate?: boolean
}

export default function FlowerButton({ option, onClick, rotate = false }: OptionsProps) {
  const style = {
    fontSize: option.text.split(' ').length < 3 ? 'larger' : isMobile ? '22pt' : '25pt',
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
