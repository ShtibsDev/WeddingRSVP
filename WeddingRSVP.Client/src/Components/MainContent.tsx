import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import InviteeContext from '../context/InviteeContext'
import CustomHeader from './CustomHeader'
import Loading from './Loading'
import SingleForm from './SingleForm'

interface MainContentProps {
  goToResult: () => void
  className?: string
}

export default function MainContent({ goToResult, className }: MainContentProps) {
  const { t } = useTranslation()
  const { invitee } = useContext(InviteeContext)
  const gender = invitee.isMale ? 'm' : 'f'

  return (
    <>
      <header>
        <CustomHeader />
      </header>
      <main className={`main-content container ${className}`}>
        <Loading />

        <div className='d-flex flex-column h-100'>
          <h3 className='m-3'>
            {t('hey')} {invitee.firstName} {invitee.lastName}
          </h3>
          <h3 className='m-2'>{t(`${gender}.weddingGettingClose`)}</h3>
          <div>
            <h3 className='m-2'>{t('onFriday')} 17/06/2022</h3>
            <h3>{t('onTime')} 12:30</h3>
          </div>
          <SingleForm goToResult={goToResult} />
        </div>
      </main>
      <footer>
        <span style={{ fontStyle: 'italic' }}>Ofir Stiber</span> &copy; 2022
      </footer>
    </>
  )
}
