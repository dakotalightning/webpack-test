import React from 'react'
import { render } from 'react-dom';

import './scss/style.scss'

import ConectedApp from './components/ConectedApp';

const App = (): React.ReactElement => {
  const reactComponent = (
    <React.StrictMode>
      <ConectedApp />
    </React.StrictMode>
  );

  return reactComponent;
};

const renderApp = (): void => {
  const el = document.getElementById('root');
  render(App(), el);
};

window.onload = () => renderApp();
