import React, { FormEvent, useContext, useState } from "react"
import { useTranslation } from "react-i18next";
import { classNames } from "../utils";
import * as Api from '../services/api'
import InviteeContext from "../context/InviteeContext";

export default function SingleForm(props: { className?: string }) {
  const { t } = useTranslation()
  const { invitee, setInvitee } = useContext(InviteeContext)
  const [disableCheck, setDisableCheck] = useState(false)
  const [showSubmit, setShowSubmit] = useState(false)

  const classes = classNames({
    'form-select': true,
    'rtl': invitee.lang === 'he'
  })
  const gender = invitee.isMale ? 'm' : 'f'
  const options = [
    { value: 1, text: t(`${gender}.options.arriving`) },
    { value: 2, text: t(`${gender}.options.stayingTheNight`) },
    { value: 3, text: t(`${gender}.options.notSure`) },
    { value: 4, text: t(`${gender}.options.notComing`) }
  ]

  function handleAnswer(e: FormEvent<HTMLSelectElement>) {
    setShowSubmit(true)

    switch (e.currentTarget.value) {
      case "1":
        setInvitee({ ...invitee, isArriving: true, isStayingForNight: false, isFinal: true })
        setDisableCheck(false)
        return
      case "2":
        setInvitee({ ...invitee, isArriving: true, isStayingForNight: true, isFinal: true })
        setDisableCheck(false)
        return
      case "3":
        setDisableCheck(false)
        return
      case "4":
        setInvitee({ ...invitee, isArriving: false, isStayingForNight: false, isFinal: true })
        setDisableCheck(true)
        return
    }
  }

  function handleCheck(e: FormEvent<HTMLInputElement>) {
    setInvitee({ ...invitee, isBringsPlusOne: e.currentTarget.checked })
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    await Api.submitInvitee(invitee)
  }

  return (
    <div className={`single-form ${props.className} h-100`}>
      <form onSubmit={handleSubmit} className="h-100 d-flex flex-column justify-content-evenly">
        <div>
          <div className="d-flex container align-items-center">
            <div className="col-2">
              <strong>{t('iAm')}: </strong>
            </div>
            <div className="col-9">
              <select name="opitons" onInput={handleAnswer} defaultValue={0} className={classes} required>
                <option value="0" disabled className="disabled">{t(`${gender}.pleaseChoose`)}</option>
                {options.map((o) => <option key={o.value} value={o.value}>{o.text}</option>)}
              </select>
            </div>
          </div>
          <div className="d-flex container align-items-center justify-content-center">
            <input type="checkbox" onInput={handleCheck} disabled={disableCheck} id="plusOne" className="form-check m-1" />
            <label htmlFor="plusOne" className="m-1" >{t(`${gender}.bringPlusOne`)}?</label>
          </div>
        </div>
        <div style={{ height: 40 }}>
          {showSubmit && <button type="submit" className="btn btn-outline-dark submit-btn">{t('finish')}</button>}
        </div>
      </form >
    </div >
  )
}