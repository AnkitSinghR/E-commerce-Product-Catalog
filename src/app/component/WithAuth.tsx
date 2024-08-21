"use client";
import { useRouter } from "next/navigation";
const WithAuth = (WrappedComponent: any) => {
  const Wrapper = (props: any) => {
    const router = useRouter();
    const isAuth = () => !!localStorage?.getItem("authToken");
    return (
      <>{isAuth() ? <WrappedComponent {...props} /> : router.push("/login")}</>
    );
  };
  return Wrapper;
};
export default WithAuth;
