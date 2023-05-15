import { Outlet, useNavigate } from "@solidjs/router";
import { Component, onMount } from "solid-js";
import { useAuthState } from "../../context/auth";

const MainLayout: Component = () => {
  const authState = useAuthState()!;
  const navigate = useNavigate();

  const checkIsNotAuthenticated = () => {
    !authState.isAuthenticated && navigate("/auth/login", { replace: true });
  };

  onMount(() => {
    checkIsNotAuthenticated();
  });

  return <Outlet />;
};

export default MainLayout;
