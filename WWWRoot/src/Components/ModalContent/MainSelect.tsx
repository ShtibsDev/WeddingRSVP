import React, { useContext } from 'react'
import InviteeContext from '@src/context/InviteeContext'
import Option from '@src/models/Option'
import OptionsProps from '@src/models/OptionsProps'
import { getEvaluatedInvitee } from '@src/utils'
import { Col } from 'react-bootstrap'
import FlowerButton from '../FlowerButton'

export default function MainSelect({ options }: OptionsProps) {
  const { invitee, setInvitee } = useContext(InviteeContext)

  const handleSelect = (option: Option) => {
    setInvitee(getEvaluatedInvitee(invitee, option))
    document.querySelector('form')?.submit()
  }

  return (
    <>
      {options.map((option) => (
        <Col key={Number(option.value)} className='centered col-6'>
          <FlowerButton onClick={() => handleSelect(option)} option={option} rotate={false} />
        </Col>
      ))}
    </>
  )
}
