import { Outlet } from "react-router"
import Header from "../components/layouts/Header"
import Footer from "../components/layouts/Footer"

const RootLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default RootLayout
