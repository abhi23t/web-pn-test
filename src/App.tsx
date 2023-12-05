import { getToken } from "firebase/messaging";
import { useEffect, useState } from "react";
import "./App.css";
import { messaging, onMessageListener } from "./firebase";
import logo from "./logo.svg";

function App() {
  useEffect(() => {
    requestForToken();
  }, []);
  const [token, setToken] = useState<string>();
  const requestForToken = async () => {
    try {
      const token = await getToken(messaging, {
        vapidKey: process.env.REACT_APP_VAPID_KEY,
      });
      setToken(token);
    } catch (error) {
      console.log("An error occurred while retrieving token. ", error);
    }
  };
  onMessageListener()
    .then((payload) => {
      console.log(payload);
    })
    .catch((err) => console.log("failed: ", err));

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {token ? (
          <p>
            Hey! This is your token <br />
            <code>{token}</code>. <br />
            Use me to test Push Notification.
          </p>
        ) : (
          <p>Getting token...</p>
        )}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
