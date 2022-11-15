async function logout() {

    //What to send
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
    }


    //Send / Receive                //Location
    const response = await fetch('/api/users/logout', options);


    //If received successfully
    if (response.ok) {
        document.location.replace(`/`);
    } else {
        alert(response.statusText);
    }
}



//Frontend Events
let logoutBtn = document.querySelector('#logoutBtn')

if (logoutBtn != null) {
    logoutBtn.addEventListener('click', logout);
}