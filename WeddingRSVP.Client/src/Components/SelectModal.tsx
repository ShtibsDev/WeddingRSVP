import React from 'react'
export default <></>
// import { t } from 'i18next'
// import React, { useContext, useState } from 'react'
// import { Col, Modal, Row } from 'react-bootstrap'
// import FlowerButton from './FlowerButton'
// import Option from '@src/models/Option'
// import Invitee from '@src/models/Invitee'
// import InviteeContext from '../context/InviteeContext'
// import IProps from '@src/models/IProps'

// interface ModalProps extends IProps {
//   invitee?: Invitee
//   setInvitee: (invitee: Invitee) => void
//   visibility: boolean
//   setVisibility: (visibility: boolean) => void
//   hadnleClick: () => void
// }

// const SelectModal = ({ invitee, setInvitee, visibility, setVisibility, hadnleClick }: ModalProps) => {
//   let mainInvitee: Invitee
//   let gender = invitee?.isMale ? 'm' : 'f'
//   const [isGenericPlusOne, setIsGenericPlusOne] = useState(false)
//   const [options, setOptions] = useState<Option[]>([
//     { value: 1, text: t(`${gender}.options.arriving`) },
//     { value: 2, text: t(`${gender}.options.stayingTheNight`) },
//     { value: 3, text: t(`${gender}.options.notSure`) },
//     { value: 4, text: t(`${gender}.options.notComing`) },
//   ])

//   if (!invitee) {
//     setIsGenericPlusOne(true)
//     const context = useContext(InviteeContext)
//     mainInvitee = context.invitee
//     setInvitee = context.setInvitee
//     gender = mainInvitee?.isMale ? 'm' : 'f'
//     setOptions([
//       { value: true, text: t('yes') },
//       { value: false, text: t('no') },
//     ])
//   }

//   const setOption = (option: Option) => {
//     setVisibility(false)

//     if (invitee) {
//       switch (option.value) {
//         case 1:
//           setInvitee({
//             ...invitee,
//             isArriving: true,
//             isStayingForNight: false,
//             isFinal: true,
//           })
//           break
//         case 2:
//           setInvitee({
//             ...invitee,
//             isArriving: true,
//             isStayingForNight: true,
//             isFinal: true,
//           })
//           break
//         case 3:
//           break
//         case 4:
//           setInvitee({
//             ...invitee,
//             isArriving: false,
//             isStayingForNight: false,
//             isFinal: true,
//           })
//           break
//       }
//     }
//     hadnleClick()
//   }


//   return (
//     <Modal className={invitee?.lang === 'he' ? 'rtl' : ''} centered={true} show={visibility} onHide={() => setVisibility(false)}>
//       <Row className='justify-content-around align-items-center h-100 py-4'>
//         {options.map((option) => (
//           <Col key={Number(option.value)} className='d-flex justify-content-center align-items-center col-6'>
//             <FlowerButton onClick={setOption} option={option} rotate={false} />
//           </Col>
//         ))}
//       </Row>
//     </Modal>
//   )
// }

// export default SelectModal
