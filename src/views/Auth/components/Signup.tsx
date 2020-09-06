import 'firebase/auth';
import 'firebase/firestore';

import React, { useContext, useState, useEffect } from 'react';

import { AuthContext } from '../../../AuthProvider';
import firebase from '../../../firebase';
import { useHistory } from 'react-router-dom';
import LoadingBar from '../../../components/utils/LoadingBar';

interface FormItems {
    username: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const SignUp: React.FunctionComponent = () => {
    const authContext = useContext(AuthContext);
    const { loadingAuthState, authenticated } = useContext(AuthContext);
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        phone: '',
        emailVerified: false,
        confirmPassword: ''
    } as FormItems);

    const history = useHistory();

    useEffect(() => {
        if (authenticated) {
            redirectToTargetPage();
        }
    }, [authenticated]);

    const redirectToTargetPage = () => {
        history.push('/dashboard');
    };

    const handleClick = () => {
        history.push('/auth/login');
    };

    const handleChange = (event: any) => {
        event.persist();
        setValues(values => ({
            ...values,
            [event.target.name]: event.target.value
        }));
    };

    const handleSubmit = (event: any) => {
        event?.preventDefault();
        console.log(values, 'values');
        firebase
            .auth()
            .createUserWithEmailAndPassword(values.email, values.password)
            .then((userCredential: firebase.auth.UserCredential) => {
                authContext.setUser(userCredential);
                const db = firebase.firestore();
                db.collection('Users')
                    .doc(userCredential.user!.uid)
                    .set({
                        email: values.email,
                        username: values.username,
                        phone: values.phone
                    })
                    .then(() => {
                        console.log('ok');
                        history.push('/dashboard');
                    })
                    .catch(error => {
                        console.log(error.message);
                        alert(error.message);
                    });
            });
    };

    if (loadingAuthState) {
        return <LoadingBar />;
    }

    return (
        <div className="Signup h-full" style={{ background: 'url("/images/landing.jpg")' }}>
            <div className="flex justify-center items-center h-full">
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="username" placeholder="Username" onChange={handleChange} />
                    <br />
                    <br />
                    <input type="text" name="phone" placeholder="Phone" onChange={handleChange} />
                    <br />
                    <br />
                    <input type="text" name="email" placeholder="Enter your Email" onChange={handleChange} />
                    <br />
                    <br />
                    <input type="password" name="password" placeholder="Enter your Password" onChange={handleChange} />
                    <br />
                    <br />
                    <button type="submit">Sign Up</button>
                    <p>Already have account?</p>
                    <button onClick={handleClick}>Login</button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
