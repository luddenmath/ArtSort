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

    <h1>Image Loading Test</h1>

    <h2>1. Plain img src</h2>
    <img src="${url}" width="300">

    <h2>2. JavaScript createElement</h2>
    <div id="test2"></div>

    <h2>3. innerHTML injected img</h2>
    <div>
        <img src="${url}" width="300">
    </div>

    <h2>4. CSS background</h2>
    <div style="
        width:300px;
        height:300px;
        background:url('${url}') center/contain no-repeat;
    "></div>

    <h2>5. Object Image()</h2>
    <div id="test5"></div>

    <h2>6. Picture element</h2>
    <picture>
        <img src="${url}" width="300">
    </picture>

    <h2>7. Figure element</h2>
    <figure>
        <img src="${url}" width="300">
    </figure>

    <h2>8. Link wrapped image</h2>
    <a href="${url}" target="_blank">
        <img src="${url}" width="300">
    </a>

    <h2>9. SVG image embed</h2>
    <svg width="300" height="300">
        <image href="${url}" width="300" height="300"/>
    </svg>

    <h2>10. Canvas draw</h2>
    <canvas id="test10" width="300" height="300"></canvas>

    `;


    // Method 2
    let img2=document.createElement("img");
    img2.src=url;
    img2.width=300;
    document.getElementById("test2").appendChild(img2);


    // Method 5
    let img5=new Image();
    img5.src=url;
    img5.width=300;
    document.getElementById("test5").appendChild(img5);


    // Method 10
    let img10=new Image();
    img10.onload=function(){

        let canvas=document.getElementById("test10");
        let ctx=canvas.getContext("2d");

        ctx.drawImage(img10,0,0,300,300);

    };
    img10.src=url;

}

init();
