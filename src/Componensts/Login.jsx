import React, { useRef } from 'react';
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'; // react-bootstraap r jonno 2ta kaj korte hobe 1.install  2.ata css import
import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, updatePassword } from 'firebase/auth';
import app from '../firebase/firebase.confiq';

const auth = getAuth(app);


const Login = () => {
    const [error, setError] = useState('');              // string dekhabo tai initially empty string
    const [success, setSuccess] = useState('');
    const emailref = useRef();                               // used for holding a value/refrences


    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;      // pura form ta tar vhitore thake shob input(mail,pass)
        const email = form.email.value; // aibhabe input field e ja dibo ta ai event.target r vhitor peye jabo
        const password = form.password.value;
        console.log(email, password);
        // email pass ta create/login e dite hobe tai evenet diye ber kore enechi

        //validation (ager state r lekha reset kore deo)
        setError('');
        setSuccess('');
        // normally sign in e validation lage na
        // if (password.length < 6) {
        //     setError('insert atleast 6 character password')
        //     return;
        // }
        // else if (!/(?=.*[0-9])/.test(password)) {
        //     setError('Please add atleast one numbers');
        //     return;
        // }
        // else{
        //     setSuccess('sucess')
        // }

        
        // firebase e thakte hobe ai email mane register korar pore sign korte parbo mail pass firebase r sathe mille
        // firebase intregation(sign in) to match mail,pass of existing user
        // const auth = getAuth(app);
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                event.target.reset();               // login success hole form ta k khali kore dibo
                setError('');
                setSuccess('successfully login');
                if(!user.emailVerified) {
                    alert('Your email is not verified! To verify your mail first Register and verify that mail please')
                }
            })
            .catch(error => {
                console.log(error.message);
                setError(error.message)
                setSuccess('')
                return;
            })

    }


    // for reseting password (mail t lagbe tai useref diye field theke padhiye then nilam)
    const handleResetPassword = () => {
        // useref k use korlam
        const email = emailref.current.value; // current dile puro input ta k pabe
        console.log(email);
        // validation
        if (!email) {
            alert('no email found,Please add email');
            return;
        }
        // for firebase intregation to reset password
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Check your mail')
            })
            .catch(error => {
                setError(error.message);
            })
    }



    return (
        <div className='border px-2 mt-2'>
            <h2 className='text-center mt-1'>Please Login</h2>
            <Form className='mb-3' onKeyUp={handleSubmit} onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name='email' ref={emailref} required placeholder="Enter email" />
                    {/*ai emailref k mane ai email ta k akhn emailref diye jkono jaygay use korte parbo puro input ta jabe */}
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' required placeholder="Password" />
                </Form.Group>
                {/* name na dile dhorte parbo na event.target.email/password diye */}

                <Button className='mt-3 mx-auto text-center w-100' variant="primary" type="submit">
                    Submit
                </Button>
            </Form>


            {/* Succesfully login hole mane succes state e kichu thakle agulo dekhabe noyto na */}
            {success ? '' :
                <div>
                    <p>Forget password? Please <button onClick={handleResetPassword} className='btn btn-link m-0 p-0'>Reset Password</button></p>
                    <p className=''>New to this website? Please <Link to='/register'>Register</Link> </p>
                </div>}


            {/* <p>Forget password? Please <button onClick={handleResetPassword} className='btn btn-link m-0 p-0'>Reset Password</button></p> */}

            {/* <p className=''>New to this website? Please <Link to='/register'>Register</Link> </p> */}

            <p className='text-danger mt-2 text-center'>{error}</p>
            {success ? <p className='text-success text-center'>{success}</p> : ''}

        </div>
    );
};

export default Login;