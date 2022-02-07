import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CustomHeader from './components/CustomHeader';
import Invitee from './models/Invitee';
import { getPhoneNumber } from './utils';
import * as Api from './services/api'
import MainContent from './components/MainContent';
import weCute from './Images/WeCute.jpeg'

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

  useEffect(() => {
    getInvitee()
  }, [])

  useEffect(() => console.log('Invitee has changed: ', invitee), [invitee])

  async function getInvitee() {
    const phoneNumber = getPhoneNumber();
    if (phoneNumber !== null) {
      const data = await Api.getInvitee(phoneNumber)
      if (data)
        setInvitee(data)
    }
    i18n.changeLanguage(invitee.lang)
    const html = document.querySelector('html')
    if (html) {
      html.lang = invitee.lang
    }
    document.title = t('RSVPs')
  }

  return (
    <div className="App" dir={invitee.lang === 'he' ? 'rtl' : 'ltr'}>
      <header>
        <CustomHeader />
      </header>
      <main>
        <MainContent invitee={invitee} setInvitee={setInvitee} />
        <img className='we-cute' src={weCute} alt="Two cute people that are getting married" />
      </main>
      <footer className="m-4">
        Ofir Stiber&copy; 2022
      </footer>
    </div>
  );
}

export default App;
