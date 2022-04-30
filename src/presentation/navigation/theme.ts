import { DefaultTheme } from '@react-navigation/native'
import type { Theme } from '@react-navigation/native'

type ThemeDispatcher = (defaultTheme: Theme) => Theme

export const createTheme = (dispatcher: ThemeDispatcher): Theme =>
  dispatcher(DefaultTheme)
