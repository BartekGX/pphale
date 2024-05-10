// import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Landingbar from "@/components/landingbar";

export default function Layout({ children }) {
    return (
        <div className="flex flex-col max-w-screen-2xl mx-auto">
            {/*<Navigation/>*/}
            <Landingbar/>
            <div className="w-full z-20">
                {children}
            </div>
            <Footer/>
        </div>
    )
}