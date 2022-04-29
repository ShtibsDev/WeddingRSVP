import React, { useContext } from 'react'
import OptionsProps from '@src/models/OptionsProps'
import InviteeContext from '@src/context/InviteeContext'
import { useTranslation } from 'react-i18next'

export default function GroupSelect({ options }: OptionsProps) {
  const { t } = useTranslation()
  const { invitee, setInvitee } = useContext(InviteeContext)
  const groupNames = invitee.group
    ?.map((g) => g.firstName)
    .join(', ')
    .replace(/, ([^,]*)$/, ` ${t('and')}$1`)

  return (
    <>
      <h3>
        {t('does')} {groupNames} {t('areComing')}?
      </h3>
    </>
  )
}
