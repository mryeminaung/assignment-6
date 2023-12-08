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
import UserProfile from "./view/pages/profile/UserProfile";
import FeaturedPosts from "./view/pages/post/FeaturedPosts";
import FeaturedPostDetail from "./view/pages/post/FeaturedPostDetail";
import ProtectedRoute from "./protected-routes/ProtectedRoute";

const App = () => {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />

            <Route
              path="account-setting"
              element={
                <ProtectedRoute>
                  <AccountSettingLayout />
                </ProtectedRoute>
              }
            >
              <Route
                path="edit-profile"
                element={
                  <ProtectedRoute>
                    <EditProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="change-password"
                element={
                  <ProtectedRoute>
                    <EditPassword />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route
              path="account-setting/user-profile"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />

            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="create-post" element={<CreatePost />} />

            <Route path="posts" element={<PostLayout />}>
              <Route index element={<Posts />} />
              <Route path="post-detail/:postId" element={<PostDetail />} />
            </Route>

            <Route path="featured-posts" element={<PostLayout />}>
              <Route index element={<FeaturedPosts />} />
              <Route path=":postId" element={<FeaturedPostDetail />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
};

export default App;
