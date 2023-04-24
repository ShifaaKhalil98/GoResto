import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import Signin from "./pages/signin";
import Register from "./pages/register";
import Setup from "./pages/setup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/signin" element={<Signin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/setup" element={<Setup />} />
        {/* <Route path="/admin" element={<UserList />} />
      <Route path="/pending" element={<pending />} />
      <Route path="/dashboard" element={<dashboard />} />
      <Route path="/chatsReviews" element={<chatsReviews />} />
      <Route path="/reservations" element={<reservations />} />
      <Route path="/reservations" element={<reservations />} />
      <Route path="/about" element={<about />} />
      <Route path="/menu" element={<menu />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
// return (
//   <div className="App">
//     <header className="App-header">
//       <img src={logo} className="App-logo" alt="logo" />
//       <p>
//         Edit <code>src/App.js</code> and save to reload.
//       </p>
//       <a
//         className="App-link"
//         href="https://reactjs.org"
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         Learn React
//       </a>
//     </header>
//   </div>
// );
