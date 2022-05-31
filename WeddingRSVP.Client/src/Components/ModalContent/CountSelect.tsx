import React, { useContext, useEffect, useState } from 'react'
import { FormSelect } from 'react-bootstrap'
import FormContext from '../../context/FormContext'
import InviteeContext from '../../context/InviteeContext'


export default function CountSelect() {
  const { invitee, setInvitee } = useContext(InviteeContext)
  const { handleForm } = useContext(FormContext)
  const [canSubmit, setCanSubmit] = useState(false)

  useEffect(() => {
    if (canSubmit)
      handleForm()
  }, [invitee, canSubmit])

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInvitee({ ...invitee, groupCount: +e.target.value })
  }

  return (
    <div className='count-modal'>
      <h3>כמה תגיעו?</h3>

      <FormSelect onChange={onChange} value={invitee.groupCount}>
        <option value={0} disabled>
          בחר
        </option>
        {[...Array(5)].map((_, i) => <option key={i} value={i + 1}>{i + 1}</option>)}
      </FormSelect>

      <button disabled={invitee.groupCount === 0} onClick={() => setCanSubmit(true)} className="flower-button">אישור</button>
    </div>
  )
}