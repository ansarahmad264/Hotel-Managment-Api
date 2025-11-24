import { Route, Routes } from "react-router-dom"
import SignupPage from "./pages/signup"
import SignInPage from "./pages/signin"

function App() {

  return (
      <Routes>
        <Route path="/" index element={<SignInPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
  )
}

export default App
