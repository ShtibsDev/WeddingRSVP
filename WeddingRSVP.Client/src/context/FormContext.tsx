import { createContext } from 'react'

export interface FormContextModel {
  handleForm: () => Promise<void>
}

const FromContext = createContext<FormContextModel>({handleForm: async() => {return}})

export default FromContext