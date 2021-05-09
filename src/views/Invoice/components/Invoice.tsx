import 'firebase/firestore';

import React, { useEffect, useState } from 'react';

import firebase from '../../../firebase';
import firebaseConfig from '../../../config/firebase';
import { useHistory } from 'react-router-dom';

const Invoice = () => {
    return (
        <div style={{ textAlign: 'center' }}>
            <div>
                <h1>Invoice</h1>
            </div>
        </div>
    );
};

export default Invoice;
