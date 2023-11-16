import Cookies from "js-cookie"
import { useRouter } from "next/router"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

interface PropType {
  children: React.ReactNode
}

export default function Layout(props: PropType) {
  return (
    <>
      <div className="flex min-h-screen flex-col justify-between">
        <header>

        </header>
        <main>
          <ToastContainer />
          {props.children}
        </main>
        <footer>
          <span>&copy; 25V Solutions</span>
        </footer>
      </div>
    </>
  )
}
