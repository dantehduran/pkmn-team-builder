import { useCallback } from 'react';
import { fs, timestamp } from '../helpers/firebase';

export const useFirestore = () => {
	//get team by user
	const getTeams = useCallback((uid, onUpdate) => {
		fs.collection('teams')
			.where('user', '==', uid)
			.orderBy('createdAt', 'asc')
			.onSnapshot(onUpdate);
	}, []);

	const getTeamsList = useCallback((uid, onUpdate) => {
		fs.collection('teams')
			.where('user', '==', uid)
			.orderBy('createdAt', 'asc')
			.get()
			.then(onUpdate);
	}, []);

	//get team selected
	const getTeam = useCallback((teamId, onUpdate) => {
		fs.collection('teams').doc(teamId).get().then(onUpdate);
	}, []);

	const saveDoc = useCallback(
		async (path, doc) =>
			await fs.collection(path).add({ ...doc, createdAt: timestamp }),
		[]
	);

	const getCollection = useCallback(
		(path, onUpdate) =>
			fs.collection(path).orderBy('createdAt', 'asc').onSnapshot(onUpdate),
		[]
	);

	//update team selected
	const updateTeam = useCallback(
		(teamId, doc) => fs.collection('teams').doc(teamId).update(doc),
		[]
	);

	const deleteDoc = useCallback((path, docId) => {
		fs.collection(path).doc(docId).delete();
	}, []);

	return {
		getTeams,
		getTeam,
		updateTeam,
		getCollection,
		deleteDoc,
		saveDoc,
		getTeamsList,
	};
};
