export const getCards = (cardsRef, gameName, callback) => {
    const query = cardsRef.where('game', '==', gameName);
    query.get()
        .then(cards => {
            callback(cards);
        });
};

export const addCards = (cardsRef, cards) => {
    cards.forEach(c => {
        const {amount, data} = c;
        for (let i = 0; i < amount; i++) {
            cardsRef.doc().set(data);
        }
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