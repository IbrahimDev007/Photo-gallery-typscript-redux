import { createContext, useEffect, useState, ReactNode } from "react";
import {
	GoogleAuthProvider,
	User,
	getAuth,
	onAuthStateChanged,
	signInWithPopup,
	signOut,
	updateProfile,
} from "firebase/auth";
import { app } from "../Firebase/firebase.config";

export type AuthContextType = {
	user: User | null;
	loading: boolean;
	googleSignIn: () => Promise<void>;
	logOut: () => Promise<void>;
	updateUserProfile: (name: string, photo: string) => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null); //export auth context to use everywher by useauth context

const auth = getAuth(app); // app from firebase

type AuthProviderProps = {
	children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	//provide google

	const googleProvider = new GoogleAuthProvider();
	//google promise for login by firebase
	const googleSignIn = () => {
		setLoading(true);
		return signInWithPopup(auth, googleProvider);
	};
	//google promise for logout by firebase
	const logOut = () => {
		setLoading(false);
		setUser(null);
		return signOut(auth);
	};
	// update profile for data future uses and store firebase
	const updateUserProfile = (name: string, photo: string) => {
		return updateProfile(auth.currentUser, {
			displayName: name,
			photoURL: photo,
			role: "user",
		});
	};
	//midalware firebase authstate change
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			console.log("current user", currentUser, currentUser?.email);
		});

		return () => {
			unsubscribe();
		};
	}, []);
	//authinfo  data to pass provider
	const authInfo: AuthContextType = {
		user,
		loading,
		googleSignIn,
		logOut,
		updateUserProfile,
	};

	return (
		<AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;
