import {auth} from "./auth.js";
import {getCards, shuffle} from "./cards.js";
import {onGameUpdate, updateGame} from "./games.js";

document.addEventListener("DOMContentLoaded", event => {
    (async () => {          
        auth();
    
        const gameName = window.location.search.substr(1, );
        if(gameName) {
            const db = firebase.firestore();
        
            onGameUpdate(db, gameName, doc => {
                const data = doc.data();

                if(!data.decks && Object.keys(data.players).length == 3) {
                    //displayCards(db);
                    let decks = {};
                    getCards(db, 'Catan', (cards) => {
                        cards.forEach(doc => {
                            const data = doc.data();
                            if (!decks[data.type]) {
                                decks[data.type] = [data];
                            } else {
                                decks[data.type].push(data);
                            }
                        });
                        decks['Karta rozwoju'] = shuffle(decks['Karta rozwoju']);
                        updateGame(db, gameName, { decks });
                    });
                } else if (data.decks) {
                    console.log(`Karty są! ${data.decks}`);
                    // add draw buttons (surowece/rozwój)
                    console.log(firebase.auth().currentUser);
                }
                
            });

            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    const { uid } = user;
                    let data = {
                        players : {}
                    };

                    data.players[uid] = {
                        id: uid,
                        hand: []
                    };
                    updateGame(db, gameName, data);
                }
            });
        }
    })();
});
