
import { createTheme } from '@mui/material/styles';
const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#e50914', // rouge Netflix
        },
        background: {
            default: '#0d0d0d', // fond global très sombre
            paper: '#141414',   // cartes, menus, etc.
        },
        text: {
            primary: '#ffffff',
            secondary: '#888888',
        },
    },
});

export default theme;