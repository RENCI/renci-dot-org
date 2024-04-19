import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const palette = {
  primary: {
    main: '#00758d',
  },
  secondary: {
    main: '#5e9b8b',
  },
  error: {
    main: red.A400,
  },
  text: {
    primary: 'rgb(102, 102, 102)',
  },
}

const shape = {
  borderRadius: 0,
}

const typography = {
  fontFamily: "\"Atlas Grotesk Web\", sans-serif",
  htmlFontSize: 16,
  h1: {
    fontSize: 'clamp(2rem, 1.286rem + 1.905vw, 2.8rem)',
    paddingBottom: '0.5rem'
  },
  h2: {
    fontSize: 'clamp(1.7rem, 1.486rem + 0.571vw, 2rem)',
    paddingBottom: '0.5rem'
  },
  h3: {
    fontSize: 'clamp(1.2rem, 1.15vw + 0.26vw, 1.4rem)',
    paddingBottom: '0.5rem'
  },
  h4: {
    fontSize: 'clamp(1.1rem, 1.05vw + 0.26vw, 1.3rem)',
    paddingBottom: '0.5rem'
  },
  h5: {
    fontSize: 'clamp(1.1rem, 0.95vw + 0.26vw, 1.2rem)',
    paddingBottom: '0.5rem'
  },

}

// Create a theme instance.
const theme = createTheme({
  mode: 'light',
  palette,
  shape,
  typography,
})
  
export default theme;