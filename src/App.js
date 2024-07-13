import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import ChatPage from "./Components/ChatPage/ChatPage";
import Login from "./Components/Login/Login";
import "./App.css";
import { auth } from "./firebase";

function App() {
  // sign in with Google & store data in localStorage
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  // console.log(user);

  // Sign out with click photo
  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        setUser(null);
        localStorage.removeItem("user");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <Router>
      <div className="App">
        {user ? (
          <Routes>
            <Route
              path="/:emailID"
              element={<ChatPage currentUser={user} signOut={signOut} />}
            />

            <Route
              path="/"
              element={<Home currentUser={user} signOut={signOut} />}
            />
          </Routes>
        ) : (
          <Login setUser={setUser} />
        )}
      </div>
    </Router>
  );
}

export default App;
