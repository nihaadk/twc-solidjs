import { ParentComponent, createContext, onMount, useContext } from "solid-js";

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
    } catch (error) {
        console.log('Error !!!!');
        
    } finally {
        setStore('loading', false);
    }
  })

  const authenticatedUser = async () => {
    return new Promise((res) => {
        setTimeout(() => {
            setStore('isAuthenticated', true);
            res(true);
        }, 1000);
    })
  }
 
  return (
    <AuthStateContext.Provider value={store}>
      <Loader size={100} />
      {/* {props.children} */}
    </AuthStateContext.Provider>
  );
};

export const useAuthState = () => useContext(AuthStateContext);

export default AuthProvider;
