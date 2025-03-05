import { useNavigate } from "react-router-dom"
export default function Navbar() {
  const navigate = useNavigate()


  return <> <div className="flex justify-center items-center h-16 w-full bg-red-50 fixed top-0 ">
    <button onClick={(e) => {
      localStorage.clear()
      navigate("/")
    }}>logout</button>
  </div>

    <div className="flex justify-center items-center h-16 w-full bg-red-50 "></div>
  </>
}