import { useContext, useEffect, useState } from 'react'
import DisplayContext from '../../context/DisplayContext'
import InviteeContext from '../../context/InviteeContext'
import { DisplayType } from '../../models/Enums'
import { resetSubmition } from '../../services/api'
import { getOptions } from '../../utils'

export default function SelectedOption() {
  const { invitee, setInvitee } = useContext(InviteeContext)
  const { setDisplay } = useContext(DisplayContext)
  const [wasReset, setWasReset] = useState(false)
  const option = getOptions(invitee.allowNight, invitee.isMale ? 'm' : 'f').find(o => o.value === invitee.response)

  useEffect(() => {
    if (wasReset) {
      setDisplay(DisplayType.MainDisplay)
    }
  }, [invitee, wasReset])

  const handleReset = async () => {
    try {
      setWasReset(true)
      setDisplay(DisplayType.Loading)
      const ressult = await resetSubmition(invitee)
      setInvitee(ressult)
    } catch (error) {
      setDisplay(DisplayType.GeneralError)
    }
  }

  return (
    <div>
      <h4>מה שבחרת</h4>
      <button onClick={handleReset} className="flower-button rotation">
        {option?.text}
      </button>
    </div>
  )

}