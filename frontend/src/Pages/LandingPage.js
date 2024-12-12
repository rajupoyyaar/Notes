import React from 'react'
import './LandingPage.css'
import { Button, Container, Row } from "react-bootstrap"

const LandingPage = () => {
  return (
    <div className='main'>
      <Container >
        <Row>
           <div className='intro-text'>
              <div>
                <h1 className='title'>Welcome to Notes App</h1> 
                <p className='subtitle'>One Safe Place for all our Notes</p>
              </div>

              <div className='btn-container'>
                <a href="/login">
                <Button className='lg landingbutton'>Login</Button>
                </a>
                <a href="/register">
                <Button className='lg landingbutton'>Signup</Button>
                </a>
              </div>

           </div>
        </Row>
      </Container>
    </div>
  )
}

export default LandingPage