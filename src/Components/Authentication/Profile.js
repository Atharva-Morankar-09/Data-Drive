import React, { useState } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../Contexts/AuthContext'
import CenteredComponents from './CenteredComponents'

export default function Profile() {
   
  const { currUser, logout } = useAuth()
  const [err, setErr] = useState('')
  const navigate = useNavigate()

  async function handleLogout(){
    setErr('')

    try{
      await logout()
      navigate("/login")
    } catch{
      setErr("Failed to Log out")
    } 
  }
  
  return (
    <CenteredComponents>
      <Card>
      <Card.Body>
            <h2 className='text-center mb-4'>Profile</h2>
            <hr></hr>
            {err && <Alert variant='danger'>{err}</Alert>}
            <strong>Email :</strong> {currUser.email} 
            <Link to='/updateProfile' className='btn btn-primary w-100 mt-3'>Update Profile</Link>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        <Button variant="link" onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </CenteredComponents>
  )
}
