import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'; // react-bootstraap r jonno 2ta kaj korte hobe 1.install  2.ata css import


const RegisterRBS = () => {


    const handleSubmit =(event)=>{
        // console.log(event.target.email.value);
        event.preventDefault(); // to prevent refressing the page after submitting
        const email = event.target.email.value ;
        const password = event.target.password.value ;
        console.log(email,password);
    }

    return (
        <div className='mt-3'>
            <h2 className='text-center'>Please Register</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name='email' placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="accept terms & conditions" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default RegisterRBS;