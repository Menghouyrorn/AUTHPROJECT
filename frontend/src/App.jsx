
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Signin from "./pages/Signin"
import SignUp from "./pages/SignUp"
import Profile from "./pages/Profile"

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/sign-in" element={<Signin/>}/>
          <Route path="/sign-up" element={<SignUp/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
