import 'firebase/auth';
import 'firebase/firestore';

import { Button, TextField } from '@material-ui/core';
import { ContactMail, VpnKeyTwoTone } from '@material-ui/icons';
import React, { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../../AuthProvider';
import firebase from '../../../firebase';
import { useHistory } from 'react-router-dom';

interface UserData {
    email: string;
    password: string;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Login = () => {
    const authContext = useContext(AuthContext);
    const { loadingAuthState } = useContext(AuthContext);
    const history = useHistory();
    const [values, setValues] = useState({
        email: '',
        password: ''
    } as UserData);

    const db = firebase.firestore();

    const setUserProfile = async () => {
        if (await isUserExists()) {
            return;
        }

        const currentUser = firebase.auth().currentUser!;
        db.collection('Users')
            .doc(currentUser.uid)
            .set({
                username: currentUser.displayName
            })
            .then(() => {
                console.log('Saved');
                return;
            })
            .catch(error => {
                console.error(error.message);
                alert(error.message);
            });
    };

    const isUserExists = async () => {
        const doc = await db.collection('users').doc(firebase.auth().currentUser!.uid).get();
        return doc.exists;
    };

    const redirectToTargetPage = () => {
        history.push('/dashboard');
    };

    useEffect(() => {
        firebase
            .auth()
            .getRedirectResult()
            .then(result => {
                if (!result || !result.user || !firebase.auth().currentUser) {
                    return;
                }

                return setUserProfile().then(() => {
                    redirectToTargetPage();
                });
            })
            .catch(error => {
                console.log(error, 'error');
            });
        // eslint-disable-next-line
    }, []);

    const handleClick = () => {
        history.push('/auth/signup');
    };

    const onChange = (event: any) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();

        firebase
            .auth()
            .signInWithEmailAndPassword(values.email, values.password)
            .then(res => {
                console.log(res, 'res');
                authContext.setUser(res);
                history.push('/dashboard');
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message);
            });
    };

    const handleSocialClick = (sns: any) => {
        console.log(sns, 'sns');

        let provider: firebase.auth.AuthProvider;
        switch (sns) {
            case 'Facebook':
                provider = new firebase.auth.FacebookAuthProvider();
                console.log(provider, 'fbprovider');
                break;

            case 'Google':
                provider = new firebase.auth.GoogleAuthProvider();
                console.log(provider, 'gprovider');
                break;

            case 'Twitter':
                provider = new firebase.auth.TwitterAuthProvider();
                break;

            default:
                throw new Error('Unsupported SNS' + sns);
        }

        firebase.auth().signInWithRedirect(provider).catch(handleAuthError);
    };

    const handleAuthError = (error: firebase.auth.Error) => {
        console.log(error);
    };

    if (loadingAuthState) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    return (
        <div className="Login h-full" style={{ background: 'url("/images/landing.jpg")' }}>
            <div className="flex justify-center items-center h-full">
                <div />
                <div className="lg:w-1/5">
                    <form onSubmit={handleSubmit} className="opacity-90 bg-white rounded px-8 py-8 pt-8">
                        <div className="py-4">
                            <TextField
                                type="email"
                                name="email"
                                fullWidth
                                value={values.email}
                                label="Email"
                                variant="outlined"
                                placeholder="jonhdoe@example.com"
                                onChange={event => onChange(event)}
                            />
                        </div>
                        <div className="py-4">
                            <TextField
                                type="password"
                                name="password"
                                fullWidth
                                value={values.password}
                                label="Password"
                                variant="outlined"
                                placeholder="Enter your password"
                                onChange={onChange}
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
                                Login
                            </Button>
                        </div>
                        <div className="py-4 text-center">
                            <p>Not logged in yet?</p>
                            <Button
                                onClick={handleClick}
                                variant="contained"
                                color="secondary"
                                fullWidth
                                endIcon={<ContactMail />}
                            >
                                SignUp
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
            {/* <p>Social SignUp</p>
            <button onClick={() => handleSocialClick('Facebook')}>SignIn with Facebook</button>
            <br />
            <br />
            <button onClick={() => handleSocialClick('Google')}>SignIn with Google</button>
            <br />
            <br />
            <button onClick={() => handleSocialClick('Twitter')}>SignIn with Twitter</button>
            <br />
            <br /> */}
        </div>
    );
};

export default Login;
