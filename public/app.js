document.addEventListener("DOMContentLoaded", event => {
    const app = firebase.app();

    auth();
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
    const e = document.createElement('div');
    e.innerText = text;
    document.body.appendChild(e);
};