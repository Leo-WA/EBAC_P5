import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, removeContact, updateContact } from './features/contacts/contactsSlice';
import styled from 'styled-components';
import './App.css';

const Container = styled.div`
  text-align: center;
`;

const Error = styled.p`
  color: red;
`;

const List = styled.ul`
  list-style-type: none;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
`;

const Button = styled.button`
  margin-left: 10px;
`;

function App() {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts);

  const [newContact, setNewContact] = useState({ name: '', email: '', phone: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      if (!/^\d*$/.test(value)) return; 
      if (value.length > 11) return; 
    }
    setNewContact({ ...newContact, [name]: value });
  };

  const handleAddContact = () => {
    if (!newContact.name || !newContact.email || !newContact.phone) {
      setError('Todos os campos são obrigatórios.');
      return;
    }
    if (!newContact.email.includes('@')) {
      setError('Email deve conter @.');
      return;
    }
    if (newContact.phone.length < 10 || newContact.phone.length > 11) {
      setError('Telefone deve conter entre 10 e 11 números.');
      return;
    }
    dispatch(addContact({ ...newContact, id: Date.now() }));
    setNewContact({ name: '', email: '', phone: '' });
    setError('');
  };

  const handleEditContact = (contact) => {
    setIsEditing(true);
    setCurrentContact(contact);
    setNewContact(contact);
    setError('');
  };

  const handleUpdateContact = () => {
    if (!newContact.name || !newContact.email || !newContact.phone) {
      setError('Todos os campos são obrigatórios.');
      return;
    }
    if (!newContact.email.includes('@')) {
      setError('Email deve conter @.');
      return;
    }
    if (newContact.phone.length < 10 || newContact.phone.length > 11) {
      setError('Telefone deve conter entre 10 e 11 números.');
      return;
    }
    dispatch(updateContact(newContact));
    setIsEditing(false);
    setNewContact({ name: '', email: '', phone: '' });
    setCurrentContact(null);
    setError('');
  };

  const handleDeleteContact = (id) => {
    dispatch(removeContact(id));
    setError('');
  };

  return (
    <Container className="App">
      <h1>Agenda de Contatos</h1>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={newContact.name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newContact.email}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Telefone"
          value={newContact.phone}
          onChange={handleInputChange}
        />
        {isEditing ? (
          <Button onClick={handleUpdateContact}>Atualizar</Button>
        ) : (
          <Button onClick={handleAddContact}>Adicionar</Button>
        )}
        {error && <Error>{error}</Error>}
      </div>
      <List>
        {contacts.map((contact) => (
          <ListItem key={contact.id}>
            <span>{contact.name}</span>
            <span>{contact.email}</span>
            <span>{contact.phone}</span>
            <Button onClick={() => handleEditContact(contact)}>Editar</Button>
            <Button onClick={() => handleDeleteContact(contact.id)}>Deletar</Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default App;
