import { Provider } from 'react-redux';

import { store } from '../api/app/store';

import '../styles/main.scss';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
