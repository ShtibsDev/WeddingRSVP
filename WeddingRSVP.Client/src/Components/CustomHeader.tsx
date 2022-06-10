import { useTranslation } from 'react-i18next'

export default function CustomHeader() {
  const { t } = useTranslation()

  return (
    <div className='custom-header'>
      <h1>
        {t('names.ellie')} &amp; {t('names.ofir')}
      </h1>
    </div>
  )
}
