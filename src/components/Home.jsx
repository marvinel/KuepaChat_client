import { Container, Row, Col , Button} from 'react-bootstrap';
import VideoPlayer from './VideoPlayer';
import Chat from './Chat';

import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  const logout = () =>{
    localStorage.removeItem("sessionToken")
    navigate("/login")
  }
  return (
    <>
    <Navbar bg="light" variant="light">
    <Container>
      <Navbar.Brand href="#home">KUEPACHAT</Navbar.Brand>

      <Navbar.Text placement="end"> <Button variant="danger" onClick={logout}>Cerrar Sesión</Button></ Navbar.Text>
    </Container>
  </Navbar>
    <Container fluid id="container">

      <Row>
        <Col md={8} lg={9}>
          <VideoPlayer />
        </Col>
        <Col md={4} lg={3}>
        <Chat />
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default Home;