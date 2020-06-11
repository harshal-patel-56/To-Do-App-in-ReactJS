import React from 'react';
import './ListItems.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FlipMove from 'react-flip-move';

function ListItems(props){
    const items = props.items;
    const listItems = items.map(item =>
   {
       return <div className="list" id={item._id}>
     <p>
         <input type="text" id={item._id} value={item.title} onChange={(e)=>{
             props.setUpdate(item._id, e.target.value, item.is_completed)}}/>
        
        <span className="s2">
            <input type="checkbox" id={item._id} checked={item.is_completed} onChange={(e)=>{
             props.setUpdate(item._id, item.title, e.target.checked)}}/>
        </span>
        <span className="s1">
       
        <FontAwesomeIcon className="faicons" onClick={() => {
            props.deleteItem(item._id)
        }} icon="trash" />
        </span>
     </p>
     
    </div>})
    return <div>
        <FlipMove duration={1000} easing="ease-in-out">
        {listItems}
        </FlipMove>
    
    </div>;
  }

  export default ListItems;