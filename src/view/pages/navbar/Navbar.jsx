import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";

const Navbar = () => {
	const navigate = useNavigate();
	const { authUser, setAuthUser } = useAuthContext();

	return (
		<div className="bg-slate-100">
			<nav className="container px-5 mx-auto py-3 flex items-center justify-between">
				<header>
					<h1 className="text-2xl font-semibold -tracking-tighter">
						<a href="/">Assignment Six</a>
					</h1>
				</header>
				<div className="space-x-3 font-bold">
					<NavLink to="/">Home</NavLink>
					<NavLink to="/posts">All Posts</NavLink>
				</div>
				<div className="space-x-2">
					{authUser ? (
						<>
							<NavLink to="/account-setting/edit-profile">Account Setting</NavLink>
							<NavLink to="/create-post">New Post</NavLink>
							<button
								onClick={() => {
									setAuthUser("");
									navigate("/");
								}}
								className="btn"
							>
								Logout
							</button>
						</>
					) : (
						<>
							<NavLink to="/register" className="btn">
								Register
							</NavLink>
							<NavLink to="/login" className="btn">
								Login
							</NavLink>
						</>
					)}
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
