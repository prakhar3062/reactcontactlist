import {Link} from 'react-router-dom';
import React from "react";
import user from "./images/user.png"
const ContactCard=(props)=>{
  //console.log(props.contact);
  const {id,name,email}=props.contact; 
   //console.log(name);
 return(

    <div className="item">
      <img className="ui avatar image" src={user} alt="user"/>
      <div className="content">
          <Link to={{ pathname:`/contact/${id}`,state:{contact:props.contact}}}>
            <div className="header">{name}</div>
            <div className="description">{email}</div>
          </Link>
      </div>
      <i className="trash alternate outline icon" 
        style={{ color:"red", marginTop:"7px",marginLeft:"10px"}} onClick={()=>props.clickHander(id)}>
      </i>
      <Link to={{ pathname:`/edit`,state:{contact:props.contact}}}> 
       <i className="edit alternate outline icon" 
          style={{ color:"blue",marginTop:"7px" }} >
       </i> 
      </Link>   
    </div>
 );
};
export default ContactCard;