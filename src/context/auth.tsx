import {
  ParentComponent,
  Show,
  createContext,
  onMount,
  useContext,
} from "solid-js";

import { createStore } from "solid-js/store";
import Loader from "../components/utils/Loader";

type AuthStateContextValues = {
  isAuthenticated: boolean;
  loading: boolean;
};

const initialState = () => ({
  isAuthenticated: false,
  loading: true,
});

const AuthStateContext = createContext<AuthStateContextValues>();

const AuthProvider: ParentComponent = (props) => {
  const [store, setStore] = createStore(initialState());

  onMount(async () => {
    try {
      await authenticatedUser();
      setStore("isAuthenticated", true);
    } catch (error) {
      console.log("Error !!!!");
      setStore("isAuthenticated", false);
    } finally {
      setStore("loading", false);
    }
  });

  const authenticatedUser = async () => {
    return new Promise((res) => {
      setTimeout(() => {
        setStore("isAuthenticated", true);
        res(true);
      }, 1000);
    });
  };

  return (
    <AuthStateContext.Provider value={store}>
      <Show when={store.loading} fallback={props.children}>
        <Loader size={100} />
      </Show>
    </AuthStateContext.Provider>
  );
};

export const useAuthState = () => useContext(AuthStateContext);

export default AuthProvider;
