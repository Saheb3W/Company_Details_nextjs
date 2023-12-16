"use client"
import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "./store/store";
export const metadata = {
  title: "Company Details",
  description: "Company Details",
};

const RootLayout = ({ children }) => (
  <html lang="en">
    <head>
      <link rel="shortcut icon" href="/logo.svg" />
    </head>
    <body>
      <Provider store={store} >
        <div className="main">
          <div className="gradient" />
        </div>

        <main className="app">
          {/* <Nav/> */}
          {children}
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;
