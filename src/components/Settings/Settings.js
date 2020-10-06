import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import "./Settings.css";

class Settings extends React.Component {
  render() {
    return (
      <div>
        <Container fluid>
          <Row>
            <Col>
              <h2>Einstellungen</h2>
              <hr />
            </Col>
          </Row>
          <Row>
            <Col lg={true} className="settings-item">
              <div className="control-group">
                <h4>Einstellungen für Steuern</h4>
                <Form>
                  <Form.Group controlId="formTaxes">
                    <Form.Label>Steuer 1</Form.Label>
                    <Form.Control type="text"></Form.Control>
                    <Form.Label>Steuer 2</Form.Label>
                    <Form.Control type="text"></Form.Control>
                    <Form.Label>Steuer 3</Form.Label>
                    <Form.Control type="text"></Form.Control>
                  </Form.Group>
                </Form>
              </div>
            </Col>
            <Col lg={true} className="settings-item">
              <div className="control-group">
                <h4>Einstellungen für Pläne</h4>
                <label htmlFor="setting1">Sparplan 1</label>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="25,00"
                    aria-label="setting1"
                    id="setting1"
                    aria-describedby="basic-addon2"
                  />
                  <InputGroup.Append>
                    <InputGroup.Text id="basic-addon2">%</InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
              </div>
            </Col>
            <Col lg={true} className="settings-item">
              <div className="control-group">
                <h4>Einstellungen für Ausgaben</h4>
                <Form>
                  <Form.Group as={Row} controlId="ausgaben1">
                    <Form.Label column sm="2">
                      Ausgaben Bsp
                    </Form.Label>
                    <Col sm="10">
                      <InputGroup className="mb-3">
                        <Form.Control
                          id="ausgaben1_cont"
                          type="text"
                          defaultValue="25,00"
                          aria-describedby="basic-addon2"
                        />
                        <InputGroup.Append>
                          <InputGroup.Text id="basic-addon2">%</InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="ausgaben2">
                    <Form.Label column sm="2">
                      Ausgaben Bsp
                    </Form.Label>
                    <Col sm="10">
                      <InputGroup className="mb-3">
                        <Form.Control
                          id="ausgaben2_cont"
                          type="text"
                          defaultValue="25,00"
                          aria-describedby="basic-addon2"
                        />
                        <InputGroup.Append>
                          <InputGroup.Text id="basic-addon2">%</InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>
                    </Col>
                  </Form.Group>
                </Form>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={true} className="settings-item">
              <div className="control-group">
                <h4>Theme</h4>
                <Form>
                  <FormControl
                    as="select"
                    name="setting-theme"
                    onChange={(event) => this.props.onChange(event)}
                    value={localStorage.getItem("theme")} //dirty solution since it only updates AFTER a refresh
                  >
                    <option value="hell">hell</option>
                    <option value="dunkel">dunkel</option>
                  </FormControl>
                </Form>
              </div>
            </Col>
            <Col lg={true}></Col>
            <Col lg={true}></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Settings;
