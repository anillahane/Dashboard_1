const DefaultPalette = (mode, skin) => {
  // ** Vars
  const whiteColor = '#FFF'
  const lightColor = '76, 78, 100'
  const darkColor = '234, 234, 255'
  const mainColor = mode === 'light' ? lightColor : darkColor

  const defaultBgColor = () => {
    if (skin === 'bordered' && mode === 'light') {
      return whiteColor
    } else if (skin === 'bordered' && mode === 'dark') {
      return '#30334E'
    } else if (mode === 'light') {
      return '#FFFFFF'
    } else return '#282A42'
  }

  return {
    customColors: {
      dark: darkColor,
      main: mainColor,
      light: lightColor,
      darkBg: '#282A42',
      lightBg: '#FFFFFF',
      bodyBg: mode === 'light' ? '#FFFFFF' : '#282A42',
      trackBg: mode === 'light' ? '#F2F2F4' : '#41435C',
      tooltipBg: mode === 'light' ? '#262732' : '#464A65',
      tableHeaderBg: mode === 'light' ? '#F5F5F7' : '#3A3E5B'
    },
    mode: mode,
    common: {
      black: '#000',
      white: whiteColor
    },
    primary: {
      light: '#FFD2A0', // Lightest shade of the primary color
      main: '#EFB6C8', // Main primary color
      dark: '#A888B5', // Darker shade of primary
      contrastText: whiteColor
    },
    secondary: {
      light: '#EFB6C8', // Lightest shade of the secondary color
      main: '#A888B5', // Main secondary color
      dark: '#8174A0', // Darker shade of secondary
      contrastText: whiteColor
    },
    error: {
      light: '#FF625F',
      main: '#FF4D49',
      dark: '#E04440',
      contrastText: whiteColor
    },
    warning: {
      light: '#FDBE42',
      main: '#FDB528',
      dark: '#DF9F23',
      contrastText: whiteColor
    },
    info: {
      light: '#40CDFA',
      main: '#26C6F9',
      dark: '#21AEDB',
      contrastText: whiteColor
    },
    success: {
      light: '#83E542',
      main: '#72E128',
      dark: '#64C623',
      contrastText: whiteColor
    },
    grey: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      A100: '#F5F5F5',
      A200: '#EEEEEE',
      A400: '#BDBDBD',
      A700: '#616161'
    },
    text: {
      primary: `rgba(${mainColor}, 0.87)`,
      secondary: `rgba(${mainColor}, 0.6)`,
      disabled: `rgba(${mainColor}, 0.38)`
    },
    divider: `rgba(${mainColor}, 0.12)`,
    background: {
      paper: mode === 'light' ? whiteColor : '#30334E',
      default: defaultBgColor()
    },
    action: {
      active: `rgba(${mainColor}, 0.54)`,
      hover: `rgba(${mainColor}, 0.05)`,
      hoverOpacity: 0.05,
      selected: `rgba(${mainColor}, 0.08)`,
      disabled: `rgba(${mainColor}, 0.26)`,
      disabledBackground: `rgba(${mainColor}, 0.12)`,
      focus: `rgba(${mainColor}, 0.12)`
    }
  }
}

export default DefaultPalette
