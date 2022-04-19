﻿import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import CustomHeader from './components/CustomHeader'
import { getPhoneNumber } from './utils'
import * as Api from './services/api'
import MainContent from './components/MainContent'
import TopFlowers from './Images/TopFlowers.png'
import ErrorPage from './components/Pages/ErrorPage'
import InviteeContext, { defaultInvitee } from './context/InviteeContext'
import ResultPage from './components/Pages/ResultPage'
import SelectModal from './components/SelectModal'

function App() {
  const { t, i18n } = useTranslation()

  const [invitee, setInvitee] = useState(defaultInvitee)
  const [hasError, setHasError] = useState(false)
  const [contentDislay, setContentDisplay] = useState(<MainContent goToResult={() => setContentDisplay(<ResultPage />)} />)
  const value = useMemo(() => ({ invitee, setInvitee }), [invitee])
  useEffect(() => { getInvitee() }, [])

  async function getInvitee() {
    let phoneNumber = ''
    try {
      phoneNumber = getPhoneNumber()
    } catch {
      setHasError(true)
      return
    }
    if (phoneNumber !== null) {
      const data = await Api.getInvitee(phoneNumber)
      if (data) setInvitee(data)
    }
  }

  useEffect(() => {
    i18n.changeLanguage(invitee.lang)
    const html = document.querySelector('html')
    if (html) {
      html.lang = invitee.lang
    }
    document.title = t('RSVPs')
  }, [invitee])

  return (
    <div className='App' dir={invitee.lang === 'he' ? 'rtl' : 'ltr'}>
      <InviteeContext.Provider value={value}>
        <header className='bg'/>
        {hasError ? <ErrorPage /> : <main>{contentDislay}</main>}
        <footer className='bg'/>
      </InviteeContext.Provider>
    </div>
  )
}

export default App
