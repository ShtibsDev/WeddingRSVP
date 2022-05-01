import React, { useContext, useState } from 'react'
import OptionsProps from '../../models/OptionsProps'
import InviteeContext from '../../context/InviteeContext'
import Option from '../../models/Option'
import { useTranslation } from 'react-i18next'
import { Col, FormSelect, Row } from 'react-bootstrap'
import FlowerButton from '../FlowerButton'
import Invitee from '../../models/Invitee'
import { getEvaluatedInvitee } from '../../utils'
import FormContext from '../../context/FormContext'

export default function GroupSelect({ options }: OptionsProps) {
  const { t } = useTranslation()
  const { invitee, setInvitee } = useContext(InviteeContext)
  const { handleForm } = useContext(FormContext)

  const [members, setMembers] = useState(invitee.group as Invitee[])
  const [allowSubmit, setAllowSubmit] = useState(false)
  const yesNo: Option[] = [
    { value: true, text: t('yes') },
    { value: false, text: t('no') },
  ]

  const groupNames = members.map((m) => m.firstName).join(', ').replace(/, ([^,]*)$/, ` ${t('and')}$1`)

  const yesNoQuestion = (
    <>
      <h3>
        {t('does')} {groupNames} {t('areComing')}?
      </h3>

      {yesNo.map((option) => (
        <Col key={Number(option.value)} className='centered col-6'>
          <FlowerButton onClick={() => handleYesNo(option)} option={option} rotate={false} />
        </Col>
      ))}
    </>
  )

  const invdividualMember = (
    <>
      {members.map((member) => (
        <>
          <Row>
            <Col>
              {member.firstName} {member.lastName}
            </Col>
            <Col>
              <FormSelect>
                <option value={undefined}>בחר</option>
                {options.map((option) => (
                  <option onSelect={() => handleInvdividualMember(member._id, option)} key={+option.value} value={+option.value}>
                    {option.text}
                  </option>
                ))}
              </FormSelect>
            </Col>
          </Row>
          <button onClick={submitMembers} disabled={allowSubmit} className='flower-button' type='button'>
            אישור
          </button>
        </>
      ))}
    </>
  )

  const [question, setQuestion] = useState(yesNoQuestion)

  const handleYesNo = async (option: Option) => {
    if (option.value) {
      setInvitee({
        ...invitee,
        group: members.map((m) => ({
          ...m,
          isArriving: invitee.isArriving,
          isStayingForNight: invitee.isStayingForNight,
        })),
      })
      await handleForm()
    } else setQuestion(invdividualMember)
  }

  const handleInvdividualMember = (id: string, option: Option) => {
    setMembers(members.map((m) => (m._id === id ? getEvaluatedInvitee(m, option) : m)))
    if (members.every((m) => m.isArriving !== undefined && m.isArriving !== null)) {
      setAllowSubmit(true)
    }
  }

  const submitMembers = async () => {
    setInvitee({ ...invitee, group: members })
    await handleForm()
  }

  return question
}
