import React from 'react';
import Axios from 'axios';
import './App.css';
import ListItems from './ListItems'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

library.add(faTrash)

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      items:[],
      currentItem:{
        _id:'',
        title:'',
        is_completed: false
      }
    }
    this.addItem = this.addItem.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
  }
  componentDidMount(){
    const url = "http://127.0.0.1:5000/api/";
    fetch(url)
    .then(res => res.json())
    .then(json => {
      this.setState({
        items: json
    })
  });
  }
  addItem(e){
    e.preventDefault();
    var newItem = this.state.currentItem;
    if(newItem.title !==""){
      newItem = {title: newItem.title, is_completed: newItem.is_completed}
      fetch("http://127.0.0.1:5000/api/", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(newItem) // body data type must match "Content-Type" header
      })
      .then(async response => {
        if(response.ok){
          response.json().then(json => newItem._id = json._id);
          
          const items = [...this.state.items, newItem];
          this.setState({
            items: items,
            currentItem:{
              _id:'',
              title:'',
              is_completed: false
            }
          })
        } else {
          alert("There Was an error creating to-do!!!");
        }
      })
    }
  }
  handleInput(e){
    this.setState({
      currentItem:{
        _id: null,
        title: e.target.value,
        is_completed: false
      }
    })
  }
  deleteItem(_id){

    fetch("http://127.0.0.1:5000/api/" + String(_id), {
          method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json'
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: null // body data type must match "Content-Type" header
        })
        .then(async response => {
          const res = response;
          if(res.ok){
            const filteredItems= this.state.items.filter(item =>
              item._id!==_id);
            this.setState({
              items: filteredItems
            })
          } else {
            alert("Error in deleting to-do!!!");
          }
        })

  }
  setUpdate(_id, title, is_completed){
    // console.log("items:"+this.state.items);
    const items = this.state.items;
    items.map(item=>{      
      if(item._id===_id){

        item.title = title;
        item.is_completed = is_completed;

        fetch("http://127.0.0.1:5000/api/", {
          method: 'PUT', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json'
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(item) // body data type must match "Content-Type" header
        })
        .then(async response => {
          const res = response;
          if(res.ok){
            this.setState({
              items: items
            })
          } else {
            alert("Error in updating to-do!!!");
          }
        })
      }
    })
  }
 render(){
  return (
    <div className="App">
      <header>
        <form id="to-do-form" onSubmit={this.addItem}>
          <input type="text" placeholder="Enter task" value= {this.state.currentItem.title} onChange={this.handleInput}></input>
          <button type="submit">Add</button>
        </form>
        <p>{this.state.items.title}</p>
        
          <ListItems items={this.state.items} deleteItem={this.deleteItem} setUpdate={this.setUpdate}/>
        
      </header>
    </div>
  );
 }
}


export default App;
