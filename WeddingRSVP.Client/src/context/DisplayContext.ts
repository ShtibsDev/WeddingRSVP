import { createContext } from 'react'
import { DisplayType } from '../models/Enums'

interface DisplayContextModel {
  setDisplay: (type: DisplayType) => Promise<void>
}

const DisplayContext = createContext<DisplayContextModel>({setDisplay: async (type: DisplayType) => {return}})

export default DisplayContext