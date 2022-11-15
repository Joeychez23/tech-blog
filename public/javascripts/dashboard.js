//Create new blog
async function logToDash(event) {
    event.preventDefault();

    const title = document.getElementById('blogTitle').value.trim();
    const content = document.getElementById('blogContent').value.trim();

    if (title && content) {

        //What to send
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, content })
        }

        //Send / Receive             //Location
        const response = await fetch('/api/blogs/', options);

        //If received successfully
        if (response.ok) {
            document.location.replace(`/dashboard`);
        } else {
            alert(response.statusText);
        }
    }
}




//Sets users screen to allow the update 
async function upBlog(event) {
    const title = document.getElementById('blogTitle')
    const content = document.getElementById('blogContent')
    //If more then 1 of the same button / event is present then event.target allows the computer to accosiate which element called the event
    //Thus the correct blog id attribute can be grabed from getAttribute()
    const id = event.target.getAttribute('blogId');

    const options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    }

    //Send / Receive               //Location
    const response = await fetch(`/api/blogs/getBlog/${id}`, options);

    //If received successfully
    if (response.ok) {
        let data = await response.json();
        title.value = `${data.title}`;
        content.value = `${data.description}`;
        let upEl = document.querySelector('#subUp')
        upEl.style.display = 'inline';
        upEl.setAttribute('blogId', `${data.id}`)


    } else {
        alert('Failed to delete blog');
    }
}


//Sends the update request to the server and reload the page if successful
async function upToDash(event) {
    event.preventDefault();


    const title = document.getElementById('blogTitle').value.trim();
    const content = document.getElementById('blogContent').value.trim();


    const id = document.querySelector('#subUp').getAttribute('blogId');

    if (title && content) {

        //What to send
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id, title, content })
        }

        //Send / Receive             //Location
        const response = await fetch(`/api/blogs/${id}`, options);

        //If received successfully
        if (response.ok) {
            document.location.replace(`/dashboard`);
        } else {
            alert(response.statusText);
        }
    }
}



async function delBlog(event) {
    //If more then 1 of the same button / event is present then event.target allows the computer to accosiate which element called the event
    //Thus the correct blog id attribute can be grabed from getAttribute()
    const id = event.target.getAttribute('blogId');

    //What to send
    const options = {
        method: 'DELETE',
    }

    //Send / Receive               //Location
    const response = await fetch(`/api/blogs/${id}`, options);

    //If received successfully
    if (response.ok) {
        document.location.replace(`/dashboard`);
    } else {
        alert('Failed to delete blog');
    }
}






//Frontend Events
document.querySelector('#creUp').addEventListener('click', logToDash);

document.querySelector('#subUp').addEventListener('click', upToDash);

let delBlogBtn = document.querySelectorAll('.delBtn');


if (delBlogBtn != null) {
    for (let i = 0; i < delBlogBtn.length; i++) {
        delBlogBtn[i].addEventListener('click', delBlog);
    }
}


let upBlogBtn = document.querySelectorAll('.upBtn');

if (upBlogBtn != null) {
    for (let i = 0; i < upBlogBtn.length; i++) {
        upBlogBtn[i].addEventListener('click', upBlog);
    }
}