import { useEffect, useState } from 'react'
import ContactList from './components/ContactList'
import ContactForm from './components/ContactForm'
import './stylesheet.css'
// import * as dotenv from 'dotenv'


// dotenv.config();

// const backendURL = process.env.BACKEND_URL;

function App() {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentContact, setCurrentContact] = useState({})

  const fetchContacts = async() =>{
    const response = await fetch(`http://127.0.0.1:5000/contacts`)
    const data = await response.json()
    setContacts(data.contacts)
    console.log(data.contacts)
  
  }

  const closeModal = () =>{
    setIsModalOpen(false);
    setCurrentContact({});
  }

  const openCreateModal = () =>{
    if(!isModalOpen) setIsModalOpen(true)
  }

  const openEditModal = (contact) =>{

    console.log('open edit modal');
    if(isModalOpen) return;
    setCurrentContact(contact);
    setIsModalOpen(true);
  }

  const onUpdate = () =>{
    closeModal();
    fetchContacts();
  }

  

  useEffect(()=>{
    fetchContacts();
  }, [])

  return (
    <>
      <ContactList contacts={contacts} updateContact={openEditModal} updateCallback={onUpdate}/>
      <button onClick={openCreateModal}>Create New Contact</button>
      
      { isModalOpen && <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <ContactForm existingContact={currentContact} updateCallback={onUpdate}/>
        </div>
      </div>
      }
      
      
    </>
  )
}



export default App;
