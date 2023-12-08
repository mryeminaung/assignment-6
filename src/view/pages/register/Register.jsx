import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		phone_no: "",
		password: "",
		profile_url: "",
	});

	useEffect(() => {
		document.title = "Sign up";
	}, []);

	const handleFormData = (e) => {
		const { name, value } = e.target;
		setFormData((preFormData) => ({ ...preFormData, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const { username, email, phone_no, password, profile_url } = formData;

		if (username && email && phone_no && password && profile_url) {
			axios.post("http://localhost:3000/users", { ...formData, registration_date: "" });
			setFormData({
				username: "",
				email: "",
				phone_no: "",
				password: "",
				profile_url: "",
			});
			navigate("/login");
		}
	};

	return (
		<div className="flex items-center justify-center mt-10">
			<form
				className="w-[550px] border border-red-500 rounded-md p-5 py-7 space-y-4"
				autoComplete="off"
				onSubmit={handleSubmit}
			>
				<h3 className="font-bold text-2xl text-center">Registration Form</h3>
				{/* username field */}
				<div className="">
					<label htmlFor="username" className="font-semibold block">
						Username
					</label>
					<input
						type="text"
						name="username"
						id="username"
						value={formData.username}
						onChange={handleFormData}
						className="w-full border-b-2 focus:outline-none border-b-red-500 px-2 py-1 rounded-md"
					/>
				</div>
				{/* email field */}
				<div className="">
					<label htmlFor="email" className="font-semibold block">
						Email
					</label>
					<input
						type="email"
						name="email"
						id="email"
						value={formData.email}
						onChange={handleFormData}
						className="w-full border-b-2 focus:outline-none border-b-red-500 px-2 py-1 rounded-md"
					/>
				</div>
				{/* phone number field */}
				<div className="">
					<label htmlFor="phone_no" className="font-semibold block">
						Phone Number
					</label>
					<input
						type="tel"
						name="phone_no"
						id="phone_no"
						value={formData.phone_no}
						onChange={handleFormData}
						className="w-full border-b-2 focus:outline-none border-b-red-500 px-2 py-1 rounded-md"
					/>
				</div>
				{/* profile url field */}
				<div>
					<label htmlFor="profile_url" className="font-semibold block">
						Profile URL
					</label>
					<input
						type="url"
						name="profile_url"
						id="profile_url"
						value={formData.profile_url}
						onChange={handleFormData}
						className="w-full border-b-2 focus:outline-none border-b-red-500 px-2 py-1 rounded-md"
					/>
				</div>
				{/* password field */}
				<div className="">
					<label htmlFor="password" className="font-semibold block">
						Password
					</label>
					<input
						type="password"
						name="password"
						id="password"
						value={formData.password}
						onChange={handleFormData}
						className="w-full border-b-2 focus:outline-none border-b-red-500 px-2 py-1 rounded-md"
					/>
				</div>
				<div className="">
					<button
						type="submit"
						className="bg-black w-full block mx-auto text-white px-2 py-2 rounded-md"
					>
						Sign Up
					</button>
				</div>
			</form>
		</div>
	);
};

export default Register;
