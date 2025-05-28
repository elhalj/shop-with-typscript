import { useContext } from "react"
import { ThemeContext } from "./context/themeContext/ThemeContext"
import { Link, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Signup from "./pages/auth/Signup"

const App = () => {
  const themeContext = useContext(ThemeContext)
  
  if (!themeContext) {
    throw new Error("Theme context must be used within a ThemeContextProvider")
  }
  
  const { theme, toggleTheme } = themeContext
  
  return (
    <div className="bg-base-300 min-h-screen" data-theme={theme}>
      <div className="container mx-auto p-4">
        <button className="btn btn-accent" onClick={toggleTheme}>
          {theme === "light" ? "Dark mode" : "Light mode"}
        </button>
        <button className="btn btn-primary ml-4">
          <Link to='/auth/signup'>S'Inscrire</Link>
        </button>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/signup" element={<Signup />} />
      </Routes>
    </div>
  )
}

export default App
