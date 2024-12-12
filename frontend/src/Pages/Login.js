import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../userSlice';
import MainScreen from '../Components/MainScreen';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loading from '../Components/Loading';
import Error from '../Components/Error';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigate()

    const dispatch = useDispatch();
    const { loading, error, userInfo } = useSelector((state) => state.user);
    console.log("userinfo", userInfo)

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }));
    };

    useEffect(()=>{
        if(userInfo){
            navigation("/mynotes")
        }
    },[userInfo,navigation])

    return (
        <MainScreen title="LOGIN">
            <Container className="login-container">
                {loading && <Loading />}
                {error && <Error variant="danger">{error}</Error>}
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
                <Row className="py-3">
                    <Col>
                        New Customer? <Link to="/register">Register Here</Link>
                    </Col>
                </Row>
            </Container>
        </MainScreen>
    );
};

export default Login;
