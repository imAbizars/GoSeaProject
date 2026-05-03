import Navbar from "./components/layout/Navbar"
import Home from "./pages/Home"
export default function App(){
  return(
    <>
      <section className="relative w-full h-[1000px] bg-background">
        <Navbar/>
        <Home/>
      </section>
    </>
  )
}