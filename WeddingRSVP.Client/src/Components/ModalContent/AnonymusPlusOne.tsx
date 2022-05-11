import InviteeContext from '../../context/InviteeContext'
import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import FlowerButton from '../FlowerButton'
import FormContext from '../../context/FormContext'
import YesNoOption from '../../models/YesNoOption'

export default function AnonymusPlusOne() {
  const { t } = useTranslation()
  const { invitee, setInvitee } = useContext(InviteeContext)
  const { handleForm } = useContext(FormContext)
  const gender = invitee.isMale ? 'm' : 'f'

  const yesNo: YesNoOption[] = [
    { value: true, text: t('yes') },
    { value: false, text: t('no') },
  ]

  const [canSubmit, setCanSabmit] = useState(false)
  useEffect(() => {
    if (canSubmit) {
      handleForm()
    }
  }, [invitee, canSubmit])

  const handleSelect = (option: YesNoOption) => {
    setInvitee({ ...invitee, isBringsPlusOne: option.value })
    setCanSabmit(true)
  }

  return (
    <>
      <h3 className='text-center'>{t(`${gender}.bringPlusOne`)}</h3>
      {yesNo.map((option) => (
        <Col key={Number(option.value)} className='centered col-6'>
          <FlowerButton onClick={() => handleSelect(option)} option={option} rotate={false} />
        </Col>
      ))}
    </>
  )
}
