import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { UpdateDialog } from "./components";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

serviceWorkerRegistration.register({
  onUpdate: registration => {
    if (registration.waiting) {
      ReactDOM.render(<UpdateDialog registration={registration} />, 
        document.querySelector('.SW-update-dialog'));
    }
  }
});