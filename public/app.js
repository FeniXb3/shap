document.addEventListener("DOMContentLoaded", event => {
    auth();

    const db = firebase.firestore();
    const cardsRef = db.collection('cards');

    getCards(cardsRef, 'Catan', (cards) => {
        const parent = document.querySelector('.row');
        cards.forEach(doc => {
            renderCard(parent, doc.data());
        });
    });
});

const auth = () => {
    const loading = document.getElementById("loading");
    const button = document.getElementById("login");
    const userNameField = document.getElementById("username");
    firebase.auth().onAuthStateChanged(user => {
        loading.classList.add("hidden");
        if (user) {
            const text = `Hello again ${user.displayName}`;
            addText(text);
        } else {
            console.log(button.classList);
            button.classList.remove("hidden");
            userNameField.classList.remove("hidden");
            addText('Please login');
            button.addEventListener("click", event => {
                const userName = userNameField.value;
                firebase.auth().signInAnonymously()
                    .then(result => {
                        const user = result.user;
                        user.updateProfile({
                            displayName: userName
                        }).then(() => {
                            document.write(`Hello ${user.displayName}`);
                        });
                    });
            });
        }
    });
};

const addText = (text) => {
    const html = `
        <div>
            ${text}
        </div>
    `;
    document.body.innerHTML += html;
};

const getCards = (cardsRef, gameName, callback) => {
    const query = cardsRef.where('game', '==', gameName);
    query.get()
        .then(cards => {
            callback(cards);
        });
};

const addCards = (cardsRef, cards) => {
    cards.forEach(c => {
        const {amount, data} = c;
        for (let i = 0; i < amount; i++) {
            cardsRef.doc().set(data);
        }
    });
};

const renderCard = (parent, data) => {
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