import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from "./theme/themes.tsx";
import {BrowserRouter} from 'react-router';
import {FavoritesProvider} from "./useEffect/ProvierFavorit.tsx";
import {LoginProvider} from "./useEffect/Login.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <LoginProvider>
            <FavoritesProvider>
                <BrowserRouter>
                    <ThemeProvider theme={theme}>
                        <App/>
                        <CssBaseline/>
                    </ThemeProvider>
                </BrowserRouter>
            </FavoritesProvider>
        </LoginProvider>
    </StrictMode>,
)
