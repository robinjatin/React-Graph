import '../App.css';
import {Button} from 'reactstrap'
import ReuseForm from './ReuseForm';

function ForgotPassword() {
  return (
    <>
    <center><h1>Forgot Password PAGE</h1></center>
    <ReuseForm/>
    <center><Button className="btn-md btn-dark ">Change Password</Button></center>

     <div className="text-center">
       <a href="/">Go back</a>
       <span className="p-2"></span>
      
     </div>
     
    </>
  );
}

export default ForgotPassword;
