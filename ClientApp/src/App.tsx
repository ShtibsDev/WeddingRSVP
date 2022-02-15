import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CustomHeader from './components/CustomHeader';
import Invitee from './models/Invitee';
import { getPhoneNumber } from './utils';
import * as Api from './services/api'
import MainContent from './components/MainContent';
import weCute from './Images/WeCute.jpeg'
import ErrorPage from './components/Pages/ErrorPage';

const defaultInvitee: Invitee = {
  firstName: '',
  lastName: '',
  isBringsPlusOne: false,
  isFinal: false,
  isGroup: false,
  isMale: true,
  lang: 'he',
  phoneNumber: ''
}

function App() {
  const { t, i18n } = useTranslation()

  const [invitee, setInvitee] = useState<Invitee>(defaultInvitee)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    getInvitee()
  }, [])

  async function getInvitee() {
    let phoneNumber = ''
    try {
      phoneNumber = getPhoneNumber();
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
      <header>
        <CustomHeader />
      </header>
      {hasError ? <ErrorPage /> :
        <main>
          <MainContent invitee={invitee} setInvitee={setInvitee} />
          <img className='we-cute' src={weCute} alt="Two cute people that are getting married" />
        </main>
      }
      <footer className="m-4">
        Ofir Stiber&copy; 2022
      </footer>
    </div>
  );
}

export default App;
