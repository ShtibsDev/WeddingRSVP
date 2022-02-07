import React from "react"
import { useTranslation } from "react-i18next";
import Invitee from "../models/Invitee";
import { classNames } from "../utils";

export default function SingleForm(props: { className?: string, invitee: Invitee }) {
  const { t } = useTranslation()

  const classes = classNames({
    'form-select': true,
    'rtl': props.invitee.lang === 'he'
  })
  const gender = props.invitee.isMale ? 'm' : 'f'
  const options = [
    { value: 1, text: t(`${gender}.options.arriving`) },
    { value: 2, text: t(`${gender}.options.stayingTheNight`) },
    { value: 3, text: t(`${gender}.options.notSure`) },
    { value: 4, text: t(`${gender}.options.notComing`) }
  ]

  return (
    <div className={`single-form ${props.className} h-100`}>
      <form action="post" className="h-100 d-flex flex-column justify-content-evenly">
        <div>
          <div className="d-flex container align-items-center">
            <div className="col-2">
              <strong>{t('iAm')}: </strong>
            </div>
            <div className="col-9">
              <select name="opitons" defaultValue={0} className={classes} >
                <option value="0" disabled className="disabled">{t(`${gender}.pleaseChoose`)}</option>
                {options.map((o) => <option key={o.value} value={o.value}>{o.text}</option>)}
              </select>
            </div>
          </div>
          <div className="d-flex container align-items-center justify-content-center">
            <input type="checkbox" id="plusOne" className="form-check m-1" />
            <label htmlFor="plusOne" className="m-1" >{t(`${gender}.bringPlusOne`)}?</label>
          </div>
        </div>
        <div>
          <button type="submit" className="btn btn-outline-dark">{t('finish')}</button>
        </div>
      </form >
    </div >
  )
}