import React, {useEffect,useState} from 'react'
import MainScreen from '../Components/MainScreen'
import Loading from "../Components/Loading"
import { Accordion, Badge, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { fetchNotes, deleteNote } from '../notesSlice'

const MyNotes = ({search}) => {
  console.log("search", search)

  const dispatch = useDispatch();
    const { notes, loading, error } = useSelector((state) => state.notes);

    console.log(notes)

    const {userInfo} = useSelector((state)=> state.user)

    useEffect(() => {
      if(userInfo) {
        dispatch(fetchNotes());
      }
    }, [dispatch, userInfo]);


    const deleteHandler = (id) => {
      if (window.confirm("Are you sure you want to delete this note?")) {
          dispatch(deleteNote(id));
      }
    };

 if (!userInfo) {
  return <MainScreen title="Please log in to view your notes." />;
}

  return (
    <MainScreen title={`Welcome back ${userInfo? userInfo.name: ""} `}>
      <Link to="/createnote">
       <Button size='lg' style={{margin: "10px 5px"}}>Create New Notes</Button>
      </Link>
      {loading ? <Loading /> : ""}
      <Accordion>
      {
        notes?.filter((note) =>
          note.title.toLowerCase().includes(search?.toLowerCase())
        ).map((note,index)=>(
            <Card>
                <Accordion.Item eventKey={index}>
                <Card.Header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Accordion.Header as={Card.Text}>
                       {note.title}
                     </Accordion.Header>
                        <span>
                            <div style={{ display: "flex", gap: "10px" }}>
                                <Button href={`/note/${note._id}`}>Edit</Button>
                                <Button variant='danger' onClick={()=> deleteHandler(note._id)}>Delete</Button>
                            </div>
                        </span>
                </Card.Header>
                <Accordion.Body>
                <Card.Body>
                       <h4>
                          <Badge variant="success">
                            Category - {note.category}
                          </Badge>
                       </h4>
                        <blockquote className="blockquote mb-0">
                        <p>
                            {note.content}
                        </p>
                        <footer className="blockquote-footer">
                            Created on - {note.createdAt.substring(0,10)}
                        </footer>
                        </blockquote>
                </Card.Body>
                </Accordion.Body>
              </Accordion.Item>
            </Card>
        ))
      }
      </Accordion>
    </MainScreen>
  ) 
}

export default MyNotes