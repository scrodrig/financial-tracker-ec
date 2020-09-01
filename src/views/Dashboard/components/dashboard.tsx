import 'firebase/firestore';

import React, { useEffect, useState } from 'react';

import firebase from '../../../firebase';
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
    const [userName, setUserName] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const history = useHistory();

    const handleClick = (event: any) => {
        event.preventDefault();

        firebase
            .auth()
            .signOut()
            .then(res => {
                history.push('/auth/login');
            });
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
                }
            });
    }, []);

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Dashboard</h1>
            <h2>Welcome to Dashboard!</h2>
            <h3>{userName}</h3>
            <h3>{phoneNumber}</h3>
            <button onClick={handleClick}>Logout</button>
        </div>
    );
};

export default Dashboard;
