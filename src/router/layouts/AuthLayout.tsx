import { Outlet, useNavigate } from "@solidjs/router";
import { Component, onMount } from "solid-js";
import { useAuthState } from "../../context/auth";

const AuthLayout: Component = () => {
  const authState = useAuthState()!;
  const navigate = useNavigate();

  const checkIsAuthenticated = () => {
    authState.isAuthenticated && navigate("/", { replace: true });
  };

  onMount(() => {
    checkIsAuthenticated();
  });

  return <Outlet />;
};

export default AuthLayout;
