import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "@radix-ui/themes/styles.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';


async function deferRender() {
  const { worker } = await import("../src/mockServer/browser.ts");

  await worker.start();
}

deferRender().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
           <ToastContainer/>
        </BrowserRouter>
     
      </Provider>
    </StrictMode>
  );
});
