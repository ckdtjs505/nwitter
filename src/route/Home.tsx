import { signOut } from "@firebase/auth";
import { firebaseAuth } from "firebase";

const Home = ({ setIsLogin }: { setIsLogin: any }) => {
  const handleLogout = () => {
    signOut(firebaseAuth);
    setIsLogin(false);
  };

  return (
    <div>
      home
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
