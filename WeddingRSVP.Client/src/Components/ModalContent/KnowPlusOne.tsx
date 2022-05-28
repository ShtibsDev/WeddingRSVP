import InviteeContext from '../../context/InviteeContext'
import { ResponseType } from '../../models/Enums'
import Invitee from '../../models/Invitee'
import Option from '../../models/Option'
import { getEvaluatedInvitee, getOptions } from '../../utils'
import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Col } from 'react-bootstrap'
import FlowerButton from '../FlowerButton'
import FormContext from '../../context/FormContext'
import { useTranslation } from 'react-i18next'

export default function KnownPlusOne() {
  const { t } = useTranslation()
  const { invitee, setInvitee } = useContext(InviteeContext)
  const { handleForm } = useContext(FormContext)

  const plusOne = (invitee.group as Invitee[])[0]

  const [canSubmit, setCanSabmit] = useState(false)
  useEffect(() => {
    if (canSubmit) {
      handleForm()
    }
  }, [invitee, canSubmit])

  const handleSelect = (option: Option) => {
    setInvitee({
      ...invitee,
      isBringsPlusOne: option.value === ResponseType.Coming || option.value === ResponseType.StayingTheNight,
      group: [{ ...plusOne, response: option.value }],
    })
    setCanSabmit(true)
  }

  return (
    <>
      <h3 className='text-center'>{t('whatAboutPlusOne').format(plusOne.firstName)}</h3>
      {getOptions(invitee.allowNight, plusOne.isMale ? 'm' : 'f').map((option) => (
        <Col key={Number(option.value)} className='centered col-6'>
          <FlowerButton onClick={() => handleSelect(option)} option={option} rotate={false} />
        </Col>
      ))}
    </>
  )
}
