import axios from "axios";
import SignUp from "./pages/SignUpPage"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignInPage";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { userState } from "./atom/userAtom";
import AllPosts from "./pages/AllPostsPage";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

function App() {
  const [userData, setUserData] = useRecoilState(userState)
  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, [setUserData]);
  
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/posts" element={<AllPosts/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
