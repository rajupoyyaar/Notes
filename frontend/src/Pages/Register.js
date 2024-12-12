import React, { useEffect, useState } from 'react'
import MainScreen from "../Components/MainScreen"
import { Button, Container, Form } from 'react-bootstrap'
import Error from '../Components/Error'
import Loading from '../Components/Loading'
import {registerUser} from "../userSlice"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Register = () => {
   const [email,setEmail] = useState("")
   const [name, setName ] = useState("")
   const [picture, setPicture] = useState("")
   const [password, setPassword] = useState("")
   const [confirmPassword, setConfirmPassword] = useState("")
   const [message, setMessage] = useState(null)
   const [picMessage, setPicMessage] = useState(null)

   const navigation = useNavigate()

   const dispatch = useDispatch();
    const { loading, error, userInfo } = useSelector((state) => state.user);
    console.log("userinfo", userInfo)

   const submitHandler  = async (e)=>{
    e.preventDefault()
    if(password !== confirmPassword){
      setMessage("Passwords do not match")
    }
    else{
      setMessage("")
      dispatch(registerUser({name,email,password,profile:picture},message))
    }
   }  

   useEffect(()=>{
      if(userInfo){
        navigation("/mynotes")
      }
   },[userInfo,navigation]) 

   const postDeatils = (pics)=>{
    if(!pics){
      return setPicMessage("Please select an Image")
    }
    setPicMessage(null)
    if(pics.type === 'image/jpeg' || pics.type === 'image/png'){
      const data = new FormData()
      data.append('file', pics)
      data.append('upload_preset', 'notesapp')
      data.append('cloud_name', 'deebtrhka')
      data.append('api_key', '772489483484368')
      fetch("https://api.cloudinary.com/v1_1/deebtrhka/image/upload",{
        method: "post",
        body: data,
      }).then((res)=>res.json()).then((data)=>{
        console.log(data)
        setPicture(data.url.toString())
      }).catch((err)=>{
        console.log(err)
      })
    }
    else{
      return setPicMessage('Select an Image')
    }
   }

  return (
    <MainScreen title="Register">
      <Container>
        {loading ? <Loading /> : ""}
        {message ? <Error variant="danger">{message}</Error>: ""}
        {error ? <Error>{error}</Error>:""}
      <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e)=>setName(e.target.value)}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
          </Form.Group>
         
         {picMessage ? <Error>{picMessage}</Error>: ""}
          <Form.Group className="position-relative mb-3">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              type="file"
              name="file"
              onChange={(e)=>postDeatils(e.target.files[0])}
              custom
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Register
          </Button>
      </Form>
      </Container>
    </MainScreen>
  )
}

export default Register