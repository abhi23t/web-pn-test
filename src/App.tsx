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
            Hey! This is your token 👇🏻
            <br />
            <br />
            <br />
            <code style={{ fontSize: "16px" }}>{token}</code> <br />
            <br />
            <br />
            👆🏻 Use me to test Push Notification.
          </p>
        ) : (
          <p>Getting token...</p>
        )}
      </header>
    </div>
  );
}

export default App;
