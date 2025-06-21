import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Routing from './Routing/Routing';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  );
}

export default App;
