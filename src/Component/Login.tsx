import Swal from "sweetalert2";
import useAuthHook from "../Hook/useAuthHook";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
	const { user, googleSignIn, logOut, loading } = useAuthHook();

	const handleGoogle = () => {
		//google login and show swwet allert
		googleSignIn()
			.then((user) => {
				if (user) {
					Swal.fire({
						title: `${user.displayName} Login Successful`,
						showClass: {
							popup: "animate__animated animate__fadeInDown",
						},
						hideClass: {
							popup: "animate__animated animate__fadeOutUp",
						},
					});
				}
			})
			.catch((error: string) => {
				console.error(error);
			});
	};
	//google logout and show sweet alert
	const handleLogout = () => {
		logOut()
			.then(() => {
				Swal.fire("Logout Successful");
			})
			.catch((error: string) => {
				console.error(error);
			});
	};

	return (
		//entire time show loading
		<div>
			{loading ? (
				<p>Loading...</p>
			) : user ? (
				<div className="flex justify-center items-center flex-col">
					<div className="avatar online">
						<div className="w-12 rounded-full">
							<img src={user.photoURL!} alt="User Avatar" />
						</div>
					</div>
					<button
						className="btn btn-sm btn-error btn-outline"
						onClick={handleLogout}
					>
						Logout
					</button>
				</div>
			) : (
				<div>
					<button
						onClick={handleGoogle}
						className="btn btn-square btn-success btn-outline  text-xs flex items-center justify-center"
					>
						<FcGoogle className="text-4xl" />
					</button>
				</div>
			)}
		</div>
	);
};
export default Login;
