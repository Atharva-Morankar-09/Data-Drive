import React, { useRef, useState} from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../../Contexts/AuthContext'
import { Link} from 'react-router-dom'
import CenteredComponents from './CenteredComponents'

export default function ForgotPassword() {

  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)
  const [mssg, setMssg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setErr('')
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMssg('Please check your Inbox')
    } catch {
      setErr('Failed to Reset Password')
    }
    setLoading(false)
  }
  return (
    <CenteredComponents>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Change Password</h2>
          <hr></hr>
          {err && <Alert variant='danger'>{err}</Alert>}
          {mssg && <Alert variant='success'>{mssg}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-2' id="email">
              <Form.Label >Email</Form.Label>
              <Form.Control type='email' ref={emailRef} required></Form.Control>
            </Form.Group>
            <Button disabled={loading} className='w-100 mt-2' type='submit'>Reset Password</Button>
          </Form>
          <div className='w-100 text-center mt-3'>
            <Link to="/login">Log in</Link>
          </div>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </div>
    </CenteredComponents>
  )
}

