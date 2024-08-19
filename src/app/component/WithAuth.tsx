"use client";
import SignIn from "./auth/SignInForm";
const WithAuth = (WrappedComponent: any) => {
  const Wrapper = (props: any) => {
    const isAuth = () => {
      return !!localStorage.getItem("authToken");
    };
    return <>{isAuth() ? <WrappedComponent {...props} /> : <SignIn />}</>;
  };
  return Wrapper;
};
export default WithAuth;
