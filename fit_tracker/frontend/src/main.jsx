import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from '../redux/configureStore';
import App from './App.jsx';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
