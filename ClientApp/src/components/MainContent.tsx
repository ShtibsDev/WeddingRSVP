import React from "react"
import { useTranslation } from "react-i18next";
import Invitee from "../models/Invitee";
import SingleForm from "./SingleForm";

export default function MainContent(props: { className?: string, invitee: Invitee, setInvitee: (invitee: Invitee) => void  }) {
  const { t } = useTranslation()

  return (
    <div className={`main-content ${props.className} h-100`}>
      <div className="h-100 d-flex flex-column">
        <h3 className="m-4">{t('hey')} {props.invitee.firstName} {props.invitee.lastName}</h3>
        <h5 className="m-3">{t('weddingGettingClose')}</h5>
        <h3 className="m-4">
          {t('onFriday')}
          <br />
          17/06/2022
        </h3>
        <a href="Invitation.pdf" className="">
          {t('invitationLink')}
        </a>
        <SingleForm invitee={props.invitee} className="col" setInvitee={props.setInvitee} />
      </div>
    </div>
  )
}