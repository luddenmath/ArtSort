const API =
"https://openaccess-api.clevelandart.org/api/artworks/?limit=100&q=painting";


let artworks=[];

let leftPainting;
let rightPainting;


let ratings = JSON.parse(
    localStorage.getItem("artRatings")
) || {};



async function init(){

    const response = await fetch(API);

    const data = await response.json();


    artworks = data.data.filter(
        art => art.images && art.images.web
    );


    console.log("Loaded:", artworks.length);


    nextPair();

}



function getRating(art){

    if(!ratings[art.id]){

        ratings[art.id]={
            elo:1500,
            wins:0,
            losses:0
        };

    }

    return ratings[art.id];

}



function nextPair(){

    leftPainting=randomArtwork();

    rightPainting=randomArtwork();


    while(leftPainting.id===rightPainting.id){

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

    choose(leftPainting,rightPainting);

};


document
.getElementById("rightCard")
.onclick=function(){

    choose(rightPainting,leftPainting);

};





function choose(winner,loser){

    updateElo(winner,loser);


    saveRatings();


    document.getElementById("result").innerHTML =
    `
    Winner:<br>
    <b>${winner.title}</b>
    <br><br>

    Rating:
    ${Math.round(getRating(winner).elo)}

    `;


    setTimeout(nextPair,1500);

}





function updateElo(winner,loser){

    let winnerRating=getRating(winner);

    let loserRating=getRating(loser);


    let expectedWinner =
        1 /
        (
            1 +
            Math.pow(
                10,
                (loserRating.elo - winnerRating.elo)/400
            )
        );


    const K=32;


    winnerRating.elo +=
        K*(1-expectedWinner);


    loserRating.elo +=
        K*(0- (1-expectedWinner));


    winnerRating.wins++;

    loserRating.losses++;


}





function saveRatings(){

    localStorage.setItem(
        "artRatings",
        JSON.stringify(ratings)
    );

}



init();
