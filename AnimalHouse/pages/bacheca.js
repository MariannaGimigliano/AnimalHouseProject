document.onload = loadpage();


async function loadpage() {
    getPosts();
}

function getPosts() {
    let request = new XMLHttpRequest()
    request.open('GET', "../getPosts", true);
    request.send();
    request.onload = () => {
        if (request.status == 200) {
            var postsJson = JSON.parse(request.response);
            drawPosts(postsJson);
        } else {
            console.log("error:" + request.status);
        }
    }
}

function drawPosts(posts) {
    var bachecaPosts = document.getElementById("bachecaPosts");

    for (var i = 0; i < posts.length; i++) {
        var div = document.createElement("div");
        div.setAttribute("class", "rounded p-3 p-md-3 m-md-3 mb-10 text-center bg-info");

        p = document.createElement("p");
        p.innerHTML = posts[i].user + " ha pubblicato: " + posts[i].phrase;  

        div.appendChild(p);

        bachecaPosts.appendChild(div);


    }

}