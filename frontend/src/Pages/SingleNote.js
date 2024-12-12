import React, { useState, useEffect } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import MainScreen from '../Components/MainScreen';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateNote, fetchNotes } from '../notesSlice';
import Loading from '../Components/Loading';
import Error from '../Components/Error';

const SingleNote = () => {
    const { id } = useParams(); // Get the note ID from the URL
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { notes, loading, error } = useSelector((state) => state.notes);

    // Find the note in the Redux state
    const note = notes.find((n) => n._id === id);

    // State for form fields
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        if (!note) {
            dispatch(fetchNotes());
        } else {
            setTitle(note.title);
            setContent(note.content);
            setCategory(note.category);
        }
    }, [dispatch, note]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateNote({ id, title, content, category })).then(() => {
            navigate('/mynotes');
        });
    };

    return (
        <MainScreen title="Update Note">
            <Container className="createnote-container">
                {loading && <Loading />}
                {error && <Error variant="danger">{error}</Error>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="title" className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter note title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="content" className="mb-3">
                        <Form.Label>Content</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            placeholder="Enter note content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="category" className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter note category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button type="submit" variant="primary">
                        Update Note
                    </Button>
                </Form>
            </Container>
        </MainScreen>
    );
};

export default SingleNote;
