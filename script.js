const API =
"https://api.artic.edu/api/v1/artworks/search?q=painting&fields=id,title,image_id,artist_title,date_display&page=1&limit=100";

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
    currentRight = randomArtwork();

    while(currentLeft.id===currentRight.id){

        currentRight=randomArtwork();

    }

    leftImage.src=imageURL(currentLeft.image_id);
    rightImage.src=imageURL(currentRight.image_id);

}

init();
