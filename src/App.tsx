import { useContext } from "react"
import { ThemeContext } from "./context/themeContext/ThemeContext"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"

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
      </div>
      <Routes>
        <Route path="/" element={ <Home/>} />
      </Routes>
    </div>
  )
}

export default App
