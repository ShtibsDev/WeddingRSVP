import i18next from "i18next";
import { initReactI18next } from 'react-i18next'

const resource = {
  he: {
    translation: {
      RSVPs: 'אישורי הגעה',
      hey: 'היי',
      names: {
        ofir: 'Ofir',
        ellie: 'Ellie'
      },
      weddingGettingClose: 'החתונה שלנו מתקרבת',
      onFriday: 'ביום שישי',
      invitationLink: 'להזמנה לחתונה',
      iAm: 'אני',
      finish: 'סיום',
      m: {
        pleaseChoose: 'תבחר בבקשה',
        bringPlusOne: 'אתה מביא +1',
        options: {
          arriving: 'מגיע',
          stayingTheNight: 'מגיע ונשאר ללילה',
          notSure: 'עוד לא יודע',
          notComing: 'לא מגיע'
        }
      },
      f: {
        pleaseChoose: 'תבחרי בבקשה',
        bringPlusOne: 'את מביאה +1',
        options: {
          arriving: 'מגיעה',
          stayingTheNight: 'מגיעה ונשארת ללילה',
          notSure: 'עוד לא יודעת',
          notComing: 'לא מגיעה'
        }
      }
    }
  },
  ru: {
    translation: {
      RSVPs: 'Приглашение на свадьбу',
      hey: 'Привет',
      names: {
        ofir: 'Офир',
        ellie: 'Элина'
      },
      weddingGettingClose: 'Наша свадьба приближается',
      onFriday: 'В пятницу',
      invitationLink: 'К свадебному приглашению',
      iAm: 'я',
      finish: 'Заканчивать',
      m: {
        pleaseChoose: 'Пожалуйста выберите',
        bringPlusOne: 'Вы пришли с +1',
        options: {
          arriving: 'Приближается',
          stayingTheNight: 'Прибытие и ночлег',
          notSure: 'Пока не уверен',
          notComing: 'Не идет'
        }
      },
      f: {
        pleaseChoose: 'Пожалуйста, выбери',
        bringPlusOne: 'Вы пришли с +1',
        options: {
          arriving: 'Приближается',
          stayingTheNight: 'Прибытие и ночлег',
          notSure: 'Пока не уверен',
          notComing: 'Не идет'
        }
      }
    }
  }
}

i18next
  .use(initReactI18next)
  .init({
    resources: resource,
    fallbackLng: "he",
    interpolation: {
      escapeValue: false,
    },
  });
export default i18next;