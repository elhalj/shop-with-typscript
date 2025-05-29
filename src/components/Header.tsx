import { Link, NavLink, useLocation } from "react-router-dom";
import { SlBasketLoaded } from "react-icons/sl";
import { BsFillBasket3Fill } from "react-icons/bs";
import { FaMoon } from "react-icons/fa";
import { LuSun } from "react-icons/lu";

type ThemeProps = {
  /**
   * Theme actuel de l'application
   */
  theme: string;
  /**
   * Fonction pour changer le th me
   */
  toggleTheme: () => void;
};

/**
 * Header de l'application
 */
const Header = ({ theme, toggleTheme }: ThemeProps) => {
  // location actuelle du routeur
  const location = useLocation();

  return (
    <div data-theme={theme} className="sticky top-4 z-10 my-4 bg-transparent">
      {/* nav */}
      <div className="container mx-auto flex justify-around items-center bg-neutral-300 text-black rounded-lg">
        <div >
          {/* logo */}
          <span className="flex items-center text-3xl gap-1 "><BsFillBasket3Fill size={45} color="indigo" />shop</span>
        </div>
        {/* NavLink */}
        <ul className="flex justify-around items-center gap-4 uppercase">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "border-b border-b-red-400" : ""
              }
            >
              home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                isActive ? "border-b border-b-red-400" : ""
              }
            >
              blog
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/category"
              className={({ isActive }) =>
                isActive ? "border-b border-b-red-400" : ""
              }
            >
              catalogue
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "border-b border-b-red-400" : ""
              }
            >
              about
            </NavLink>
          </li>
          <li className="flex flex-row-reverse justify-center items-center">
            <NavLink to="/basket">
              <div className="relative">
                <SlBasketLoaded size={32}  />
                <span className="absolute -top-4 -right-2 bg-red-400 p-1 w-6 h-auto rounded-full">
                  {/* le nombre d'items dans le panier (0 si pas sur la page panier) a changer plus tard */}
                  {location.pathname === "/basket" ? "1" : "0"} 
                </span>
              </div>
            </NavLink>

            <div className="container mx-auto p-4">
              <div className="btn  rounded-full transition-all duration-500 uppercase drop-shadow-xl/25" onClick={toggleTheme}>
                {theme === "light" ? (<FaMoon size={22}/>) : (<LuSun size={22} color="yellow"/>)}
              </div>
              <button className="btn  ml-4 uppercase drop-shadow-xl/25">
                <Link to="/auth/signup">S'Inscrire</Link>
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
