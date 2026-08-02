const API =
"https://api.artic.edu/api/v1/artworks/search?q=painting&fields=id,title,image_id,artist_title,date_display&page=1&limit=100";
//ver 2
let artworks = [];
let currentLeft;
let currentRight;

async function init(){

    const response = await fetch(API);

    const data = await response.json();

    artworks = data.data.filter(a => a.image_id);

    console.log(artworks);

    showPair();

}

function randomArtwork(){

    return artworks[
        Math.floor(Math.random()*artworks.length)
    ];

}

function imageURL(imageID){

    return `https://www.artic.edu/iiif/2/${imageID}/full/843,/0/default.jpg`;

}

function showPair(){

    currentLeft = randomArtwork();

    const id = currentLeft.image_id;

    const urls = [
        `https://www.artic.edu/iiif/2/${id}/full/843,/0/default.jpg`,
        `https://www.artic.edu/iiif/2/${id}/full/400,/0/default.jpg`,
        `https://www.artic.edu/iiif/2/${id}/full/200,/0/default.jpg`,
        `https://www.artic.edu/iiif/2/${id}/full/max/0/default.jpg`,
        `https://www.artic.edu/iiif/2/${id}/full/843,/1/default.jpg`,
        `https://www.artic.edu/iiif/2/${id}/full/843,/90/default.jpg`,
        `https://www.artic.edu/iiif/2/${id}/full/843,/default.jpg`,
        `https://www.artic.edu/iiif/2/${id}/full/843,/0/jpg.jpg`,
        `https://www.artic.edu/iiif/2/${id}/full/843,/0/default.png`,
        `https://www.artic.edu/iiif/2/${id}/full/full/0/default.jpg`
    ];

    console.log(urls);

    document.getElementById("tests").innerHTML =
    urls.map((url,i)=>`

        <div style="
            display:inline-block;
            margin:20px;
            width:300px;
            vertical-align:top;
        ">

        <h3>${i+1}</h3>

        <img 
            src="${url}"
            width="300"
            style="
                min-height:200px;
                background:#ddd;
            "
        >

        <p style="font-size:10px;word-break:break-all;">
        ${url}
        </p>

        </div>

    `).join("");

}

init();
