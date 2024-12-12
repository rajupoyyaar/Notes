import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import './CreateNote.css'
import { useDispatch, useSelector } from 'react-redux';
import { createNote } from '../notesSlice'; // Import the createNote thunk
import { useNavigate } from 'react-router-dom';
import Loading from "../Components/Loading";
import Error from "../Components/Error";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.notes);

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (!title || !content || !category) {
      <Error variant="danger">{<p>Please fill all the fields</p>}</Error>
      return;
    }

    await dispatch(createNote({ title, content, category }));

    navigate('/mynotes');
  };

  return (
    <Container className='createnote-container'>
      <h1>Create a New Note</h1>
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

        <Button type="submit" variant="primary" disabled={loading}>
          Create Note
        </Button>
      </Form>
    </Container>
  );
};

export default CreateNote;
