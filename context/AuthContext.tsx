import { createContext, useContext, useEffect, useState } from 'react';
import React from 'react'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth'
//import { auth } from '../firebaseConfig';
import Home from '../pages';
import { LoadingOverlay } from '@mantine/core';
import firebaseApp from "../firebaseConfig";
import {getFirestore,doc,getDoc} from "firebase/firestore"

const auth = getAuth(firebaseApp);

const firestore = getFirestore(firebaseApp)


const AuthContext = createContext({})

export const AuthContextProvider = ({ children }: { children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    uid: user.uid,
                    email: user.email,
                    
                    //displayName: user.displayName
                })
                //console.log(user.email)
            } else {
                setUser(null)
            }
            setLoading(false)
        })

        return () => unsuscribe()
    }, [])

    
    return <AuthContext.Provider value={{ user }}>{user === null ? (loading ? <LoadingOverlay visible={loading} overlayBlur={2} /> : <Home />) : children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)