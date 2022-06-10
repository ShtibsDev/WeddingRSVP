import React, { FormEvent, useContext, useEffect, useState } from 'react'
import * as Api from '../services/api'
import InviteeContext from '../context/InviteeContext'
import IProps from '../models/IProps'
import { Modal, Row } from 'react-bootstrap'
import { DisplayType, InviteeType, ResponseType } from '../models/Enums'
import MainSelect from './ModalContent/MainSelect'
import KnownPlusOne from './ModalContent/KnowPlusOne'
import AnonymusPlusOne from './ModalContent/AnonymusPlusOne'
import GroupSelect from './ModalContent/GroupSelect'
import FromContext from '../context/FormContext'
import { wait } from '../utils'
import DisplayContext from '../context/DisplayContext'
import { useTranslation } from 'react-i18next'
import CountSelect from './ModalContent/CountSelect'

export default function SingleForm({ className }: IProps) {
  const { t } = useTranslation()
  const { invitee, setInvitee } = useContext(InviteeContext)
  const { setDisplay } = useContext(DisplayContext)
  const [currentInvitee, setCurrentInvitee] = useState<InviteeType>(InviteeType.MainInvitee)
  const [modalVisibility, setModalVisibility] = useState(false)
  const gender = invitee.isMale ? 'm' : 'f'

  const modalContent = () => {
    switch (currentInvitee) {
      case InviteeType.MainInvitee:
        return <MainSelect />
      case InviteeType.KnownPlusOne:
        return <KnownPlusOne />
      case InviteeType.GroupMembers:
        return <GroupSelect />
      case InviteeType.AnonymusPlusOne:
        return <AnonymusPlusOne />
      case InviteeType.CountGroup:
        return <CountSelect />
    }
  }

  async function handleForm() {
    setModalVisibility(false)

    await wait(250)

    if (invitee.response !== ResponseType.None) {
      if (invitee.response !== ResponseType.NotSure && invitee.response !== ResponseType.NotComing) {
        if (invitee.isSimpleCount) {
          if (!invitee.groupCount) {
            setCurrentInvitee(InviteeType.CountGroup)
            setModalVisibility(true)
            return
          }
        } else {
          if (invitee.group?.length) {
            if (invitee.group.some((m) => m.response === ResponseType.None)) {
              setCurrentInvitee(invitee.group.length === 1 ? InviteeType.KnownPlusOne : InviteeType.GroupMembers)
              setModalVisibility(true)
              return
            }
          } else if (invitee.isBringsPlusOne === null && !invitee.isPlusOne) {
            setCurrentInvitee(InviteeType.AnonymusPlusOne)
            setModalVisibility(true)
            return
          }
        }
      }

      try {
        await setDisplay(DisplayType.Loading)
        const submitedData = await Api.submitInvitee(invitee)
        setInvitee(submitedData)
        setDisplay(DisplayType.ResultPage)
      } catch (error) {
        console.warn(error)
        setDisplay(DisplayType.GeneralError)
      }
    }
  }

  return (
    <div className={`single-form ${className ?? ''}`}>
      <form id='mainForm' onSubmit={(e) => e.preventDefault()} className='h-100 d-flex flex-column justify-content-evenly'>
        <div>
          <button className='flower-button rotation' type='button' onClick={() => setModalVisibility(true)}>
            {t(`${gender}.select`)}
          </button>
        </div>
        <Modal className={invitee?.lang === 'he' ? 'rtl' : ''} centered={true} show={modalVisibility} onHide={() => setModalVisibility(false)}>
          <FromContext.Provider value={{ handleForm }}>
            <Row className='justify-content-around align-items-center py-4'>{modalContent()}</Row>
          </FromContext.Provider>
        </Modal>
      </form>
    </div>
  )
}
