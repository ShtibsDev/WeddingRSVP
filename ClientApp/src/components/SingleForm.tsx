import React, { FormEvent, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '../utils'
import * as Api from '../services/api'
import InviteeContext from '../context/InviteeContext'
import SelectModal from './SelectModal'
import Invitee from '@models/Invitee'

export default function SingleForm(props: { goToResult?: () => void; className?: string }) {
  const { t } = useTranslation()
  const { invitee, setInvitee } = useContext(InviteeContext)
  const [currentInvitee, setCurrentInvitee] = useState<Invitee | undefined>(invitee)
  const [disableCheck, setDisableCheck] = useState(false)
  const [showSubmit, setShowSubmit] = useState(false)
  const [modalVisibility, setModalVisibility] = useState(false)

  const gender = invitee.isMale ? 'm' : 'f'
  const classes = classNames({
    'form-select': true,
    rtl: invitee.lang === 'he',
  })
  const options = [
    { value: 1, text: t(`${gender}.options.arriving`) },
    { value: 4, text: t(`${gender}.options.notComing`) },
    { value: 2, text: t(`${gender}.options.stayingTheNight`) },
    { value: 3, text: t(`${gender}.options.notSure`) },
  ]

  async function handleModalCahnge(e: FormEvent) {
    if (invitee.isArriving !== undefined) {
      if (invitee.group?.length) {
        for (let i = 0; i < invitee.group.length; i++) {
          const guest = invitee.group[i]
          if (guest.isArriving === undefined) {
            setCurrentInvitee(guest)
            return
          }
        }
      }
      setCurrentInvitee(undefined)
      return
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    await Api.submitInvitee(invitee)
    if (props.goToResult) {
      props.goToResult()
    }
  }

  return (
    <div className={`single-form ${props.className} h-100`}>
      <form onSubmit={handleSubmit} className='h-100 d-flex flex-column justify-content-evenly'>
        <div>
          <button className='flower-button rotation' type='button' onClick={() => setModalVisibility(true)}>
            בחר
          </button>
        </div>
        <SelectModal invitee={currentInvitee} setInvitee={setInvitee} visibility={modalVisibility} setVisibility={setModalVisibility} />
      </form>
    </div>
  )
}
