import { useTranslation } from "react-i18next";
import React, { useContext } from "react";
import InviteeContext from "../../context/InviteeContext";

export default function ResultPage() {
  const { t } = useTranslation()
  const { invitee } = useContext(InviteeContext)

  const msg = (() => {
    if (invitee.isArriving)
      return t("lookingToSeeYou")
    if (!invitee.isFinal)
      return t("canComeAgain")
    return t("FU")
  })()

  return (
    <div className="d-flex justify-content-center align-items-center">
      <h1>{msg}</h1>
    </div>
  )
}