import InviteeContext from '../context/InviteeContext'
import { t } from 'i18next'
import React, { useContext, useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'

const SelectModal = (props: { visibility: boolean, setVisibility: (visibility: boolean) => void }) => {
  const { invitee, setInvitee } = useContext(InviteeContext)
  const gender = invitee.isMale ? 'm' : 'f'
  const options = [
    { value: 1, text: t(`${gender}.options.arriving`) },
    { value: 2, text: t(`${gender}.options.stayingTheNight`) },
    // { value: 3, text: t(`${gender}.options.notSure`) },
    { value: 4, text: t(`${gender}.options.notComing`) },
  ]

  return (
    <Modal centered={true} show={props.visibility} onHide={() => props.setVisibility(false)}>
      <Row className='justify-content-around h-100 py-4'>
        {options.map(option => (
          <Col sm={6} className='d-flex justify-content-center'>
            <Button variant='dark' className='rounded-circle'>{option.text}</Button>
          </Col>
        ))}</Row>
    </Modal>
  )
}

export default SelectModal
