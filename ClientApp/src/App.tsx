import React, { createContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import CustomHeader from './components/CustomHeader'
import Invitee from './models/Invitee'
import { getPhoneNumber } from './utils'
import * as Api from './services/api'
import MainContent from './components/MainContent'
import SaveTheDate from './Images/SaveTheDate.jpeg'
import ErrorPage from './components/Pages/ErrorPage'
import InviteeContext, { defaultInvitee } from './context/InviteeContext'
import ResultPage from './components/Pages/ResultPage'


function App() {
  const { t, i18n } = useTranslation()

  const [invitee, setInvitee] = useState(defaultInvitee)
  const [hasError, setHasError] = useState(false)
  const [contentDislay, setContentDisplay] = useState(<MainContent goToResult={goToResult}/>)
  const value = useMemo(() => ({ invitee, setInvitee }), [invitee])

  function goToResult() {
    setContentDisplay(<ResultPage/>)
  }

  useEffect(() => { getInvitee() }, [])

  async function getInvitee() {
    let phoneNumber = ''
    try {
      phoneNumber = getPhoneNumber()
    }
    catch {
      setHasError(true)
      return
    }
    if (phoneNumber !== null) {
      const data = await Api.getInvitee(phoneNumber)
      if (data)
        setInvitee(data)
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
    <div className="App" dir={invitee.lang === 'he' ? 'rtl' : 'ltr'}>
      <InviteeContext.Provider value={value}>
        <header>
          <CustomHeader />
        </header>
        {hasError ? <ErrorPage /> :
          <main>
            {contentDislay}
            <img className='we-cute' src={SaveTheDate} alt="Two cute people that are getting married" />
          </main>
        }
        <footer className="m-4 english">
          <span style={{ fontStyle: 'italic' }}>Ofir Stiber</span>&copy; 2022
        </footer>
      </InviteeContext.Provider>
    </div>
  )
}

export default App
