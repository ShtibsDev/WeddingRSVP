import { useTranslation } from 'react-i18next'

export default function Loading() {
  const { t } = useTranslation()
  return (
    <div className='loading'>
      <div className='loading-circle rotation'>{t('loading')}</div>
    </div>
  )
}
