import Header from '../components/layouts/Header'
import { Outlet } from 'react-router'

const AuthLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default AuthLayout
