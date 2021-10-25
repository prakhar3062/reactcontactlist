import React,{useRef} from "react";
import ContactCard from './ContactCard';
import {Link} from 'react-router-dom';
const ContactList=(props)=>{
    
    //console.log(props);
    const inputE1=useRef("");
    const deleteContactHandler=(id)=>{
        props.getContactId(id);
    };
    const renderContactList=props.contacts.map((contact)=>{
        return (
            <div >
                <ContactCard contact={contact} clickHander={deleteContactHandler} key={contact.id}/>
            </div>
        );
    });
    const getSearchTerm=()=>{
        //console.log(inputE1.current.value);
        props.searchKeyword(inputE1.current.value);
    };
    return ( 
        <div className="main">
            <h2>Contact list
              <Link to="/add">
                  <button className="ui button blue right">Add Contact</button>
              </Link>   
            </h2>
            <div className="ui search">
                <div className="ui icon input">
                    <input 
                      ref={inputE1}
                      type="text" placeholder="Search Contacts" className="prompt" value={props.term} onChange={getSearchTerm}/> 
                      <i className="search icon"></i>
                </div>
            </div>
            <div className="ui celled list">{renderContactList}</div>
        </div>
              );
};
export default ContactList;