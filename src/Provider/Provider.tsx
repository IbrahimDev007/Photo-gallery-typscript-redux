import { createContext, useState, ReactNode } from "react";
import { User, getAuth } from "firebase/auth";
import { app } from "../Firebase/firebase.config";

export type AuthContextType = {
	user: User | null;
	loading: boolean;
	// googleSignIn: () => Promise<void>;
	// logOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null); //export auth context to use everywher by useauth context

const auth = getAuth(app); // app from firebase

type AuthProviderProps = {
	children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const authInfo: AuthContextType = {
		user,
		loading,
	};

	return (
		<AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;
