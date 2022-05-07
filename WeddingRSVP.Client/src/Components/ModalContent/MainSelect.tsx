import React, { useContext } from 'react'
import InviteeContext from '../../context/InviteeContext'
import Option from '../../models/Option'
import OptionsProps from '../../models/OptionsProps'
import { getEvaluatedInvitee, getOptions } from '../../utils'
import { Col } from 'react-bootstrap'
import FlowerButton from '../FlowerButton'
import FormContext from '../../context/FormContext'

export default function MainSelect() {
  const { invitee, setInvitee } = useContext(InviteeContext)
  const { handleForm } = useContext(FormContext)
  const options = getOptions(invitee.allowNight, invitee.isMale ? 'm' : 'f')

  const handleSelect = async (option: Option) => {
    setInvitee({ ...invitee, response: option.value })
    await handleForm()
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
