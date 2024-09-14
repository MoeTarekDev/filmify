import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedPage({ children }: any) {
  let { userToken } = useSelector(function (store: {
    userReducer: { userToken: string };
  }) {
    return store.userReducer;
  });

  if (userToken) {
    return children;
  } else {
    return <Navigate to="/auth" />;
  }
}
