import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import 'dayjs/locale/de';

dayjs.extend(localizedFormat);
dayjs.locale('de');

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App/>
    </StrictMode>,
)
