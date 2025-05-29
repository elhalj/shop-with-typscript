import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/auth/Signup";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useContext } from "react";
import { ThemeContext } from "./context";
import Details from "./pages/articles/Details";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("Theme context must be used within a ThemeContextProvider");
  }

  const { theme, toggleTheme } = themeContext;

  return (
    <div data-theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/catalogue/categorie/:name" element={<Details />} />
      </Routes>
      {/* footer */}
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default App;
