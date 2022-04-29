import { StatusBar } from 'react-native'

export const getNotchSize = () => StatusBar.currentHeight || 0
