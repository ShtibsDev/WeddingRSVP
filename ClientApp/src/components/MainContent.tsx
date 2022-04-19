import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import InviteeContext from '../context/InviteeContext'
import CustomHeader from './CustomHeader'
import SelectModal from './SelectModal'
import SingleForm from './SingleForm'

export default function MainContent(props: {
  goToResult?: () => void
  className?: string
}) {
  const { t } = useTranslation()
  const { invitee } = useContext(InviteeContext)

  return (
    <div className='App'>
      <header>
        <CustomHeader />
      </header>
      <main className={`main-content ${props.className} h-100`}>
        <div className='h-100 d-flex flex-column'>
          <h3 className='m-4'>
            {t('hey')} {invitee.firstName} {invitee.lastName}
          </h3>
          <h5 className='m-3'>{t('weddingGettingClose')}</h5>
          <h3 className='m-4'>
            {t('onFriday')}
            <br />
            17/06/2022
          </h3>
          <a href='Invitation.pdf' className=''>
            {t('invitationLink')}
          </a>
          <SingleForm goToResult={props.goToResult} className='col' />
        </div>
      </main>
      <footer>
        <span style={{ fontStyle: 'italic' }}>Ofir Stiber</span> &copy; 2022
      </footer>
    </div>
  )
}
