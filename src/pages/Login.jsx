import {SignIn} from "@clerk/clerk-react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
export default function Login() {
    return(
        <>
        <Navbar></Navbar>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            <SignIn />
        </div>
        <Footer></Footer>
        </>

    )
}