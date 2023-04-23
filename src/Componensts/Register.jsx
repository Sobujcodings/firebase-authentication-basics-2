import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom'
import './Register.css'
import app from '../firebase/firebase.confiq';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";


// register e user create korbo
// login page a existed user k login korabo(pass,mail thik thakle)


const Register = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showpass, setShowPass] = useState(false);

    const auth = getAuth(app);
    // ai app takei firebase.config.js file theke ana lagbe


    // Change hole output pete thakbo
    const handlEmailChange = (event) => {
        // console.log(event.target.value);
        // setEmail(event.target.value)
    }

    // field blur hole output ta pabo focus e thakle pabo na
    const handlePassChange = (event) => {
        // console.log(event.target.value);
        // setPass(event.target.value)

    }




    // firebase intregation
    // event handler for the whole submit
    // shob data deyar por akbare submit korte chaile(tobe refresh hoya prevent korte hobe onno page e jay normally)
    const handleSubmit = (event) => {
        event.preventDefault();

        // form e akadhik field thake jeta nite chao shei field r value bolte hobe
        const email = event.target.email.value;
        const password = event.target.password.value;
        const name = event.target.name.value;
        // console.log(name, email, password);

        // validation r age ager state r msg k reset kore dite hobe
        setError('');
        setSuccess('');
        // input validation (error r jonno validation aijonno not/na mille error msg state padhabo-success dekhabo login sucess er shomoy
        if (!/(?=.*[0-9].*[0-9])/.test(password)) {
            setError('Please add atleast two numbers');
            return;
        }
        else if (password.length < 6) {
            setError('Need atleast 6 digits');
            return;
        }
        else if (!/(?=.*[!@#$&*])/.test(password)) {
            setError('insert atleast one speacial character');
            return; // return na korle shamne jeye login kore felba
        }

        // submit r data pawar pore new user create korte hobe then firebase e save hobe ata korle
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                // console.log(loggedUser);
                event.target.reset();                               // login success hole pura form ta reset/khali hoye jabe(event.targer ta holo pura submit r form ta)
                setError('');                                       // login hoye gele r error dekhabo na
                setSuccess('');
                setSuccess('Account has been created Succesfully') // success hole state e ata thakbe sheta dekhabo niche
                UpdateUserData(result.user, name); // calling and passign user and name
                EmailVerification(loggedUser);
            })
            .catch(error => {
                console.error(error.message);
                setError(error.message);
                setSuccess('');                                 // error khele error ta dekhabo succes e kichu dekhabo na
            })

    }
    // firebase r user e add hoye jabe shei email
    // 2 ta state declare kore show koriye rakhbo jokhon jei condition sheta fullfull/wrong hole input set kore dibo set funciton e




    // verify email (alada btn lagbe na register/create r vhitor thekei user diye call diye kore felbo sathe sathe)
    // (registration r shomoy mail k verify kore felbo mail e link jabe then verify korlei registration 
    // complete hobe then shei mail pass diye login korte parbo R user r email.varified = true na hole login page e 
    // login korabo na warning diye return kore dibo hush hush)
    const EmailVerification = (user) => {
        // console.log(user);
        sendEmailVerification(user)
            .then(() => {
                alert(`Verification mail has been send to ${user.email} then login`);
                // verify the mail then login into the system with the registered mail pass after verification
            })
            .catch(error => {
                setError(error.message);
                return;
            })
    }




    // to update the name (will update inside the user DisplayName to see it console the user)
    const UpdateUserData = (user, name) => {
        // console.log(user, name);
        updateProfile(user, {
            displayName: name

        })
            .then(() => {
                setSuccess('name updated');
                return;
            })
            .catch(error => {
                setError(error.message)
            })

        // name k useref e padhiye dilam for further use
    }



    return (
        <div className='border mt-2 text-center p-1'>
            <h2>Please Register</h2>
            <form onKeyUp={handleSubmit} onSubmit={handleSubmit}>
                <input className='mb-2 mt-2 px-3 text-center py-1' type="text" required id='name' placeholder='Enter your name' />
                <br />
                <input className='mb-2 mt-2 px-3 text-center py-1' onChange={handlEmailChange} type="email" required id='email' placeholder='Enter your email' />
                <br />
                <input className='mb-3 px-3 text-center py-1' onBlur={handlePassChange} type={showpass ? 'text' : 'password'} required id='password' placeholder='Enter your password' />
                <br />


                {/* show-hide btn (uporer type change r ekhane btn) true howa mane no change(prothome) */}
                {showpass ? 
                <button className='btn btn-link' onClick={() => setShowPass(false)}>Hide</button> : 
                <button className='btn btn-link' onClick={() => setShowPass(true)}>show</button>}


                <input className='submit btn btn-primary' type="submit" id='submit' value='Register' />
            </form>

            {/* {success ? '' : <p className='mt-2'>Already have an account? Please <Link to='/login'>Sign in</Link> </p>} */}
            <p className='mt-2'>Already have an account? Please <Link to='/login'>Sign in</Link> </p>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>


        </div>
    );
};

export default Register;