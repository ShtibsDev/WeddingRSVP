import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CustomHeader from './components/CustomHeader';
import Invitee from './models/Invitee';
import { getPhoneNumber } from './utils';
import * as Api from './services/api'
import MainContent from './components/MainContent';
import weCute from './Images/WeCute.jpeg'

const defaultInvitee: Invitee = {
    firstName: 'ג\'וטרו',
    lastName: 'קוג\'ו',
    isBringsPlusOne: false,
    isFinal: false,
    isGroup: false,
    isMale: true,
    lang: 'he',
    phoneNumber: '0500000000'
}

function App() {
    const { t, i18n } = useTranslation()

    const [invitee, setInvitee] = useState(defaultInvitee)

    useEffect(() => {
        async function getInvitee() {
            const phoneNumber = getPhoneNumber();
            if (phoneNumber !== null)
                setInvitee(await Api.getInvitee(phoneNumber))
            i18n.changeLanguage(invitee.lang)
            const html = document.querySelector('html')
            if (html) {
                html.lang = invitee.lang
            }
            document.title = t('RSVPs')
        }
        getInvitee()
    }, [])

    return (
        <div className="App" dir={invitee.lang === 'he' ? 'rtl' : 'ltr'}>
            <header>
                <CustomHeader />
            </header>
            <main>
                <MainContent invitee={invitee} />
                <img className='we-cute' src={weCute} alt="Two cute people that are getting married" />
            </main>
            <footer className="m-4">
                Ofir Stiber&copy; 2022
            </footer>
        </div>
    );
}

export default App;
