import 'firebase/auth';
import 'firebase/firestore';

import { Button, TextField } from '@material-ui/core';
import { ContactMail, VpnKeyTwoTone } from '@material-ui/icons';
import React, { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../../AuthProvider';
import firebase from '../../../firebase';
import { useHistory } from 'react-router-dom';
import LoadingBar from '../../../components/utils/LoadingBar';

interface FormItems {
    firstName: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const SignUp: React.FunctionComponent = () => {
    const authContext = useContext(AuthContext);
    const { loadingAuthState, authenticated } = useContext(AuthContext);
    const [values, setValues] = useState({
        firstName: '',
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
        const { password, confirmPassword} = values
        if(!passwordMatches(password, confirmPassword)){
            console.error('Passwords are not matching');
            return
        }
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
                        firstName: values.firstName,
                        phone: values.phone
                    })
                    .then(() => {
                        console.log('ok');
                        history.push('/dashboard');
                    })
                    .catch(error => {
                        console.error(error.message);
                        alert(error.message);
                    });
            });
    };

    const passwordMatches = (password:string, repeatedPassword:string) => {
        return password === repeatedPassword
    }

    if (loadingAuthState) {
        return <LoadingBar />;
    }

    return (
        <div className="Login h-full" style={{ background: 'url("/images/landing.jpg")' }}>
            <div className="flex justify-center items-center h-full">
                <div className="lg:w-1/5">
                    <form onSubmit={handleSubmit} className="opacity-90 bg-white rounded px-8 py-8 pt-8">
                        <div className="py-4">
                            <TextField
                                type="text"
                                name="firstName"
                                fullWidth
                                value={values.firstName}
                                label="Name"
                                required
                                variant="outlined"
                                placeholder="Jonh"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="py-4">
                            <TextField
                                type="text"
                                name="phone"
                                fullWidth
                                required
                                value={values.phone}
                                label="Phone"
                                variant="outlined"
                                placeholder="+593 9 000 000 115"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="py-4">
                            <TextField
                                type="email"
                                name="email"
                                fullWidth
                                required
                                value={values.email}
                                label="Email"
                                variant="outlined"
                                placeholder="Enter your Email"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="py-4">
                            <TextField
                                type="password"
                                name="password"
                                fullWidth
                                required
                                value={values.password}
                                label="Password"
                                variant="outlined"
                                placeholder="Enter your password"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="py-4">
                            <TextField
                                type="password"
                                name="confirmPassword"
                                fullWidth
                                required
                                value={values.confirmPassword}
                                label="Repeat Password"
                                variant="outlined"
                                placeholder="Repeat your password"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="py-4 text-center">
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                endIcon={<VpnKeyTwoTone />}
                            >
                                Sign Up
                    </Button>
                        </div>
                        <div className="py-4 text-center">
                            <p>Already have account?</p>
                            <Button
                                onClick={handleClick}
                                variant="contained"
                                color="secondary"
                                fullWidth
                                endIcon={<ContactMail />}
                            >
                                Login
                    </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default SignUp;
