import React from 'react';
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../userSlice';

const Header = ({setSearch}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.user);

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/');
    };

    return (
        <Navbar expand="lg" bg="primary" variant="dark">
            <Container>
                <Navbar.Brand>
                    <Link to="/">Notes App</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Form className="m-auto">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            onChange={(e)=>setSearch(e.target.value)}
                        />
                    </Form>
                    {userInfo? 
                     (<Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                        <Nav.Link>
                            <Link to="mynotes">My Notes</Link>
                        </Nav.Link>
                        <NavDropdown title={userInfo.name} id="navbarScrollingDropdown">
                             <NavDropdown.Item href="/profile">
                                My Profile
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>)
                    : 
                      <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                        <Nav.Link>
                            <Link to="/login" >Login</Link>
                        </Nav.Link>
                      </Nav>
                      }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
