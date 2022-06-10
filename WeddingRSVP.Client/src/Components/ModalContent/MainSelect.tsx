import { useContext, useEffect, useState } from 'react'
import InviteeContext from '../../context/InviteeContext'
import Option from '../../models/Option'
import { getOptions } from '../../utils'
import { Col } from 'react-bootstrap'
import FlowerButton from '../FlowerButton'
import FormContext from '../../context/FormContext'

export default function MainSelect() {
  const { invitee, setInvitee } = useContext(InviteeContext)
  const { handleForm } = useContext(FormContext)
  const options = getOptions(invitee.allowNight, invitee.isMale ? 'm' : 'f')

  const [canSubmit, setCanSabmit] = useState(false)
  useEffect(() => {
    if (canSubmit) {
      handleForm()
    }
  }, [invitee, canSubmit])

  const handleSelect = (option: Option) => {
    setInvitee({ ...invitee, response: option.value })
    setCanSabmit(true)
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
