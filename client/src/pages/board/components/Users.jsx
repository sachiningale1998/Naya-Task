import React from 'react'

const nameStyles={
    textAlign: 'left',
    marginLeft: '15px',
}

const Users = (props) => {
    let {allUsers} = props
  return (
    <>
        {allUsers.map((el,index)=>{
            return(
                <p style={nameStyles} key={index}>{el.givenName + " " + el.familyName}</p>
            )
        })}
    </>
  )
}

export default Users