import Navbar from "./components/layout/Navbar"
import Home from "./components/pages/Home"
export default function App(){
  return(
    <>
      <section className="relative w-full h-[2500px] ">
        <Navbar/>
        <Home/>
      </section>
    </>
  )
}