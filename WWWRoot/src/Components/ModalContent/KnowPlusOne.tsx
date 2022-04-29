import InviteeContext from '@src/context/InviteeContext'
import { ResponseType } from '@src/models/Enums'
import Invitee from '@src/models/Invitee'
import IProps from '@src/models/IProps'
import Option from '@src/models/Option'
import OptionsProps from '@src/models/OptionsProps'
import { getEvaluatedInvitee } from '@src/utils'
import React from 'react'
import { useContext } from 'react'
import { Col } from 'react-bootstrap'
import FlowerButton from '../FlowerButton'

export default function KnownPlusOne({ options }: OptionsProps) {
  const { invitee, setInvitee } = useContext(InviteeContext)
  const plusOne = (invitee.group as Invitee[])[0]

  const handleSelect = (option: Option) => {
    setInvitee({
      ...invitee,
      isBringsPlusOne: option.value === ResponseType.Coming || option.value === ResponseType.StayingTheNight,
      group: [getEvaluatedInvitee(plusOne, option)],
    })
    document.querySelector('form')?.submit()
  }

  return (
    <>
      <h3>{plusOne.firstName}?</h3>
      {options.map((option) => (
        <Col key={Number(option.value)} className='centered col-6'>
          <FlowerButton onClick={() => handleSelect(option)} option={option} rotate={false} />
        </Col>
      ))}
    </>
  )
}
