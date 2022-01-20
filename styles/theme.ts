import { createTheme } from '@mui/material';
import { orange } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: orange[500],
        },
        secondary: {
            main: '#fff',
        },
        background: {
            default: '#0d0d0d',
        },
    },
});

export default theme;

