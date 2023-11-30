import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";

// layouts
import RootLayout from "./layout/RootLayout";
import PostLayout from "./layout/PostLayout";

// pages
import Home from "./view/pages/home/Home";
import Login from "./view/pages/login/Login";
import Register from "./view/pages/register/Register";

// posts and post detail pages
import Posts from "./view/pages/post/Posts";
import PostDetail from "./view/pages/post/PostDetail";
import CreatePost from "./view/pages/post/tasks/CreatePost";
import EditProfile from "./view/pages/profile/EditProfile";
import EditPassword from "./view/pages/profile/EditPassword";
import AccountSettingLayout from "./layout/AccountSettingLayout";

const App = () => {
	return (
		<AuthContextProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<RootLayout />}>
						<Route index element={<Home />} />

						<Route path="account-setting" element={<AccountSettingLayout />}>
							<Route path="edit-profile" element={<EditProfile />} />
							<Route path="change-password" element={<EditPassword />} />
						</Route>

						<Route path="login" element={<Login />} />
						<Route path="register" element={<Register />} />
						<Route path="create-post" element={<CreatePost />} />

						<Route path="posts" element={<PostLayout />}>
							<Route index element={<Posts />} />
							<Route path="post-detail/:postId" element={<PostDetail />} />
						</Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</AuthContextProvider>
	);
};

export default App;
