import Breadcrumb from "../../components/BreadCrumb"
import errortrans from "../../translate/error"
import Register from "../Register"

const RegClient = (props)=>{
    const lang = props.lang&&props.lang.lang
    return(
        <div className="container">
        <Breadcrumb title={errortrans.clientRegister[lang]}/>

        <div className="section-fiin registo-de-cliente">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <Register access={"customer"} lang={lang} title="cliente"/>
                </div>
            </div>
        </div>
    </div>
    )
}
export default RegClient