import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='home'>
      <div className='det'>
        <p>This app Lets u add <span>New User</span> in to Your user List and and can perform the CRUD operation on <span>Existing Users</span> </p>
      </div>
     <Link to='/AddUser'><button className='mainb'>Add User</button></Link> 
    </div>
  )
}

export default Home