import { createRoot } from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from "./app/store";
import App from './App';
import ReactGA from "react-ga4";

const container = document.getElementById("root")!;
const root = createRoot(container);

ReactGA.initialize("G-9PYMVNMC7M");
ReactGA.send("pageview");

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);