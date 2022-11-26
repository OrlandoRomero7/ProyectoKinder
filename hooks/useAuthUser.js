/* import { useEffect, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext"


// HOOK FOR VALIDATE IF USER IS LOGGED

export const useAuthUser = () => {
  const { push, pathname } = useRouter();

  const { setisLogged } = useContext(AuthContext);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      let userLogged = user === null ? false : true;

      if (!userLogged) {
        push("/");
        setisLogged(false);
      } else {
        setisLogged(true);
        // IF THE USER IS LOGGED IN AND WANTS TO VISIT THE ROUTES
        if (pathname === "/") {
          push("/posts");
        }
      }
    });
  }, []);
};

 

export default useAuthUser  */