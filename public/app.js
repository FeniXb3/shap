import {auth} from "./auth.js";
// import {displayCards} from "./cards.js";
import {onGameUpdate, updateGame} from "./games.js";

document.addEventListener("DOMContentLoaded", event => {
    (async () => {          
        auth();
    
        const gameName = window.location.search.substr(1, );
        if(gameName) {
            const db = firebase.firestore();
        
            onGameUpdate(db, gameName, doc => {
                console.log(doc.data());
            });

            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    const { uid } = user;
                    let data = {
                        players : {}
                    };

                    data.players[uid] = {
                        id: uid
                    };
                    updateGame(db, gameName, data);
                }
            });
        }
    })();
});
