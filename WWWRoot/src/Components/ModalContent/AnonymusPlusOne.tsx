import InviteeContext from '@src/context/InviteeContext'
import Option from '@src/models/Option'
import React from 'react'
import { useContext } from 'react'
import { Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import FlowerButton from '../FlowerButton'

export default function AnonymusPlusOne() {
  const { t } = useTranslation()
  const { invitee, setInvitee } = useContext(InviteeContext)
  const gender = invitee.isMale ? 'm' : 'f'

  const yesNo: Option[] = [
    { value: true, text: t('yes') },
    { value: false, text: t('no') },
  ]

  const handleSelect = (option: Option) => {
    setInvitee({ ...invitee, isBringsPlusOne: !!option.value })
    document.querySelector('form')?.submit()
  }

  return (
    <>
      <h3>{t(`${gender}.bringPlusOne`)}</h3>
      {yesNo.map((option) => (
        <Col key={Number(option.value)} className='centered col-6'>
          <FlowerButton onClick={() => handleSelect(option)} option={option} rotate={false} />
        </Col>
      ))}
    </>
  )
}
