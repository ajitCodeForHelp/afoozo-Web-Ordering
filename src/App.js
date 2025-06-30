import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Routing from './Routing/Routing';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LocationContext, LocationProvider } from './Utilities/LocationContext';

function App() {
  return (
    <BrowserRouter>
      <LocationProvider>
        <Routing />
      </LocationProvider>
    </BrowserRouter>
  );
}

export default App;
