import { useState } from "react"
import env from "../env"
import WaitingBtn from "../components/Button/waitingBtn";
import Cookies from 'universal-cookie';
import errortrans from "../translate/error";
const cookies = new Cookies();

function Register(props){
    const access = props.access
    const [regElement,setRegElement] = useState('')
    const [error,setError] = useState({message:'',color:"brown"})
    
    const lang = props.lang&&props.lang
    const [showPass,setShowPass] = useState(0)
    const RegisterNow=()=>{
        const token=cookies.get(env.cookieName)
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify(
                {access:access,...regElement,
                username:regElement.email})
          }
          //console.log(postOptions)
        fetch(env.siteApi + "/auth/register",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            if(result.error){
                setError({message:result.error,color:"brown"})
                setTimeout(()=>setError({message:'',color:"brown"}),3000)
            }
            else{
                setError({message:result.message,color:"green"})
                setTimeout(()=>window.location.reload(),1000)
            }
            
        },
        (error) => {
            console.log(error)
        })
    }
    return(
        <div className="form-fiin form-box-style">
            <div className="section-head">
                <h1 className="section-title">{errortrans.clientRegister[lang]}</h1>
                <p className="hidden">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt .</p>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-field-fiin">
                        <label htmlFor="first-name">{errortrans.fName[lang]}<sup>*</sup></label>
                        <input type="text" name="firstname" id="first-name" 
                            placeholder={errortrans.fName[lang]} required
                        onChange={(e)=>setRegElement(data => ({
                            ...data,
                            ...{cName:e.target.value}
                          }))}/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-field-fiin">
                        <label htmlFor="last-name">{errortrans.sName[lang]}<sup>*</sup></label>
                        <input type="text" name="lastname" id="last-name" 
                            placeholder={errortrans.sName[lang]} required
                        onChange={(e)=>setRegElement(data => ({
                            ...data,
                            ...{sName:e.target.value}
                          }))}/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-field-fiin">
                        <label htmlFor="telefone">{errortrans.mobile[lang]}<sup>*</sup></label>
                        <input type="tel" name="telefone" id="telefone" 
                        placeholder={errortrans.mobile[lang]} required
                        onChange={(e)=>setRegElement(data => ({
                            ...data,
                            ...{phone:e.target.value}
                          }))}/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-field-fiin">
                        <label htmlFor="email">{errortrans.email[lang]}</label>
                        <input type="email" name="email" id="email" 
                        placeholder={errortrans.email[lang]}
                        onChange={(e)=>setRegElement(data => ({
                            ...data,
                            ...{email:e.target.value}
                          }))}/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-field-fiin">
                        <label htmlFor="nif">{errortrans.meliCode[lang]}</label>
                        <input type="text" name="nif" id="nif" 
                            placeholder={errortrans.meliCode[lang]}
                        onChange={(e)=>setRegElement(data => ({
                            ...data,
                            ...{nif:e.target.value}
                          }))}/>
                    </div>
                </div>
                {props.showpass?<div className="col-md-6">
                    <div className="form-field-fiin">
                        <label htmlFor="password">{errortrans.password[lang]}<sup>*</sup></label>
                        <input type={showPass?"input":"password"} name="password" 
                            id="password" placeholder={errortrans.password[lang]} required
                        onChange={(e)=>setRegElement(data => ({
                            ...data,
                            ...{password:e.target.value}
                          }))}/>
                        <span className="icon-password icon-pass"
                        onClick={()=>showPass?setShowPass(0):setShowPass(1)}></span>
                    </div>
                </div>:<></>}
            </div>
            <div className="footer-form-fiin">
                <WaitingBtn class="btn-fiin" title={errortrans.register[lang]} 
                    waiting={errortrans.register[lang]}
                    function={RegisterNow} name="submit" error={error}/> 
            </div>
            <small className="errorSmall" style={{color:error.color}}>
                {error.message}</small>
        </div>
    )
}
export default Register