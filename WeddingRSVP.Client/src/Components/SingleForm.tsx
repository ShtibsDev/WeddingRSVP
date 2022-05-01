import React, { FormEvent, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import * as Api from '../services/api'
import InviteeContext from '../context/InviteeContext'
import Invitee from '../models/Invitee'
import IProps from '../models/IProps'
import { Modal, Row } from 'react-bootstrap'
import { InviteeType, ResponseType } from '../models/Enums'
import MainSelect from './ModalContent/MainSelect'
import KnownPlusOne from './ModalContent/KnowPlusOne'
import AnonymusPlusOne from './ModalContent/AnonymusPlusOne'
import GroupSelect from './ModalContent/GroupSelect'
import FromContext from '../context/FormContext'
import { wait } from '../utils'

interface SingleFormProps extends IProps {
  goToResult?: () => void
}

export default function SingleForm({ goToResult, className }: SingleFormProps) {
  const { t } = useTranslation()
  const { invitee } = useContext(InviteeContext)
  const [currentInvitee, setCurrentInvitee] = useState<{ invitee: Invitee | Invitee[] | undefined; type: InviteeType }>({
    invitee,
    type: InviteeType.MainInvitee,
  })
  const [modalVisibility, setModalVisibility] = useState(false)
  const gender = invitee.isMale ? 'm' : 'f'

  const options = [
    { value: ResponseType.Coming, text: t(`${gender}.options.arriving`) },
    { value: ResponseType.StayingTheNight, text: t(`${gender}.options.stayingTheNight`) },
    { value: ResponseType.NotSure, text: t(`${gender}.options.notSure`) },
    { value: ResponseType.NotComing, text: t(`${gender}.options.notComing`) },
  ]

  const modalContent = () => {
    switch (currentInvitee.type) {
      case InviteeType.MainInvitee:
        return <MainSelect options={options} />
      case InviteeType.KnownPlusOne:
        return <KnownPlusOne options={options} />
      case InviteeType.GroupMember:
        return <GroupSelect options={options} />
      case InviteeType.AnonymusPlusOne:
        return <AnonymusPlusOne />
    }
  }

  async function handleSubmit() {
    setModalVisibility(false)

    await wait(250)

    if (invitee.isArriving !== undefined) {
      if (invitee.group?.length) {
        setCurrentInvitee(
          invitee.group.length === 1
            ? { invitee: invitee.group[0], type: InviteeType.KnownPlusOne }
            : { invitee: invitee.group, type: InviteeType.GroupMember }
        )
        setModalVisibility(true)
        return
      } else if (invitee.isBringsPlusOne === undefined) {
        setCurrentInvitee({ invitee: undefined, type: InviteeType.AnonymusPlusOne })
        setModalVisibility(true)
        return
      }

      await Api.submitInvitee(invitee)
      if (goToResult) {
        goToResult()
      }
    }
  }

  return (
    <div className={`single-form ${className} h-100`}>
      <form id='mainForm' onSubmit={(e) => e.preventDefault()} className='h-100 d-flex flex-column justify-content-evenly'>
        <div>
          <button className='flower-button rotation' type='button' onClick={() => setModalVisibility(true)}>
            בחר
          </button>
        </div>
        <Modal className={invitee?.lang === 'he' ? 'rtl' : ''} centered={true} show={modalVisibility} onHide={() => setModalVisibility(false)}>
          <FromContext.Provider value={{ handleForm: handleSubmit }}>
            <Row className='justify-content-around align-items-center h-100 py-4'>{modalContent()}</Row>
          </FromContext.Provider>
        </Modal>
      </form>
    </div>
  )
}
