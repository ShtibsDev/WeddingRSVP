import { useContext, useEffect, useState } from 'react'
import { Col, Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import DisplayContext from '../../context/DisplayContext'
import InviteeContext from '../../context/InviteeContext'
import { DisplayType } from '../../models/Enums'
import YesNoOption from '../../models/YesNoOption'
import { resetSubmition } from '../../services/api'
import { getOptions } from '../../utils'
import FlowerButton from '../FlowerButton'

export default function SelectedOption() {
  const { t } = useTranslation()
  const { invitee, setInvitee } = useContext(InviteeContext)
  const { setDisplay } = useContext(DisplayContext)
  const [wasReset, setWasReset] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const option = getOptions(invitee.allowNight, invitee.isMale ? 'm' : 'f').find((o) => o.value === invitee.response)

  const yesNo: YesNoOption[] = [
    { value: true, text: t('yes') },
    { value: false, text: t('no') },
  ]

  useEffect(() => {
    if (wasReset) {
      setDisplay(DisplayType.MainDisplay)
    }
  }, [invitee, wasReset])

  const handleYesNo = async (option: YesNoOption) => {
    setShowModal(false)
    if (option.value) {
      try {
        setWasReset(true)
        setDisplay(DisplayType.Loading)
        const ressult = await resetnpmubmition(invitee)
        setInvitee(ressult)
      } catch (error) {
        setDisplay(DisplayType.GeneralError)
      }
    }
  }

  return (
    <div>
      <h4>מה שבחרת</h4>
      <button onClick={() => setShowModal(true)} className='flower-button rotation'>
        {option?.text}
      </button>

      <Modal show={showModal}>
        <h3 className='text-center'>אתה בטוח?</h3>

        {yesNo.map((option, i) => (
          <Col key={i} className='centered col-6'>
            <FlowerButton onClick={() => handleYesNo(option)} option={option} rotate={false} />
          </Col>
        ))}
      </Modal>
    </div>
  )
}
