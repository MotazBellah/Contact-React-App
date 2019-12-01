import React, { Component } from 'react'
import ListContacts from './ListContacts'
import * as ContactsAPI from './utils/ContactsAPI'
import CreateContact from './CreateContact'
import { Route } from 'react-router-dom'


class App extends Component {
    state = {
        contacts: []
    }
    //Use componentDidMount to fetch data from server and update the contacts
    componentDidMount(){
        ContactsAPI.getAll()
            .then((contacts) => {
                this.setState(() => ({
                    contacts
                }))
            })
    }

    removeContact = (contact) => {
        this.setState((currentState) => ({
            contacts: currentState.contacts.filter((c) =>{
                return c.id !== contact.id
            })
        }))
        // To remove the contact from the server
        ContactsAPI.remove(contact)
    }
    CreateContact = (contact) => {
        ContactsAPI.create(contact)
        .then((contact) => {
            this.setState((currentState) => ({
                contacts: currentState.contacts.contact([contact])
            }))
        })
    }


  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
            <ListContacts
                contacts={this.state.contacts}
                onDeleteContact ={this.removeContact}
            />
        )} />
        <Route path='/create' render={({ history }) => (
            <CreateContact
                onCreatContact={(contact) =>{
                    this.CreateContact(contact)
                    history.push('/')
                }}/>

        )} />
      </div>
    )
  }
}



export default App;
