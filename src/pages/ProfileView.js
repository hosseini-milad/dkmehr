import { useEffect, useState } from "react"
import Breadcrumb from "../components/BreadCrumb"
import Cookies from 'universal-cookie';
import env from "../env";
import errortrans from "../translate/error";
const cookies = new Cookies();

function ProfileView(props){
    const [users,setUsers] = useState()
    const [error,setError] = useState({message:'',color:"brown"})
    
    const token=cookies.get(env.cookieName)
    const lang = props.lang&&props.lang.lang
    const disableState = token.access==="manager"?false:true;
    useEffect(()=>{
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId}
          }
        //console.log(postOptions)
        fetch(env.siteApi + "/auth/find-users",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            setUsers(result.user)
        },
        (error) => {
            console.log(error)
        })
    },[])
    const saveData=()=>{
        const token=cookies.get(env.cookieName)
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify(users)
          }
        //console.log(postOptions)
        fetch(env.siteApi + "/auth/change-user",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            if(result.error){
                setError({message:result.error,color:"brown"})
            setTimeout(()=>setError({message:'',color:"brown"}),3000)
            }
            else{
                setError({message:result.message,color:"green"})
                setTimeout(()=>setError({message:'',color:"brown"}),3000)
            }
        },
        (error) => {
            setError({message:"error",color:"brown"})
            setTimeout(()=>setError({message:'',color:"brown"}),3000)
        })
    }
    return(
        <div className="container">
        <Breadcrumb title={errortrans.editProfile[lang]}/>
        
        <div className="section-fiin dados-do-consultor">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="form-fiin form-box-style">
                        <div className="section-head">
                            <h1 className="section-title">{errortrans.editProfile[lang]} <span>{token?token.access:''}</span></h1>
                            {token&&token.access==="agency"?
                            <><p>Dados do parceiro</p><hr/></>:<></>}
                        </div>
                        {/*Comercial Profile*/}
                        {token&&token.access==="agency"?<><div className="row">
                            <div className="col-md-6">
                                <div className="form-field-fiin">
                                    <label htmlFor="Nome-Comercial">Nome Comercial</label>
                                    <input type="text" name="Nome-Comercial" id="Nome-Comercial" value={users&&users.nameCompany}
                                     disabled={disableState}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-field-fiin">
                                    <label htmlFor="Firma">Firma</label>
                                    <input type="text" name="Firma" id="Firma" value={users&&users.firma}
                                     disabled={disableState}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-field-fiin">
                                    <label htmlFor="nif">NIF Comercial</label>
                                    <input type="text" name="nif" id="nif" value={users&&users.nifCompany}
                                     disabled={disableState}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-field-fiin">
                                    <label htmlFor="Morada">Morada</label>
                                    <input type="text" name="Morada" id="Morada" value={users&&users.morada}
                                     disabled={disableState}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-field-fiin">
                                    <label htmlFor="telefoneCompany">Telefone Comercial</label>
                                    <input type="tel" name="telefoneCompany" id="telefoneCompany" value={users&&users.phoneCompany}
                                     disabled={disableState}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-field-fiin">
                                    <label htmlFor="emailCompany">E-main Comercial</label>
                                    <input type="email" name="emailCompany" id="emailCompany" value={users&&users.emailCompany}
                                     disabled={disableState}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-field-fiin">
                                    <label htmlFor="IBAN">IBAN</label>
                                    <input type="text" name="IBAN" id="IBAN" value={users&&users.IBANCompany}
                                     disabled={disableState}/>
                                </div>
                            </div>
                        </div>
                        <div className="section-head">
                            <p >Administrador da parceria</p>
                            <hr/>
                        </div></>:<></>}
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-field-fiin">
                                    <label htmlFor="first-name">{errortrans.fName[lang]}</label>
                                    <input type="text" name="firstname" id="first-name" 
                                    value={users&&users.cName} disabled={disableState}
                                    onChange={(e)=>setUsers(data => ({
                                        ...data,
                                        ...{cName:e.target.value}
                                      }))}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-field-fiin">
                                    <label htmlFor="last-name">{errortrans.sName[lang]}</label>
                                    <input type="text" name="lastname" id="last-name" 
                                    value={users&&users.sName} disabled={disableState}
                                    onChange={(e)=>setUsers(data => ({
                                        ...data,
                                        ...{sName:e.target.value}
                                      }))}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-field-fiin">
                                    <label htmlFor="nif">{errortrans.meliCode[lang]}</label>
                                    <input type="text" name="nif" id="nif" 
                                    value={users&&users.nif} disabled={disableState}
                                    onChange={(e)=>setUsers(data => ({
                                        ...data,
                                        ...{nif:e.target.value}
                                      }))}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-field-fiin">
                                    <label htmlFor="email">{errortrans.email[lang]}</label>
                                    <input type="email" name="email" id="email" 
                                    value={users&&users.email} disabled={disableState}
                                    onChange={(e)=>setUsers(data => ({
                                        ...data,
                                        ...{email:e.target.value}
                                      }))}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-field-fiin">
                                    <label htmlFor="telefone">{errortrans.mobile[lang]}</label>
                                    <input type="tel" name="telefone" id="telefone" 
                                    value={users&&users.phone} disabled={disableState}
                                    onChange={(e)=>setUsers(data => ({
                                        ...data,
                                        ...{phone:e.target.value}
                                      }))}/>
                                </div>
                            </div>
                        </div>
                        <div className="footer-form-fiin">
                            <button type="submit" className={token.access==="manager"?"btn-fiin":"btn-fiin hidden"}
                            name="submit" onClick={saveData}
                            >{errortrans.save[lang]}</button>
                        </div>
                        <small className="errorSmall" style={{color:error.color}}>
                            {error.message}</small>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
export default ProfileView