import 'firebase/firestore';

import React, { useEffect, useState } from 'react';

import firebase from '../../../firebase';
import firebaseConfig from '../../../config/firebase';
import { useHistory } from 'react-router-dom';

const Profile = () => {
    const [userName, setUserName] = useState();
    const [salary, setSalary] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const history = useHistory();

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
    }, []);

    return (
        <div style={{ textAlign: 'center' }}>
            <div>
                <h1>Profile</h1>
                <h2>Welcome to Profile!</h2>
                <h3>{userName}</h3>
                <h3>{phoneNumber}</h3>
                <h3>{salary}</h3>
            </div>
        </div>
    );
};

export default Profile;
