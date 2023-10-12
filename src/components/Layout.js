import env from "../env";
import Footer from "./Footer"
import Header from "./Header"
const lang = JSON.parse(localStorage.getItem(env.cookieLang));

function Layout(props){
    
    return(
        <>
            <Header lang={lang}/>
            {props.children}
            <Footer />
        </>
    )
}
export default Layout