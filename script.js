const API =
"https://openaccess-api.clevelandart.org/api/artworks/?limit=100&q=painting";


let artworks=[];

let leftPainting;
let rightPainting;


async function init(){

    const response = await fetch(API);

    const data = await response.json();


    artworks = data.data.filter(
        art => art.images && art.images.web
    );


    console.log("Loaded:", artworks.length);


    nextPair();

}



function nextPair(){

    leftPainting = randomArtwork();

    rightPainting = randomArtwork();


    while(leftPainting.id === rightPainting.id){

        rightPainting=randomArtwork();

    }


    document.getElementById("leftImage").src =
        leftPainting.images.web.url;


    document.getElementById("rightImage").src =
        rightPainting.images.web.url;


    document.getElementById("result").innerHTML="";

}



function randomArtwork(){

    return artworks[
        Math.floor(Math.random()*artworks.length)
    ];

}



document
.getElementById("leftCard")
.onclick=function(){

    choose(leftPainting);

};


document
.getElementById("rightCard")
.onclick=function(){

    choose(rightPainting);

};



function choose(winner){

    console.log("Choice:", winner);

    document.getElementById("result").innerHTML =
    `
    You chose:<br>
    <b>${winner.title}</b>
    `;


    setTimeout(nextPair,1500);

}



init();
