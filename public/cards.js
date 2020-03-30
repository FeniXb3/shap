export const getCards = (db, gameName, callback) => {
    const cardsRef = db.collection('cards');
    const query = cardsRef.where('game', '==', gameName);
    query.get()
        .then(cards => {
            callback(cards);
        });
};

export const addCards = (db, cards) => {
    const cardsRef = db.collection('cards');
    cards.forEach(c => {
        const {amount, data} = c;
        for (let i = 0; i < amount; i++) {
            cardsRef.doc().set(data);
        }
    });
};

export const displayCards = (db) => {
    getCards(db, 'Catan', (cards) => {
        const parent = document.querySelector('.row');
        cards.forEach(doc => {
            renderCard(parent, doc.data());
        });
    });
};

export const renderCard = (parent, data) => {
    const {type, subType, description, name} = data;
    const element = document.createElement('fragment');
    element.innerHTML = `
        <div class="col s2">
            <div class="card orange darken-3">
            <div class="card-content white-text">
            
                <span class="small">${type}</span>
                <span class="card-title">${name ? name : subType}</span>
                <p>${description ? description : ''}</p>
            </div>
            <div class="card-action white">
                <a href="#">Play</a>
            </div>
            </div>
        </div>
      `;

      parent.appendChild(element);
};

export const shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
};