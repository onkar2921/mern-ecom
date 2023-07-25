import React from 'react'
import "../CSS/Layout.css"
export default function Layout(props) {
  return (
   <>
   <div className="layout_div">
    <h2>{props.title}</h2>
    <p>{props.para}</p>
   </div>
   </>
  )
}
