import { Container, Row, Col } from 'react-bootstrap';
import VideoPlayer from './VideoPlayer';
import Chat from './Chat';


function Home() {
  return (
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
  );
}

export default Home;