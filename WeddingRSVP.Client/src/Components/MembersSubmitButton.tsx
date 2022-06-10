import { useContext, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import InviteeContext from '../context/InviteeContext'
import { ResponseType } from '../models/Enums'
import IProps from '../models/IProps'

interface MembersSubmitButtonProps extends IProps {
  onClick: () => void
}

export default function MembersSubmitButton({ onClick }: MembersSubmitButtonProps) {
  const { t } = useTranslation()
  const { invitee } = useContext(InviteeContext)
  const [disableSubmit, setDisableSubmit] = useState(true)
  useEffect(() => {
    const disable = !!invitee.group?.some((m) => m.response === ResponseType.None)
    setDisableSubmit(disable)
  }, [invitee])

  return (
    <button onClick={onClick} disabled={disableSubmit} className='flower-button' type='button'>
      {t('ok')}
    </button>
  )
}
