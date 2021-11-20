
import {Form, FormGroup, Input}
from 'reactstrap'
const ReuseForm = () => {
    return(
        <Form className="login-form">
    
     <FormGroup>
       <label>Email</label>
       <Input type="email" placeholder="Email"/>
     </FormGroup>

     <FormGroup>
       <label>Password</label>
       <Input type="password" placeholder="Password"/>
     </FormGroup>
    
     </Form>
    )
}
export default ReuseForm;