import React from 'react'

const Users = (props) => {
    let {allUsers} = props
  return (
    <>
        {allUsers.map((el,index)=>{
                  <p key={index}>{el.givenName}</p>
        })}
    </>
  )
}

export default Users