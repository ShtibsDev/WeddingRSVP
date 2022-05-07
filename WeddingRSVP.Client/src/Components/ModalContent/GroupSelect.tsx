import React, { useContext, useEffect, useState } from 'react'
import OptionsProps from '../../models/OptionsProps'
import InviteeContext from '../../context/InviteeContext'
import Option from '../../models/Option'
import { useTranslation } from 'react-i18next'
import { Col, Form, FormSelect, Row } from 'react-bootstrap'
import FlowerButton from '../FlowerButton'
import Invitee from '../../models/Invitee'
import { getOptions } from '../../utils'
import FormContext from '../../context/FormContext'
import { ResponseType } from '../../models/Enums'
import YesNoOption from '../../models/YesNoOption'

export default function GroupSelect() {
  const { t } = useTranslation()
  const { invitee, setInvitee } = useContext(InviteeContext)
  const { handleForm } = useContext(FormContext)
  // const [members, setMembers] = useState(invitee.group as Invitee[])
  const [disableSubmit, setDisableSubmit] = useState(true)
  useEffect(() => {
    const disable = !!invitee.group?.some((m) => m.response === ResponseType.None)
    setDisableSubmit(disable)
  }, [invitee])

  const yesNo: YesNoOption[] = [
    { value: true, text: t('yes') },
    { value: false, text: t('no') },
  ]

  const groupNames = invitee.group
    ?.map((m) => m.firstName)
    .join(', ')
    .replace(/, ([^,]*)$/, ` ${t('and')}$1`)

  const handleYesNo = async (option: YesNoOption) => {
    if (option.value) {
      setInvitee({
        ...invitee,
        group: invitee.group?.map((m) => ({
          ...m,
          response: invitee.response,
        })),
      })
      await handleForm()
    } else setQuestion(invdividualMember)
  }

  const handleInvdividualMember = (id: string, response: ResponseType) => {
    setInvitee({ ...invitee, group: invitee.group?.map((m) => (m.id === id ? { ...m, response } : m)) })
  }

  const submitMembers = async () => {
    // setInvitee({ ...invitee, group: members })
    await handleForm()
  }

  const yesNoQuestion = (
    <>
      <h3 className='text-center'>{t('theyComeLikeYou').format(groupNames)}</h3>
      <h4 className='text-center'>{t('describeGroup')}</h4>

      {yesNo.map((option, i) => (
        <Col key={i} className='centered col-6'>
          <FlowerButton onClick={() => handleYesNo(option)} option={option} rotate={false} />
        </Col>
      ))}
    </>
  )

  const [question, setQuestion] = useState(yesNoQuestion)

  const invdividualMember = (
    <>
      {invitee.group?.map((member) => {
        console.log('members in component', invitee.group)
        return (
          <Row key={member.id} className='my-2 px-4'>
            <Col>
              {member.firstName} {member.lastName}
            </Col>
            <Col>
              <FormSelect onChange={(e) => handleInvdividualMember(member.id, +e.target.value)} value={member.response}>
                <option value={ResponseType.None} disabled>
                  בחר
                </option>
                {getOptions(invitee.allowNight, member.isMale ? 'm' : 'f').map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </FormSelect>
            </Col>
          </Row>
        )
      })}
      <button onClick={submitMembers} disabled={disableSubmit} className='flower-button' type='button'>
        אישור
      </button>
    </>
  )

  return question
}
