import React, { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import "./App.scss";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import Chat from "./components/chat/Chat";
import { auth } from "./components/firebase";
import Login from "./components/login/Login";
import Sidebar from "./components/sidebar/Sidebar";
import { login, logout } from "./features/userSlice";
import { ErrorFallBack } from "./utils/ErrorFallBack";

function App() {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((loginUser) => {
      //認証状態が変わったら(userがログインしたら)その情報をとってくることができる関数
      console.log(loginUser);
      if (loginUser) {
        dispatch(
          login({
            //dispatchで発火して、、、
            uid: loginUser.uid, // これらの新しい情報を持ったuserが新しく生成される
            photo: loginUser.photoURL, // *payload(情報)として設定されている
            email: loginUser.email,
            displayName: loginUser.displayName,
          })
        ); //loginのaction createrを使ってdispatchする
      } else {
        dispatch(logout());
      }
    });
  }, []);

  return (
    <div className="App">
      {user ? (
        <>
          <ErrorBoundary FallbackComponent={ErrorFallBack}>
            <Sidebar />
          </ErrorBoundary>
          <Chat />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
