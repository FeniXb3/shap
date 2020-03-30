export const auth = () => {
    document.addEventListener("click", event => {
        if(event.target.id != 'login') {
            return;
        }

        const userName = document.getElementById("username").value;
        firebase.auth().signInAnonymously()
            .then(result => {
                const user = result.user;
                user.updateProfile({
                    displayName: userName
                });
            });
    });
    firebase.auth().onAuthStateChanged(user => {
        const loading = document.getElementById("loading");
        const button = document.getElementById("login");
        const userNameField = document.getElementById("username");

        loading.classList.add("hidden");
        if (user) {
            button.classList.add("hidden");
            userNameField.classList.add("hidden");
            const text = `Hello again ${user.displayName}`;
            addText(text);
        } else {
            button.classList.remove("hidden");
            userNameField.classList.remove("hidden");
            addText('Please login');
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