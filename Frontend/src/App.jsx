import './App.css';
import LandingPage from './pages/Landing-Page/LandingPage';
import { Provider } from 'react-redux';
import store from './store/store';
import Routing from './Routes/routing';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          
          <Routing />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
