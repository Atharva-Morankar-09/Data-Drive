import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../../Contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import CenteredComponents from './CenteredComponents'

export default function UpdateProfile() {

  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  const { currUser, newEmail, newPassword } = useAuth()
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setErr("Passwords do not match")
    }

    setLoading(true)
    setErr('')
     const promises = []

    if (emailRef.current.value !== currUser.email) {
      promises.push(newEmail(emailRef.current.value))
    }

    if (passwordRef.current.value) {
      promises.push(newPassword(passwordRef.current.value))
    }

    Promise.all(promises).then(() => {
        navigate('/user')
      }).catch(() => {
        setErr('Failed to Update Account')
      }).finally(() => {
        setLoading(false)
      })
  }
  return (
    <CenteredComponents>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Update Profile</h2>
          <hr></hr>
          {err && <Alert variant='danger'>{err}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-2' id="email">
              <Form.Label >Email</Form.Label>
              <Form.Control type='email' ref={emailRef} required defaultValue={currUser.email}></Form.Control>
            </Form.Group>
            <Form.Group className='mb-2' id="password">
              <Form.Label>New Password</Form.Label>
              <Form.Control type='password' ref={passwordRef} placeholder="Leave blank if you want same"></Form.Control>
            </Form.Group>
            <Form.Group className='mb-2' id="confirm-password">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control type='password' ref={confirmPasswordRef} placeholder="Leave blank if you want same"></Form.Control>
            </Form.Group>
            <Button disabled={loading} className='w-100 mt-2' type='submit'>Update</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        <Link to="/user">Cancel</Link>
      </div>
    </CenteredComponents>
  )
}

