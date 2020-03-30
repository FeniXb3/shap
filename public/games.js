export const getGame = async (db, name) => {
    const gamesRef = db.collection('games');

    const query = gamesRef.doc(name);
    return query.get();
};

export const onGameUpdate = (db, name, callback) => {
    db.collection('games').doc(name).onSnapshot(doc => {
        callback(doc);
    });
};

export const updateGame = (db, name, data) => {
    db.collection('games').doc(name).set(data, { merge: true });
};
