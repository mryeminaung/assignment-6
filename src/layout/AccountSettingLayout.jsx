import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const AccountSettingLayout = () => {
	const navigate = useNavigate();
	const { setAuthUser } = useAuthContext();

	return (
		<div className="mt-10">
			<h2 className="text-4xl text-center font-semibold">Account Setting</h2>
			<div className="box my-10 w-full md:w-[80%] mx-auto rounded-lg flex p-3">
				<div className="w-1/4 border-e-2 border-red-500 p-2">
					<div className="flex flex-col text-xl space-y-2">
						<NavLink to="edit-profile">Edit Profile</NavLink>
						<NavLink to="change-password">Password</NavLink>
					</div>
					<hr className="bg-red-500 h-0.5 my-2" />
					<button
						onClick={() => {
							navigate("/");
							setAuthUser("");
						}}
						className="text-red-500"
					>
						Logout
					</button>
				</div>
				<div className="w-3/4 p-2">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default AccountSettingLayout;
