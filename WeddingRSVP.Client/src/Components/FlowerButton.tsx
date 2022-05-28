import Option from '../models/Option'
import { classNames, isMobile } from '../utils'
import YesNoOption from '../models/YesNoOption'
import { useEffect, useRef, useState } from 'react'

interface OptionsProps {
  option: Option | YesNoOption
  onClick: (option: Option | YesNoOption) => void
  rotate?: boolean
}

export default function FlowerButton({ option, onClick, rotate = false }: OptionsProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const [width, setWidth] = useState(ref.current?.clientWidth)

  useEffect(() => setWidth(ref.current?.clientWidth), [ref.current])

  const getFontSize = () => {
    const fontSize = width! / Math.max(...option.text.split(' ').map((s) => s.length))
    if (fontSize > 33) return '33px'
    if (fontSize < 24) return '24px'
    if (option.text.split(' ').length >= 3 && fontSize * 6 >= width!) return '27px'
    return `${fontSize}px`
  }

  const style = {
    fontSize: getFontSize(),
  }

  const classList = classNames({
    'flower-button': true,
    rotation: rotate,
  })

  const handleClick = () => onClick(option)

  return (
    <button ref={ref} onClick={handleClick} className={classList} style={style}>
      {option.text}
    </button>
  )
}
