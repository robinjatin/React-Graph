import '../App.css';
import axios from 'axios';
import {Button, Form, FormGroup, Input} from 'reactstrap'
import {Jumbotron} from "react-bootstrap"
//import ReuseForm from './ReuseForm';
import React,{ Component } from 'react';
import { withRouter } from 'react-router';
class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      users : [],
      email: "",
      password : ""
    }
  }
  
  handleChange = (e) => {
    let name = e.target.name
    let val = e.target.value
    this.setState({[name]:val})
  }

  handleSubmit = ()=>{
    // let users = this.state.users
    let flag = false
    let {users} = this.state
    for(let i=0;i<users.length;i++)  {
      if(this.state.email === users[i].email && this.state.password === users[i].password)
      {
        flag = true
        localStorage.setItem("name", users[i].name)
        break;
      }
    }
    if(flag){
      this.props.history.push("/dashboard")
    }
    else{
      alert("Invalid credentials")
    }
  }
  async componentDidMount() {
   await axios.get("http://localhost:8080/users").then((res)=>{
     this.setState({users:res.data})
   }).catch(error =>{
    console.log("error is", error);
  })
  }
  render(){
  return (
    <>
    <br/><br/>
    <Jumbotron>
    <center><h1>LOGIN PAGE</h1></center>
    <Form className="login-form">
    
     <FormGroup>
       <label>Email</label>
       <Input type="email" name="email"  onChange={this.handleChange} placeholder="Email"/>
     </FormGroup>

     <FormGroup>
       <label>Password</label>
       <Input type="password" name="password" onChange={this.handleChange} placeholder="Password"/>
     </FormGroup>
     <center><Button type="submit" className="btn-md btn-dark" onClick={this.handleSubmit}>LOGIN</Button></center>
     </Form>
    

<div className="text-center">
  <a href="/signup">Sign Up</a>
  <span className="p-2"></span>
  <a href="/forgot">Forgot Password?</a>
</div>
    </Jumbotron>
    </>
  );
}
}

export default withRouter(Login);
