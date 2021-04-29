import { useEffect, useState, useCallback } from 'react';
import { auth } from '../helpers/firebase';

const useFirebaseAuth = () => {
	const [ authUser, setAuthUser ] = useState(auth.currentUser);

	// const unsub = useCallback(async () => auth.onAuthStateChanged((user) => setAuthUser(user)), []);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => setAuthUser(user));
		return () => {
			unsubscribe();
		};
	}, []);

	const login = useCallback(async (email, password) => await auth.signInWithEmailAndPassword(email, password), []);

	const logout = useCallback(async () => await auth.signOut(), []);

	return { login, authUser, logout };
};

export { useFirebaseAuth };
