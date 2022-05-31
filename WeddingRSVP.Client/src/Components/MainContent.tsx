import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import InviteeContext, { defaultInvitee } from '../context/InviteeContext'
import i18n from '../services/i18n'
import { getPhoneNumber, wait } from '../utils'
import Loading from './Pages/Loading'
import * as Api from '../services/api'
import SingleForm from './SingleForm'
import { DisplayType, ResponseType } from '../models/Enums'
import ResultPage from './Pages/ResultPage'
import ErrorPage from './Pages/ErrorPage'
import DisplayContext from '../context/DisplayContext'
import MainDisplay from './MainContent.MainDisplay'


export default function MainContent() {
  const { t } = useTranslation()
  const [invitee, setInvitee] = useState(defaultInvitee)
  const [fadeMode, setFadeMode] = useState<'fade-in' | 'fade-out'>('fade-in')
  const [currentDisplay, setCurrentDisplay] = useState(<Loading />)
  const value = useMemo(() => ({ invitee, setInvitee }), [invitee])

  useEffect(() => {
    getInvitee()
  }, [])

  async function getInvitee() {
    let phoneNumber = ''
    try {
      phoneNumber = getPhoneNumber()
    } catch {
      await setDisplay(DisplayType.UrlError)
      return
    }
    if (phoneNumber !== null) {
      try {
        const data = await Api.getInvitee(phoneNumber)
        if (data) {
          setInvitee(data)
          if (data.response === ResponseType.None) setDisplay(DisplayType.MainDisplay)
          else setDisplay(DisplayType.ResultPage)
        }
        else setDisplay(DisplayType.NotFound)

      } catch (error) {
        if (error === 204) setDisplay(DisplayType.NotFound)
        else setDisplay(DisplayType.GeneralError)
      }
    }
  }

  useEffect(() => {
    i18n.changeLanguage(invitee.lang)
    const html = document.querySelector('html')
    if (html) {
      html.lang = invitee.lang
      html.dir = invitee.lang === 'he' ? 'rtl' : 'ltr'
    }
    document.title = t('RSVPs')
  }, [invitee])

  const setDisplay = async (displayType: DisplayType, willWait = true) => {
    setFadeMode('fade-out')
    if (willWait)
      await wait(500)

    switch (displayType) {
      case DisplayType.Loading:
        setCurrentDisplay(<Loading />)
        break
      case DisplayType.MainDisplay:
        setCurrentDisplay(<MainDisplay />)
        break
      case DisplayType.ResultPage:
        setCurrentDisplay(<ResultPage />)
        break
      case DisplayType.UrlError:
        setCurrentDisplay(<ErrorPage msg={t('urlError')} />)
        break
      case DisplayType.NotFound:
        setCurrentDisplay(<ErrorPage msg={t('inviteeNotFound')} />)
        break
      case DisplayType.GeneralError:
        setCurrentDisplay(<ErrorPage msg={t('generalError')} />)
        break
    }

    setFadeMode('fade-in')
    if (willWait)
      await wait(500)
  }

  return (
    <DisplayContext.Provider value={{ setDisplay }}>
      <InviteeContext.Provider value={value}>
        <header>
          <div className='custom-header'>
            <h1>
              {t('names.ellie')} &amp; {t('names.ofir')}
            </h1>
          </div>
        </header>
        <main className={`main-content container ${fadeMode}`}>
          {currentDisplay}
        </main>
        <footer>
          <span style={{ fontStyle: 'italic' }}>Ofir Stiber</span> &copy; 2022
        </footer>
      </InviteeContext.Provider>
    </DisplayContext.Provider>
  )
}
