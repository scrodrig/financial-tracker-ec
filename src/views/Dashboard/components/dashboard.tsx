import 'firebase/firestore';

import React, { useEffect, useState } from 'react';

import firebase from '../../../firebase';
import firebaseConfig from '../../../config/firebase';
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
    const [userName, setUserName] = useState();
    const [salary, setSalary] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const history = useHistory();
    const needsEmailAuthentication = firebase.auth().currentUser?.emailVerified || false;

    const handleLogout = (event: any) => {
        event.preventDefault();
        firebase
            .auth()
            .signOut()
            .then(res => {
                history.push('/auth/login');
            });
    };

    const handleVerification = (event: any) => {
        event.preventDefault();
        firebase
            .auth()
            .currentUser!.sendEmailVerification({
                url: firebaseConfig.redirectEmailConfirmation || ''
            })
            .then(function () {
                // Email sent.
                console.log('check your mail');
            })
            .catch(function (error) {
                alert(error.message);
            });
    };

    const redirectToProfilePage = () => {
        history.push('/profile');
    };

    useEffect(() => {
        const db = firebase.firestore();
        db.collection('Users')
            .doc(firebase.auth().currentUser!.uid)
            .get()
            .then(res => {
                const user = res.data();
                if (user) {
                    setUserName(user['username']);
                    setPhoneNumber(user['phone']);
                    setSalary(user['salary']);
                }
            })
            .then(() => {
                console.log('salary', salary)
                if (!salary) {
                    redirectToProfilePage()
                }
            });
        // console.log('salary');
        // if (!salary) {
        //     redirectToProfilePage();
        // }
    }, []);

    return (
        <div style={{ textAlign: 'center' }}>
            {needsEmailAuthentication ? (
                <div>
                    <h1>Dashboard</h1>
                    <h2>Welcome to Dashboard!</h2>
                    <h3>{userName}</h3>
                    <h3>{phoneNumber}</h3>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div>
                    <button onClick={handleLogout}>Logout</button>
                    <button onClick={handleVerification}>Send email</button>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
