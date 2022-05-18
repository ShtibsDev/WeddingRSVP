import { useContext } from 'react'
import InviteeContext from '../../context/InviteeContext'
import { getOptions } from '../../utils'

export default function SelectedOption() {
  const { invitee } = useContext(InviteeContext)

  const option = getOptions(invitee.allowNight, invitee.isMale ? 'm' : 'f').find(o => o.value === invitee.response)

  return (
    <div>
      <h4>מה שבחרת</h4>
      <button className="flower-button rotating">
        {option?.text}
      </button>

    </div>
  )

}