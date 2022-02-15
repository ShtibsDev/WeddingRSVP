import React from "react";
import { useTranslation } from "react-i18next";

export default function ErrorPage(props: { className?: string }) {
  const { t } = useTranslation()
  const isRtl = document.querySelector<HTMLDivElement>('.App')?.dir === "rtl"

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="d-flex flex-column" style={{ width: "fit-content" }}>
        <h1>{t('errorMessage')}</h1>
        <h2 style={{ fontStyle: "italic", textAlign: isRtl ? 'left' : 'right' }}>{t('contactDeveloper')}</h2>
      </div>
    </div>
  )
}