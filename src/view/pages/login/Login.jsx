import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";
import axios from "axios";

const Login = () => {
	const navigate = useNavigate();
	const { setAuthUser, setLoggedInUser } = useAuthContext();
	const [loginData, setLoginData] = useState({ login_name: "", login_pwd: "" });

	useEffect(() => {
		document.title = "Login";
	}, []);

	const handleLoginData = (e) => {
		const { name, value } = e.target;
		setLoginData((preLoginData) => ({ ...preLoginData, [name]: value }));
	};

	const handleLogin = (e) => {
		e.preventDefault();
		axios.get("http://localhost:3000/users").then((res) => {
			const { login_name, login_pwd } = loginData;
			const user = res.data.find(
				(user) => user.email === login_name || user.phone_no === login_name,
			);
			if (user) {
				if (
					(user.email === login_name || user.phone_no === login_name) &&
					user.password === login_pwd
				) {
					setLoggedInUser(user);
					setAuthUser(user.username);
					navigate("/");
				}
			}
		});
	};

	return (
		<div className="flex flex-col items-center justify-center mt-10 gap-y-3">
			<form
				className="w-[550px] border border-red-500 rounded-md p-5 py-7 space-y-4"
				autoComplete="off"
				onSubmit={handleLogin}
			>
				<h3 className="font-bold text-2xl text-center">Login Form</h3>
				{/* login name field */}
				<div className="">
					<label htmlFor="login-name" className="font-semibold block">
						Email or Phone Number
					</label>
					<input
						type="text"
						name="login_name"
						id="login_name"
						className="w-full border-b-2 focus:outline-none border-b-red-500 px-2 py-1 rounded-md"
						value={loginData.login_name}
						onChange={handleLoginData}
					/>
				</div>
				{/* login password field */}
				<div className="">
					<label htmlFor="login-pwd" className="font-semibold block">
						Password
					</label>
					<input
						type="password"
						name="login_pwd"
						id="login_pwd"
						className="w-full border-b-2 focus:outline-none border-b-red-500 px-2 py-1 rounded-md"
						value={loginData.login_pwd}
						onChange={handleLoginData}
					/>
				</div>
				<div>
					<button
						type="submit"
						className="bg-black w-full block mx-auto text-white px-2 py-2 rounded-md"
					>
						Sign In
					</button>
				</div>
			</form>
			<p className="">
				If you don't have an account,
				<Link to="/register" className="text-blue-500 px-2 font-semibold">
					Sign Up
				</Link>
			</p>
		</div>
	);
};

export default Login;
