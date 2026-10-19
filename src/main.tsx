import React from 'react';
import {createRoot} from 'react-dom/client';
import {App,AmbientAudio} from './App';
import './base.css';
createRoot(document.getElementById('root')!).render(<React.StrictMode><AmbientAudio/><App/></React.StrictMode>);
