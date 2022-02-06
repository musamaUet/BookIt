import { wrapper, store } from '../redux/store';
import { Provider } from 'react-redux';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
	return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
