import { Route, Routes } from "react-router-dom"
import { Home } from "../components/screens/Home/Home"
import { Admin } from "../components/screens/Admin/Admin"

export const AppRouter = () => {



  return (
    <Routes>
      
        <Route path="/" element= { <Home/>}>
        </Route>
        <Route path="/admin" element={<Admin />}>
        </Route>

    </Routes>
  )
}