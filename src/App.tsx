import axios from "axios";
import SignUp from "./pages/SignUpPage";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import SignIn from "./pages/SignInPage";
import { RecoilRoot } from "recoil";
import { ReactNode, useContext } from "react";
import AllPosts from "./pages/AllPostsPage";
import MyPosts from "./pages/MyPostsPage";
import UserContext, { UserProvider } from "./context/userContext";
import NewPost from "./pages/NewPostPage";
import EditPost from "./pages/EditPostPage";
import TagsPage from "./pages/TagsPage";
import CategoriesPage from "./pages/CategoriesPage";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

function App() {

  return (
    <>
      <UserProvider>
        <RecoilRoot>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to={"/sign-in"} />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route
                path="/posts"
                element={
                  <ProtectedRouterGuard>
                    <AllPosts />
                  </ProtectedRouterGuard>
                }
              />
              <Route
                path="/posts/:postId"
                element={
                  <ProtectedRouterGuard>
                    <EditPost />
                  </ProtectedRouterGuard>
                }
              />
              <Route
                path="/new-post"
                element={
                  <ProtectedRouterGuard>
                    <NewPost />
                  </ProtectedRouterGuard>
                }
              />
              <Route
                path="/tags"
                element={
                  <ProtectedRouterGuard>
                    <TagsPage />
                  </ProtectedRouterGuard>
                }
              />
                <Route
                path="/categories"
                element={
                  <ProtectedRouterGuard>
                    <CategoriesPage />
                  </ProtectedRouterGuard>
                }
              />

              <Route
                path="/posts/user"
                element={
                  <ProtectedRouterGuard>
                    <MyPosts />
                  </ProtectedRouterGuard>
                }
              />
            </Routes>
          </BrowserRouter>
        </RecoilRoot>
      </UserProvider>
    </>
  );
}

export default App;

function ProtectedRouterGuard({ children }: { children: ReactNode }) {
  const { userData } = useContext(UserContext);
  console.log(userData);
  if (!userData.token) {
    return <Navigate to="/sign-in" />;
  }
  return <>{children}</>;
}
