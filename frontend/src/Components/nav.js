import React from 'react'
import { Link } from 'react-router-dom'
function Nav() {
  return (
    <div className='nav'>
        <div><Link id='link' to='/'>MY-User</Link></div>
        <div className='dli'>
            <li><Link id='link' to='/AllUser'>All Users</Link></li>
            <li> <Link id='link' to='/AddUser'>Add User</Link></li>
        </div>
       
    </div>
  )
}

export default Nav