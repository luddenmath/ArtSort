const API =
"https://openaccess-api.clevelandart.org/api/artworks/?limit=10&q=painting";


async function load(){

    const response = await fetch(API);

    const data = await response.json();

    console.log(data);

    const artworks = data.data.filter(
        x => x.images && x.images.web
    );

    console.log(artworks);


    artworks.forEach(art => {

        const img = new Image();

        img.width = 300;

        img.src = art.images.web.url;

        document.body.appendChild(img);


        const text=document.createElement("p");

        text.innerHTML =
        `${art.title}<br>${art.creators?.[0]?.description || ""}`;

        document.body.appendChild(text);

    });

}


load();
