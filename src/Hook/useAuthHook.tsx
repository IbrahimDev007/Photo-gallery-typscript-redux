import { useContext } from "react";
import { AuthContext, AuthContextType } from "../Provider/Provider";

//hook use use for authcontext every where
const useAuthHook = (): AuthContextType => {
	const auth = useContext(AuthContext);

	if (auth === null) {
		// Handle the case when auth is null

		throw new Error("AuthContext is not available.");
	}

	return auth;
};

export default useAuthHook;
