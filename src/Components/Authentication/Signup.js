import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../../Contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import CenteredComponents from './CenteredComponents'

export default function Signup() {
    
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    const { signup } = useAuth()
    const [err, setErr] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e){
        e.preventDefault()
        setErr('')
        if(passwordRef.current.value!==confirmPasswordRef.current.value)
        {
            return setErr("Passwords don't match")
        }

        try{
            setErr('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            navigate('/')
        } catch {
            setErr('User already exists')
        }
        setLoading(false)
    }
    return (
    <CenteredComponents>
      <Card>
        <Card.Body>
            <h2 className='text-center mb-4'>Sign Up</h2>
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
                <Form.Group className='mb-2' id="confirm-password">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' ref={confirmPasswordRef} required></Form.Control>
                </Form.Group>
                <Button disabled={loading} className='w-100 mt-2' type='submit'>Sign Up</Button>
            </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Already have an account? <Link to="/login">Log In</Link> 
      </div>
    </CenteredComponents>
  )
}
