import { useState } from "react"
import Paging from "../../components/Paging"
import errortrans from "../../translate/error"

function ClientListTable(props){
    const usersList = props.users&&props.users.user
    const lang = props.lang&&props.lang
    return(<>
        <table>
            <thead>
                <tr>
                    <th width="7.5%">{errortrans.fName[lang]}</th>
                    <th width="7.5%">{errortrans.sName[lang]}</th>
                    <th width="10%">{errortrans.meliCode[lang]}</th>
                    <th width="10%">{errortrans.email[lang]}</th>
                    <th width="10%">{errortrans.mobile[lang]}</th>
                    {props.access>4?<><th width="7.5%">Nome (Cons)</th>
                    <th width="7.5%">Apelido (Cons)</th>
                    <th width="10%">NIF (Cons)</th></>:<></>}
                    <th width="10%">Status</th>
                    <th width="5%">Status</th>
                </tr>
            </thead>
            <tbody>
                {usersList?usersList.map((user,i)=>(
                <tr key={i} style={{backgroundColor:
                    user.password?"lightGreen":
                    (user.active?"lightpink":"")}}>
                    <td>{user.cName}</td>
                    <td>{user.sName}</td>
                    <td>{user.nif}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    {props.access>4?<>
                    <td>{user.agentDetail.length?
                    user.agentDetail[0].cName:''}</td>
                    <td>{user.agentDetail.length?
                    user.agentDetail[0].sName:''}</td>
                    <td>{user.agentDetail.length?
                    user.agentDetail[0].nif:''}</td></>:<></>}
                    <td>{user.password?"Confirmado":
                    (user.active?"Password alterada":"Mail Pendente")}</td>
                    <td><a href={"/profile/"+user._id}>Editar</a></td>
                </tr>)):
                <tr><td>Waiting</td></tr>}
                
            </tbody>
        </table>
        <Paging size={props.users&&props.users.size} 
            setPageNumber={props.setPageNumber} 
            pageNumber={props.pageNumber} perPage={5}
            setDoFilter={props.setDoFilter}/>
            
        </>
        
    )
}
export default ClientListTable