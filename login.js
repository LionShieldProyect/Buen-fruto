(function () {

const btn = document.getElementById("btn-login");
const err = document.getElementById("login-err");

btn.onclick = async function () {

    const email = document.getElementById("inp-email").value.trim();
    const pass = document.getElementById("inp-pass").value;

    alert("Botón funcionando");

    if (!window._auth) {
        alert("ERROR: _auth no existe");
        return;
    }

    if (!window._signIn) {
        alert("ERROR: signIn no existe");
        return;
    }

    try {

        alert("Firebase encontrado");

        const cred = await window._signIn(window._auth,email,pass);

        alert("LOGIN EXITOSO");

        console.log(cred);

    } catch(e){

        alert(e.code);
        console.error(e);

    }

};

})();
