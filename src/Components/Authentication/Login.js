import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../../Contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import CenteredComponents from './CenteredComponents'

export default function Login() {

  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setErr('')
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      navigate("/")
    } catch {
      setErr('Failed to Log in')
    }
    setLoading(false)
  }
  return (
    <CenteredComponents>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Log In</h2>
          <hr></hr>
          {err && <Alert variant='danger'>{err}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-2' id="email">
              <Form.Label >Email</Form.Label>
              <Form.Control type='email' ref={emailRef} required></Form.Control>
            </Form.Group>
            <Form.Group className='mb-2' id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' ref={passwordRef} required></Form.Control>
            </Form.Group>
            <Button disabled={loading} className='w-100 mt-2' type='submit'>Log In</Button>
          </Form>
          <div className='w-100 text-center mt-3'>
            <Link to="/forgotPassword">Forgot password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Don't have an account! <Link to="/signup">Sign Up</Link>
      </div>
    </CenteredComponents>
  )
}

