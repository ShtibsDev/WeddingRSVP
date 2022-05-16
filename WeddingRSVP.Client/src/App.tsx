import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getPhoneNumber } from './utils'
import * as Api from './services/api'
import MainContent from './Components/MainContent'
import ErrorPage from './Components/Pages/ErrorPage'
import InviteeContext, { defaultInvitee } from './context/InviteeContext'
import ResultPage from './Components/Pages/ResultPage'
import Loading from './Components/Loading'

function App() {

  return (
    <div className='App'>
      <header className='bg' />
      <main className='App'><MainContent /></main>
      <footer className='bg' />
    </div>
  )
}

export default App
