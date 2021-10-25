import './App.css';
import React,{useState,useEffect } from "react";
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import {uuid} from 'uuidv4';
import api from './api/contact';
import Header from "./Header";
import AddContact from"./AddContact";
import ContactList from './ContactList';
import ContactDetail from './ContactDetail';
import EditContact from './EditContent';
import contact from './api/contact';
function App() {
  const LOCAL_STORAGE_KEY="contacts";
  const[contacts,setContacts]=useState([]);
  const [searchTerm,setSearchTerm]=useState("");
  const [searchResults,setSearchResults]=useState([]);
  //RetrieveContacts
  const retriveContacts=async()=>{
    const response=await api.get("/contacts");
    return response.data;
  }

  const addContactHandler=async (contact)=>{
    //console.log(contact);
    const request={
      id:uuid(),
      ...contact
    }
    const response =await api.post("/contacts",request)
    setContacts([...contacts,response.data]);
  }
  const updateContactHandler=async(contact)=>{
    const response=await api.put(`/contacts/${contact.id}`,contact);
    const{id,name,email}=response.data
   // console.log(response.data);
    setContacts(
      contacts.map(contact=>{
      return contact.id===id?{...response.data}:contact;
     })
    );
  };
  const removeContactHandler=async (id)=>{
    await api.delete(`/contacts/${id}`);
    const newContactList=contacts.filter((contact)=>{
      return contact.id!==id;
    });
    setContacts(newContactList);
  }
  const searchHandler=(searchTerm)=>{
    console.log(searchTerm);
    setSearchTerm(searchTerm);
    if(searchTerm !== ""){
      const newContactList=contacts.filter((contact)=>{
         console.log( Object.values(contact).join(" ").toLowerCase());
        return Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    }
    else{
      setSearchResults(contacts);
    }
  };
  useEffect(()=>{
    //const retriveContacts=JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    //if(retriveContacts) setContacts(retriveContacts);
    const getAllContacts=async()=>{
      const AllContacts=await retriveContacts();
      if(AllContacts) setContacts(AllContacts);
    };

    getAllContacts();
  },[]);
  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(contacts));
  },[contacts]);
  return (
    <div >
     <Router>
     <Header/> 
     <Switch>
     <Route path="/" 
      exact render={(props)=>(
        <ContactList 
         {...props} 
         contacts={searchTerm.length<1 ? contacts:searchResults} 
         getContactId={removeContactHandler}
         term={searchTerm}
         searchKeyword={searchHandler}
        />
      )}
     />  
     <Route path="/add"  render={(props)=><AddContact {...props} addContactHandler={addContactHandler}/>}/>
     <Route path="/contact/:id" component={ContactDetail}/>
     <Route path="/edit"  render={(props)=><EditContact {...props} updateContactHandler={updateContactHandler}/>}/>
     </Switch>
     {/*<AddContact addContactHandler={addContactHandler}/>*/}
     {/*<ContactList contacts={contacts} getContactId={removeContactHandler}/>*/}
     </Router>
      
    </div>
  );
}

export default App;
    