import { Link, useHistory } from "react-router-dom";
import { signOut } from "@firebase/auth";
import { firebaseAuth } from "firebase";

type NavProps = {
  isLogin: boolean;
  user: any;
};
const Navigator = ({ isLogin, user }: NavProps) => {
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
            <Link to="/profile"> {user.displayName}'의 Profile</Link>
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
