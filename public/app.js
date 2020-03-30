import {auth} from "./auth.js";
import {getCards, renderCard} from "./cards.js";

document.addEventListener("DOMContentLoaded", event => {
    auth();

    const db = firebase.firestore();
    const cardsRef = db.collection('cards');

    displayCards(cardsRef);
});

const displayCards = (cardsRef) => {
    getCards(cardsRef, 'Catan', (cards) => {
        const parent = document.querySelector('.row');
        cards.forEach(doc => {
            renderCard(parent, doc.data());
        });
    });
};