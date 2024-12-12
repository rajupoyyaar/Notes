import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../userSlice';
import './Profile.css';
import MainScreen from '../Components/MainScreen';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const dispatch = useDispatch();
    const { userInfo, loading, error } = useSelector((state) => state.user);

    const [name, setName] = useState(userInfo?.name || '');
    const [email, setEmail] = useState(userInfo?.email || '');
    const [password, setPassword] = useState('');
    const [profile, setProfile] = useState(userInfo?.profile || '');

    const navigation = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProfile({ name, email, password, profile }));
    };

    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email);
            setProfile(userInfo.profile);
        }
    }, [userInfo]);

    const postDetails = (pics) => {
        if (pics.type === 'image/jpeg' || pics.type === 'image/png' || pics.type === 'image/jpg') {
            const data = new FormData();
            data.append('file', pics);
            data.append('upload_preset', 'notesapp');
            data.append('cloud_name', 'deebtrhka');
            data.append('api_key', '772489483484368');
            fetch('https://api.cloudinary.com/v1_1/deebtrhka/image/upload', {
                method: 'post',
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setProfile(data.url.toString());
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    return (
        <Container className="profile-container">
            <MainScreen title="Update Profile">
                <Row>
                    {/* Left Column: Form */}
                    <Col md={6}>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="position-relative mb-3">
                                <Form.Label>Profile Picture</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="file"
                                    onChange={(e) => postDetails(e.target.files[0])}
                                    custom
                                />
                            </Form.Group>
                            {error && <div className="text-danger">{error}</div>}
                            <Button type="submit" variant="primary">
                                {loading ? 'Updating...' : 'Update Profile'}
                            </Button>
                        </Form>
                    </Col>

                    {/* Right Column: Display Profile */}
                    <Col md={6} className="text-center">
                        <h4>Current Profile</h4>
                        {profile ? (
                            <Image
                                src={profile}
                                alt="Profile Picture"
                                roundedCircle
                                className="mb-3"
                                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                            />
                        ) : (
                            <div className="placeholder">
                                <p>No profile picture uploaded</p>
                            </div>
                        )}
                        <h5>{userInfo?.name || 'No Name Provided'}</h5>
                        <p>{userInfo?.email || 'No Email Provided'}</p>
                    </Col>
                </Row>
            </MainScreen>
        </Container>
    );
};

export default Profile;
