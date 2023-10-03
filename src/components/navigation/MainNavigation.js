import { NavLink } from "react-router-dom";

const MainNavigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/login">Login Page</NavLink>
        </li>
        <li>
          <NavLink to="/signup">Signup Page</NavLink>
        </li>
        <li>
          <NavLink to="/">Home Page</NavLink>
        </li>
        <li>
          <NavLink to="/profiles/:userId">User Profile</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default MainNavigation;
