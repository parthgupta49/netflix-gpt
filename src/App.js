import Body from "./components/Body";
import { ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.css';
import { Provider } from "react-redux";
import reduxStore from "./utils/Redux/reduxStore";
function App() {
  return (
    <>
      <Provider store={reduxStore}>
        <Body/>
        <ToastContainer/>
      </Provider>
    </>
  );
}

export default App;
