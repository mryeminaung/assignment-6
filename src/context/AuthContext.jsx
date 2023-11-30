import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [loggedInUser, setLoggedInUser] = useState([]);
	const [authUser, setAuthUser] = useState(localStorage.getItem("authUser") || "");

	useEffect(() => {
		localStorage.setItem("authUser", authUser);
		axios.get("http://localhost:3000/users").then((res) => {
			const loginInfo = res.data.find((user) => user.username === authUser);
			setLoggedInUser(loginInfo);
		});
	}, [authUser]);

	return (
		<AuthContext.Provider
			value={{ loggedInUser, setLoggedInUser, authUser, setAuthUser }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthContext = () => {
	return useContext(AuthContext);
};

export default AuthContext;
