import { createMuiTheme } from '@material-ui/core/styles'
import { pink, orange } from '@material-ui/core/colors'

const theme = createMuiTheme({
    palette: {
      primary: {
      light: '#55c7b8',
      main: '#55c7b8',
      dark: '#55c7b8',
      contrastText: '#fff',
    },
    secondary: {
      light: '#55c7b8',
      main: '#55c7b8',
      dark: '#55c7b8',
      contrastText: '#000',
    },
      openTitle: pink['700'],
      protectedTitle: orange['700'],
      type: 'light'
    }
  })

  export default theme  