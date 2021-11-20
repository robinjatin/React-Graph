import '../App.css';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {Button, Form, FormGroup, Input} from 'reactstrap'
import React,{ Component } from 'react';
class Signup extends Component {
  constructor(props){
    super(props)
    this.state = {
      name : "",
      email : "",
      password :"",
      confirmpassword :"",
      users:[]
    }
  }
  async componentDidMount() {
    await axios.get("http://localhost:8080/users").then((res)=>{
      this.setState({users:res.data})
    }).catch(error =>{
     console.log("error is", error);
   })
   }
  handleChange = (e) => {
    let name = e.target.name
    let val = e.target.value
    this.setState({[name]:val})
  }

  handleSubmit = ()=>{
    let flag = false
    let {users} = this.state
    for(let i = 0; i < users.length; i++){
      if(this.state.email === users[i].email){
        flag = true
        break
      }
    }
    if(!flag){
    if(this.state.name === "" || this.state.email === "" || this.state.password === ""){
      alert("Fields cannot be empty!")
    }
    else{
    if(this.state.password === this.state.confirmpassword){
      axios.post("http://localhost:8080/users", this.state).then((res)=> 
        console.log(res),
        this.props.history.push("/")
    ).catch(error =>{
        console.log("error is", error);
      })
    }
    else{
      alert("Password is not same.")
    }
  }
  }
  else{
    alert("Email already registered!")
  } 
  }

 render(){
  return (
    <Form className="login-form">
     <h1>SIGN UP PAGE</h1>

     <FormGroup>
       <label>Name</label>
       <Input type="text" onChange={this.handleChange} name="name" placeholder="Name"/>
     </FormGroup>

     <FormGroup>
       <label>Email</label>
       <Input type="email" onChange={this.handleChange} name="email" placeholder="Email"/>
     </FormGroup>
       
     <FormGroup>
       <label>Password</label>
       <Input type="password" onChange={this.handleChange} name="password" placeholder="Password"/>
     </FormGroup>

     <FormGroup>
       <label>Confirm Password</label>
       <Input type="password" onChange={this.handleChange} name="confirmpassword" placeholder="Confirm Password"/>
     </FormGroup>
     <Button type="submit" className="btn-lg btn-dark btn-block" onClick = {this.handleSubmit}>SIGN UP</Button>

     <div className="text-center">
       <a href="/">Go back</a>
       <span className="p-2"></span>
      
     </div>
    </Form>
  );
}
}
export default withRouter(Signup);
