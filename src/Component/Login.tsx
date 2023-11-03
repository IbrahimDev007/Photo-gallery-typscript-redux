const Login = () => {
	const login = () => console.log("login----");
	const loading = true;
	const user = true;

	return (
		<div>
			{/* //entire time show loading */}
			<div>
				{loading ? (
					<p>Loading...</p>
				) : user ? (
					<div>
						<div className="avatar online">
							<div className="w-24 rounded-full">
								<img src={""} alt="User Avatar" />
							</div>
						</div>
						<button className="btn" onClick={login}>
							Logout
						</button>
					</div>
				) : (
					<div>
						<button onClick={() => login}>Login with Google</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Login;
