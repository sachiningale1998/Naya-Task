import React from 'react'

const nameStyles={
    textAlign: 'left',
    marginLeft: '15px',
}

const Sketches = (props) => {
    let {allSketches} = props
  return (
    <>
        {allSketches.map((el,index)=>{
            return(
                <p style={nameStyles} key={index}>{el.sketchName}</p>
            )
        })}
    </>
  )
}

export default Sketches