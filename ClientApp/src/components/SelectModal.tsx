import { t } from 'i18next'
import React, { useContext, useState } from 'react'
import { Col, Modal, Row } from 'react-bootstrap'
import FlowerButton from './FlowerButton'
import Option from '@src/models/Option'
import Invitee from '@src/models/Invitee'

interface ModalProps {
  invitee?: Invitee
  setInvitee: (invitee: Invitee) => void
  visibility: boolean
  setVisibility: (visibility: boolean) => void
}

const SelectModal = ({ invitee, setInvitee, visibility, setVisibility }: ModalProps) => {
  const gender = invitee?.isMale ? 'm' : 'f'
  const options = [
    { value: 1, text: t(`${gender}.options.arriving`) },
    { value: 4, text: t(`${gender}.options.notComing`) },
    { value: 2, text: t(`${gender}.options.stayingTheNight`) },
    { value: 3, text: t(`${gender}.options.notSure`) },
  ]

  const setOption = (option: Option) => {
    setVisibility(false)

    if (invitee) {
      switch (option.value) {
        case 1:
          setInvitee({
            ...invitee,
            isArriving: true,
            isStayingForNight: false,
            isFinal: true,
          })
          // setDisableCheck(false)
          return
        case 2:
          setInvitee({
            ...invitee,
            isArriving: true,
            isStayingForNight: true,
            isFinal: true,
          })
          // setDisableCheck(false)
          return
        case 3:
          // setDisableCheck(false)
          return
        case 4:
          setInvitee({
            ...invitee,
            isArriving: false,
            isStayingForNight: false,
            isFinal: true,
          })
          // setDisableCheck(true)
          return
      }
    }
  }

  return (
    <Modal className={invitee?.lang === 'he' ? 'rtl' : ''} centered={true} show={visibility} onHide={() => setVisibility(false)}>
      <Row className='justify-content-around h-100 py-4'>
        {options.map((option) => (
          <Col key={option.value} className='d-flex justify-content-center align-items-center col-6'>
            <FlowerButton setArrivalOption={setOption} option={option} rotate={false} />
          </Col>
        ))}
      </Row>
    </Modal>
  )
}

export default SelectModal
