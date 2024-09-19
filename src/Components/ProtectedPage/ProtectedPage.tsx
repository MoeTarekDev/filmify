// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";

// export default function ProtectedPage({ children }: any) {
//   let { userToken } = useSelector(function (store: {
//     userReducer: { userToken: string };
//   }) {
//     return store.userReducer;
//   });

//   if (userToken) {
//     return children;
//   } else {
//     return <Navigate to="/auth" />;
//   }
// }
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { userActions } from "../../Store/user.slice";
import { useDispatch } from "react-redux";
import Loading from "../Loading/Loading";

export default function ProtectedPage({ children }: any) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { setUserEmail, setUserName, setUserToken, setUserImage } = userActions;
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        dispatch(setUserEmail(currentUser.email));
        dispatch(setUserName(currentUser.displayName));

        //@ts-ignore
        dispatch(setUserToken(currentUser.accessToken));
        dispatch(setUserImage(currentUser.photoURL));
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return children;
}
