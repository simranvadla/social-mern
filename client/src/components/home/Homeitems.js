import React from 'react'
import Comment from '../comment/Comment'
export default function Homeitems(props) {
    const elem = props.elem
  return (
    <div>
        <div>{elem.users[0].name} - {elem.item}<br></br>
        <img style={{width:'100%'}} src={elem.file}/>
        </div>
        {/* <Comment id={item.id}/> */}
    </div>
  )
}
