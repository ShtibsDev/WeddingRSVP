import React, { useContext, useState } from 'react'
import { FormSelect } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import InviteeContext from '../context/InviteeContext'
import { ResponseType } from '../models/Enums'
import Invitee from '../models/Invitee'
import IProps from '../models/IProps'
import { getOptions } from '../utils'


interface MemberSelectProps extends IProps {
  memberId: string,
}

export default function MemberSelect({ memberId }: MemberSelectProps) {
  const { t } = useTranslation()
  const { invitee, setInvitee } = useContext(InviteeContext)
  const [member, setMember] = useState((invitee.group as Invitee[]).find(m => m.id === memberId) as Invitee)
  const gender = invitee.isMale ? 'm' : 'f'


  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const response = +e.target.value
    setMember({ ...member, response })
    setInvitee({ ...invitee, group: invitee.group?.map((m) => (m.id === member.id ? { ...m, response } : m)) })
  }

  return (
    <FormSelect onChange={handleChange} value={member.response}>

      <option value={ResponseType.None} disabled>
        {t(`${gender}.selectDefault`)}
      </option>
      {getOptions(invitee.allowNight, member.isMale ? 'm' : 'f').map((option) => (
        <option key={option.value} value={option.value}>
          {option.text}
        </option>
      ))}
    </FormSelect>
  )
}