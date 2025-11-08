import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Routing from './Routing/Routing';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LocationContext, LocationProvider } from './Utilities/LocationContext';
import { Provider } from 'react-redux';
import store from './Redux/Store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <LocationProvider>
          <Routing />
        </LocationProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
