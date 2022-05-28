import { useContext, useEffect, useState } from 'react'
import { Col, Modal, Row } from 'react-bootstrap'
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
  const [isSubmitter, setIsSubmitter] = useState(true)

  const canReset = new Date() < new Date('2022-06-10')
  const option = getOptions(invitee.allowNight, invitee.isMale ? 'm' : 'f').find((o) => o.value === invitee.response)

  const yesNo: YesNoOption[] = [
    { value: true, text: t('yes') },
    { value: false, text: t('no') },
  ]

  useEffect(() => setIsSubmitter(invitee.id === invitee.submittingInvitee?.id), [invitee])

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
        const ressult = await resetSubmition(invitee)
        setInvitee(ressult)
      } catch (error) {
        setDisplay(DisplayType.GeneralError)
      }
    }
  }

  return (
    <div>
      {!isSubmitter ? (
        <h4>
          {t(`${invitee.submittingInvitee?.isMale ? 'm' : 'f'}.submittedForYou`).format(
            `${invitee.submittingInvitee?.firstName} ${invitee.submittingInvitee?.lastName}`
          )}
        </h4>
      ) : (
        <h4>{t('yourSelection')}</h4>
      )}

      {canReset && <h4>{t('canReset')}</h4>}

      <button disabled={!canReset} onClick={() => setShowModal(true)} className='flower-button rotation'>
        {option?.text}
      </button>

      <Modal show={showModal} centered={true} className='confirmation-modal'>
        <h3 className='text-center'>{t(`${invitee.isMale ? 'm' : 'f'}.areYouSure`)}</h3>
        <Row>
          {yesNo.map((option, i) => (
            <Col key={i} className='centered col-6'>
              <FlowerButton onClick={() => handleYesNo(option)} option={option} rotate={false} />
            </Col>
          ))}
        </Row>
      </Modal>
    </div>
  )
}
