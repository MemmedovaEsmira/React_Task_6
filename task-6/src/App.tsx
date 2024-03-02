import './App.css'
import Feedbacks from './Components/Feedbacks/Feedbacks';
import { Provider } from 'react-redux';
import {Store} from './Store/Store';

function App() {
//   const [count, setCount] = useState(0)
  return (
    <>
      <Provider store={Store}>
        <Feedbacks />
      </Provider>

    </>
  )
}

export default App;