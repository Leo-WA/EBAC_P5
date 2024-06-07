import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeContact, updateContact } from './contactsSlice';
import styled from 'styled-components';

const List = styled.ul`
  list-style-type: none;
`;

const ListItem = styled.li`
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  margin-left: 10px;
`;

const ContactsList = () => {
  const contacts = useSelector(state => state.contacts);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeContact(id));
  };

  const handleEdit = (id) => {
    const newContact = prompt('Enter new details:', JSON.stringify(contacts.find(contact => contact.id === id)));
    if (newContact) {
      dispatch(updateContact(JSON.parse(newContact)));
    }
  };

  return (
    <List>
      {contacts.map(contact => (
        <ListItem key={contact.id}>
          {contact.name} - {contact.email} - {contact.phone}
          <div>
            <Button onClick={() => handleEdit(contact.id)}>Edit</Button>
            <Button onClick={() => handleRemove(contact.id)}>Remove</Button>
          </div>
        </ListItem>
      ))}
    </List>
  );
};

export default ContactsList;
