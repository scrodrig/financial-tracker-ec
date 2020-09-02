import 'firebase/auth';
import 'firebase/firestore';

import React, { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../../AuthProvider';
import Button from '@material-ui/core/Button';
import { VpnKeyTwoTone } from '@material-ui/icons';
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
                console.log(error.message);
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

    const handleChange = (event: any) => {
        event.persist();
        setValues(values => ({
            ...values,
            [event.target.name]: event.target.value
        }));
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
        <div style={{ textAlign: 'center' }}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="email"
                    value={values.email}
                    placeholder="Enter your Email"
                    onChange={handleChange}
                />
                <br />
                <br />
                <input
                    type="password"
                    name="password"
                    value={values.password}
                    placeholder="Enter your Password"
                    onChange={handleChange}
                />
                <br />
                <br />
                {/* <button>Login</button> */}
                <Button type="submit" variant="contained" color="primary" endIcon={<VpnKeyTwoTone />}>
                    Login
                </Button>
                <p>Not logged in yet?</p>
                <button onClick={handleClick}>SignUp</button> <br />
                <br />
            </form>

            <p>Social SignUp</p>
            <button onClick={() => handleSocialClick('Facebook')}>SignIn with Facebook</button>
            <br />
            <br />
            <button onClick={() => handleSocialClick('Google')}>SignIn with Google</button>
            <br />
            <br />
            <button onClick={() => handleSocialClick('Twitter')}>SignIn with Twitter</button>
            <br />
            <br />
        </div>
    );
};

export default Login;
