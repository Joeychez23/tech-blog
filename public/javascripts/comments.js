async function createComment(event) {
    event.preventDefault();

    //Grabs blogId from the hjs attribute
    const blogId = document.getElementById('newComBox').getAttribute('blogId');
    //Grabs the users comment from the hjs element
    const description = document.querySelector('#comment_description').value.trim();

    if (description) {

        //What to send
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ blogId, description })
        }

        //Send / Receive             //Location
        const response = await fetch('/api/comments', options);

        //If received successfully
        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to send comment');
        }

    }
}


//Frontend Events
let commentBox = document.getElementById('newComBox')

if (commentBox != null) {
    commentBox.addEventListener('submit', createComment);
}