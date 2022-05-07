import InviteeContext from '../../context/InviteeContext'
import { ResponseType } from '../../models/Enums'
import Invitee from '../../models/Invitee'
import Option from '../../models/Option'
import OptionsProps from '../../models/OptionsProps'
import { getEvaluatedInvitee, getOptions } from '../../utils'
import React from 'react'
import { useContext } from 'react'
import { Col } from 'react-bootstrap'
import FlowerButton from '../FlowerButton'
import FormContext from '../../context/FormContext'

export default function KnownPlusOne() {
  const { invitee, setInvitee } = useContext(InviteeContext)
  const { handleForm } = useContext(FormContext)

  const plusOne = (invitee.group as Invitee[])[0]

  const handleSelect = async (option: Option) => {
    setInvitee({
      ...invitee,
      isBringsPlusOne: option.value === ResponseType.Coming || option.value === ResponseType.StayingTheNight,
      group: [getEvaluatedInvitee(plusOne, option)],
    })
    await handleForm()
  }

  return (
    <>
      <h3 className='text-center'>{plusOne.firstName}?</h3>
      {getOptions(invitee.allowNight, plusOne.isMale ? 'm' : 'f').map((option) => (
        <Col key={Number(option.value)} className='centered col-6'>
          <FlowerButton onClick={() => handleSelect(option)} option={option} rotate={false} />
        </Col>
      ))}
    </>
  )
}
