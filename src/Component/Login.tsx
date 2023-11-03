import Swal from "sweetalert2";
import { AuthContextType } from "../Provider/Provider";
import useAuthHook from "../Hook/useAuthHook";

const Login = () => {
	const { user, googleSignIn, logOut, loading }: AuthContextType =
		useAuthHook();
	const handleGoogle = () => {
		//google login and show swwet allert
		googleSignIn()
			.then((result) => {
				Swal.fire({
					title: `${result.user.displayName} Login Successful`,
					showClass: {
						popup: "animate__animated animate__fadeInDown",
					},
					hideClass: {
						popup: "animate__animated animate__fadeOutUp",
					},
				});
			})
			.catch((error) => {
				console.error(error);
			});
	};
	//google logout and show sweet alert
	const handleLogout = () => {
		logOut()
			.then(() => {
				Swal.fire("Logout Successful");
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		//entire time show loading
		<div>
			{loading ? (
				<p>Loading...</p>
			) : user ? (
				<div>
					<div className="avatar online">
						<div className="w-24 rounded-full">
							<img src={user.photoURL} alt="User Avatar" />
						</div>
					</div>
					<button className="btn" onClick={handleLogout}>
						Logout
					</button>
				</div>
			) : (
				<div>
					<button onClick={handleGoogle}>Login with Google</button>
				</div>
			)}
		</div>
	);
};
export default Login;
