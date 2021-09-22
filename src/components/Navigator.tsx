import { Link, useHistory } from "react-router-dom";
import { signOut } from "@firebase/auth";
import { firebaseAuth } from "firebase";
import Profile from "route/Profile";

const Navigator = ({ isLogin }: { isLogin: boolean }) => {
  const history = useHistory();
  const handleLogout = () => {
    signOut(firebaseAuth);
    history.push("/");
  };

  return (
    <ul>
      <li>
        <Link to="/"> home</Link>
      </li>
      {isLogin ? (
        <>
          <li>
            <Link to="/profile">
              <Profile />
            </Link>
          </li>

          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </>
      ) : (
        ""
      )}
    </ul>
  );
};

export default Navigator;
