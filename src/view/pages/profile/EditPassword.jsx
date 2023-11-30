import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";

const EditPassword = () => {
	const navigate = useNavigate();
	const { loggedInUser } = useAuthContext();
	const [editPassword, setEditPassword] = useState({
		old_pwd: "",
		new_pwd: "",
	});

	const handlePassword = (e) => {
		const { name, value } = e.target;
		setEditPassword((prePwd) => ({ ...prePwd, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const { old_pwd, new_pwd } = editPassword;
		if (loggedInUser.password === old_pwd && new_pwd) {
			axios.patch(`http://localhost:3000/users/${loggedInUser.id}`, {
				password: new_pwd,
			});
			navigate("/");
		}
	};

	return (
		<div>
			<form className="space-y-4" autoComplete="off" onSubmit={handleSubmit}>
				{/* old password field */}
				<div>
					<label htmlFor="old_pwd" className="font-semibold block">
						Old Password
					</label>
					<input
						type="password"
						name="old_pwd"
						id="old_pwd"
						value={editPassword.old_pwd}
						onChange={handlePassword}
						className="w-full border-b-2 focus:outline-none border-b-red-500 px-2 py-1 rounded-md"
					/>
				</div>
				{/* new password field */}
				<div>
					<label htmlFor="new_pwd" className="font-semibold block">
						New Password
					</label>
					<input
						type="password"
						name="new_pwd"
						id="new_pwd"
						value={editPassword.new_pwd}
						onChange={handlePassword}
						className="w-full border-b-2 focus:outline-none border-b-red-500 px-2 py-1 rounded-md"
					/>
				</div>
				<div className="flex justify-end">
					<button className="btn">Change Password</button>
				</div>
			</form>
		</div>
	);
};

export default EditPassword;
