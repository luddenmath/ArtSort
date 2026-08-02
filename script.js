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

        <h2>Original img src</h2>
        <img src="${url}" width="300">

        <h2>Created with JavaScript</h2>
        <div id="test2"></div>

        <h2>Background image</h2>
        <div id="test3" style="
            width:300px;
            height:300px;
            background-size:contain;
            background-repeat:no-repeat;
            background-position:center;
        "></div>

        <h2>Object URL blob</h2>
        <div id="test4"></div>

        <h2>Figure tag</h2>
        <figure>
            <img src="${url}" width="300">
        </figure>

    `;


    // Method 2: createElement
    let img = document.createElement("img");
    img.src = url;
    img.width = 300;
    document.getElementById("test2").appendChild(img);


    // Method 3: CSS background
    document.getElementById("test3").style.backgroundImage =
        `url("${url}")`;


    // Method 4: fetch blob
    fetch(url)
    .then(response=>response.blob())
    .then(blob=>{

        let blobImg=document.createElement("img");
        blobImg.src=URL.createObjectURL(blob);
        blobImg.width=300;

        document.getElementById("test4")
        .appendChild(blobImg);

    });

}

init();
