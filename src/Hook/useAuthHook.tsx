import { useContext } from "react";
import { AuthContext } from "../Provider/Provider";

//hook use use for authcontext every where
const useAuthHook = () => {
	const auth = useContext(AuthContext);
	return auth;
};

export default useAuthHook;
