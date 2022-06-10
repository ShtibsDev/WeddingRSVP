import { useTranslation } from 'react-i18next'

interface ErrorProps {
  msg?: string
}

export default function ErrorPage({ msg }: ErrorProps) {
  const { t } = useTranslation()
  const isRtl = document.querySelector<HTMLDivElement>('html')?.dir === 'rtl'

  return (
    <div className='error-Page'>
      <div className='d-flex flex-column' style={{ width: 'fit-content' }}>
        <h1>{msg}</h1>
        <h2 style={{ fontStyle: 'italic', textAlign: isRtl ? 'left' : 'right' }}>{t('contactDeveloper')}</h2>
      </div>
    </div>
  )
}
