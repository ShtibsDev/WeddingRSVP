import InviteeContext from '@src/context/InviteeContext'
import { t } from 'i18next'
import React, { useContext, useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'

const SelectModal = () => {
  const { invitee, setInvitee } = useContext(InviteeContext)
  const [visibility, setVisibility] = useState(true)
  const gender = invitee.isMale ? 'm' : 'f'
  const options = [
    { value: 1, text: t(`${gender}.options.arriving`) },
    { value: 2, text: t(`${gender}.options.stayingTheNight`) },
    { value: 3, text: t(`${gender}.options.notSure`) },
    { value: 4, text: t(`${gender}.options.notComing`) },
  ]

  return (
    <Modal show={visibility}>
      <Row>
        <Col className='d-flex justify-content-center'>
          <Button className='rounded-circle'>מגיע ונשאר ללילה</Button>
        </Col>
        <Col className='d-flex justify-content-center'>
          <Button className='rounded-circle'>מגיע</Button>
        </Col>
      </Row>
      <Row>
        <Col className='d-flex justify-content-center'>
          <Button className='rounded-circle'>עוד לא יודע</Button>
        </Col>
        <Col className='d-flex justify-content-center'>
          <Button className='rounded-circle'>לא מגיע</Button>
        </Col>
      </Row>
    </Modal>
  )
}

export default SelectModal
