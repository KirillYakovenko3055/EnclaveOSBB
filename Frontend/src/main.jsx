import React from "react";
import ReactDOM from "react-dom/client";
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { ThemeProvider } from "@material-tailwind/react";

const rootElement = document.getElementById('root');

createRoot(rootElement).render(
    <ThemeProvider>
      <App />
    </ThemeProvider>
);
