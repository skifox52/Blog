import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom"
import { Layout } from "./layout/Layout"
import { Login } from "./pages/Login"
import { ToastContainer } from "react-toastify"
import "react-toastify/ReactToastify.css"
import { Home } from "./pages/Home"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<Navigate to={"/"} />} />
    </Route>
  )
)

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  )
}

export default App
