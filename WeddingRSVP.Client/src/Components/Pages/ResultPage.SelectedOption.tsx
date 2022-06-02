import { useContext, useEffect, useRef, useState } from 'react'
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

  const ref = useRef<HTMLButtonElement>(null)
  const [width, setWidth] = useState(ref.current?.clientWidth)

  useEffect(() => setWidth(ref.current?.clientWidth), [ref.current])

  const canReset = new Date() < new Date('2022-06-10')
  const option = getOptions(invitee.allowNight, invitee.isMale ? 'm' : 'f').find((o) => o.value === invitee.response)

  const getFontSize = () => {
    const fontSize = width! / Math.max(...option!.text.split(' ').map((s) => s.length))
    if (fontSize > 32) return '32px'
    if (fontSize < 18) return '18px'
    if (option!.text.split(' ').length >= 3 && fontSize * 6 >= width!) return '20px'
    return `${fontSize}px`
  }

  const style = {
    fontSize: getFontSize(),
  }

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
        await setDisplay(DisplayType.Loading)
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

      <button ref={ref} style={style} disabled={!canReset} onClick={() => setShowModal(true)} className='flower-button rotation m-0'>
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
