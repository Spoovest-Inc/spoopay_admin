import React from 'react'
import Iconfiy from './Iconfiy'

const Notifications = () => {
  return (
    <div className='notify'>
      <div className='icon'>
        <Iconfiy icon="ion:checkmark" width="17px"/>
      </div>
      <div className='text'>
       <h6>Wow, Great!</h6> 
       <p>
        Account successfully created
       </p>
      </div>
      
    </div>
  )
}

export default Notifications