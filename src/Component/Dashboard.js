import { Line } from "react-chartjs-2";
import axios from 'axios';
import {Row, Col} from 'reactstrap';
import {Modal, Container, Spinner, Navbar} from 'react-bootstrap';
import React,{ Component } from 'react';

class Dashboard extends Component {
    constructor(props){
        super(props)
        this.state = {data : [],
        show:false,
        currentdata:{},
        testing:[]
        }  
    }

async componentDidMount(){
    let flag = false
    await axios.get("http://localhost:8080/getdata").then((res)=>{
     this.setState({testing:res.data})
     flag = true
   }).catch(error =>{
    console.log("error is", error);
  })
  let ourdata = []
  if(flag){
  let array = this.state.testing
  if(array.length > 1){
  let arr = this.state.testing[0]
  arr.pop()
  for(let i = 1; i < array.length; i++){
    let insidedata = []
    let label = array[i].pop()
    let data = array[i]
    let exactData = {}
    exactData.label = label
    exactData.data = data
    insidedata.push(exactData)
    let totalinside = {}
    totalinside.id = i
    totalinside.labels = arr
    totalinside.datasets = insidedata
    ourdata.push(totalinside)
  }
}
  }
  this.setState({data:ourdata})
}    

handleShow = (data,e) =>{
    this.setState({show:true, currentdata:data})
}
handleClose = () =>{
    this.setState({show:false})
}
 render(){    
  return (
    <>
    <br/><br/><br/><br/><br/>
      <Container style={{top:"0", bottom:"0", left:"0", right:"0", margin:"auto", position:"absolute"}}>
      <Modal show={this.state.show} onHide={this.handleClose} size="lg" >
        <Modal.Header closeButton >
          <Modal.Title>Graph</Modal.Title>
        </Modal.Header>
       
        <Modal.Body ><Line data={this.state.currentdata} /></Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          
        </Modal.Footer> */}
      </Modal>
      <Navbar bg="dark" variant="dark">
  <Navbar.Brand title="Log Out" href="/">Dashboard</Navbar.Brand>
  <Navbar.Toggle />
  <Navbar.Collapse className="justify-content-end">
    <Navbar.Text>
      Signed in as: {localStorage["name"]}
    </Navbar.Text>
  </Navbar.Collapse>
</Navbar><br/>
      
      {this.state.data.length === 0 ? <center><Spinner animation="border" variant="dark" /></center>:
      <Row >
      {this.state.data.map((dat) => (
           <Col key = {dat.id} xs = {6} onClick = {(e)=>this.handleShow(dat,e)}>< Line data={dat}   /> </Col>

      ))}
      </Row>}
    </Container>
    </>
  );
}}
export default Dashboard;

