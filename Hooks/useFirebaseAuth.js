import { useState, useEffect } from 'react';

import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../utils/firebase-config';

import { doc, setDoc } from "firebase/firestore";
import { ToastAndroid } from 'react-native';
import { useAuthContext } from './useAuthContext';

const useFirebaseAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const { setUserId } = useAuthContext();


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user !== null) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                setUser(user)
                const uid = user.uid;
                // ...

                console.log(user)
            } else {
                // User is signed out
                // ...
            }
        });



        return () => unsubscribe();
    }, []);


    const addUser = async (fullname, email, password, id) => {
        await setDoc(doc(db, "Users", id), {
            fullname: fullname,
            email: email,
            password: password
        });

    }


    const CreateUserWithEmailAndPassword = async (fullname, email, password, navigation, reset) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        // Email verification sent!
                        console.log('Email verification sent')
                        ToastAndroid.showWithGravityAndOffset(
                            'Email verification sent',
                            ToastAndroid.LONG,
                            ToastAndroid.BOTTOM,
                            25,
                            50,
                        );
                        reset();
                        // ...
                    });
                const user = userCredential.user;
                // ...
                addUser(fullname, email, password, user.uid)
                navigation.navigate("Login")
                console.log(user.uid)

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..

                console.log(errorMessage)
                setError(errorMessage)
            });

    }

    const SignInWithEmailAndPassword = async (email, password, navigation, reset) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;

                if (user.emailVerified) {
                    navigation.navigate('BottomNavigation', { emailVerified: user.emailVerified, email: user.email });
                    setUserId(user.uid)
                    reset();

                } else {
                    console.log('Email is not verified yet');
                    ToastAndroid.showWithGravityAndOffset(
                        'Email is not verified yet',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        100,
                    );
                }

                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorMessage)
                console.log(errorMessage)
            });


    }

    return {

        CreateUserWithEmailAndPassword, SignInWithEmailAndPassword, error
    };
};

export default useFirebaseAuth;
