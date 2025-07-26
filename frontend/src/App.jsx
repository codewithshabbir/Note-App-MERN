import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import MainLayout from "./MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/signup" element={<Auth mode="Sign Up" />} />
        <Route path="/signin" element={<Auth mode="Sign In" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
