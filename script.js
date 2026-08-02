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

    const url = imageURL(currentLeft.image_id);

    console.log("Testing:", url);

    document.getElementById("tests").innerHTML = `

        <h2>Direct HTML img</h2>
        <img src="${url}" width="500">

        <h2>CSS background</h2>
        <div style="
            width:500px;
            height:500px;
            background-image:url('${url}');
            background-size:contain;
            background-repeat:no-repeat;
            background-position:center;
        "></div>

    `;
}

init();
