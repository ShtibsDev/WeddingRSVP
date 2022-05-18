import { useContext } from 'react'
import InviteeContext from '../../context/InviteeContext'

export default function SelectedOption(){
  const {invitee} = useContext(InviteeContext)

  return(
    <div>
      <h4>מה שבחרת</h4>
      

    </div>
  )

}