import React, { Component } from 'react';
import { render } from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { chaves } from "./key";
import {
  Container,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Label,
  Alert
} from "reactstrap";

const appid = 'chaves';

class App extends Component {
  constructor() {
    super();
    this.state = {
      entrada: '',
      cidade: '',
      temperatura: '',
      umidade: '',
      erro: ''
    };
  }

kelvinToCelsius = k => (k - 273.15).toFixed(2);
  
requisicao = () => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${
      this.state.entrada
    },br&APPID=${chaves.appid}`
  )
  .then(response => 
  response.json())
  .then(json => {
    if (json.message !== undefined) {
      this.setState({
        cidade: '',
        temperatura: '',
        umidade: '',
        erro: json.message
      });
    } else {
      this.setState({
        cidade: json.name,
        temperatura: this.kelvinToCelsius(json.main.temp),
        umidade: json.main.humidity,
        erro: ''
      });
    }
    })
    .catch(error => {
      this.setState({
        erro: error.message
      });
    });
  };

  render() {
    return (
      <Container
        className='bg-danger mt-2'>
          <Row className='justify-content-center'>
            <Col className='col-xs-12 col-sm-10 col-md-8 col-lg-6 col-xl-5'>
              <br />
              <InputGroup>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>Cidade</InputGroupText>
                </InputGroupAddon>
                <Input 
                  value= { this.state.entrada }
                  onChange={ e => this.setState({
                    entrada: e.target.value
                  })
                  }
                  placeholder='digite o nome da cidade'
                />
                <InputGroupAddon
                  addonType='append'>
                    <Button
                      color='secondary'
                      onClick={ this.requisicao }>
                        Buscar
                      </Button>
                  </InputGroupAddon>
              </InputGroup>
              <br />
            </Col>
          </Row>
          <Row className='justify-content-center'>
            <Col className='col-xs-12 col-sm-10 col-md-8 col-lg-6 col-xl-5'>
              { this.state.cidade !== "" && (
                <Card>
                  <CardTitle>Resultado da busca</CardTitle>
                  <CardBody>
                      <CardText>
                        Cidade: { this.state.cidade }
                      </CardText>
                      <CardText>
                        Temperatura: { this.state.temperatura} ºC
                      </CardText>
                      <CardText>
                        Umidade relativa do ar: { this.state.umidade } %
                      </CardText>
                  </CardBody>
                </Card>
              )}
              {this.state.erro !== "" && (
                <card>
                  <CardTitle>Resultado da Busca</CardTitle>
                  <CardBody>
                    <CardText>Mensagem de erro: { this.state.erro }</CardText>
                  </CardBody>
                </card>
              )}
            </Col>
          </Row>
      </Container>
    );
  }
}

export default App;
