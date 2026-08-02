const API =
"https://openaccess-api.clevelandart.org/api/artworks/?limit=100&q=painting";


let artworks=[];

let leftPainting;
let rightPainting;

let nextLeftPainting;
let nextRightPainting;

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



async function nextPair(){

    // If we already prepared a pair,
    // use it immediately

    if(nextLeftPainting && nextRightPainting){

        leftPainting = nextLeftPainting;
        rightPainting = nextRightPainting;

        nextLeftPainting = null;
        nextRightPainting = null;

    }
    else {

        leftPainting=randomArtwork();

        rightPainting=randomArtwork();


        while(leftPainting.id===rightPainting.id){

            rightPainting=randomArtwork();

        }

    }


    document.getElementById("leftImage").src =
        leftPainting.images.web.url;


    document.getElementById("rightImage").src =
        rightPainting.images.web.url;



    // start preparing the next choice

    preloadNextPair();

}

async function preloadNextPair(){

    nextLeftPainting=randomArtwork();

    nextRightPainting=randomArtwork();


    while(
        nextLeftPainting.id===
        nextRightPainting.id
    ){

        nextRightPainting=randomArtwork();

    }


    // force browser to download them

    const img1=new Image();

    img1.src=
    nextLeftPainting.images.web.url;



    const img2=new Image();

    img2.src=
    nextRightPainting.images.web.url;



    console.log(
        "Preloaded:",
        nextLeftPainting.title,
        "vs",
        nextRightPainting.title
    );

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

    trackPreference(winner);

    saveRatings();


    document.getElementById("result").innerHTML =
    `
    Winner:<br>
    <b>${winner.title}</b>
    <br><br>

    Rating:
    ${Math.round(getRating(winner).elo)}

    `;


    setTimeout(nextPair,300);

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

document
.getElementById("tasteButton")
.onclick=function(){

    showTaste();

};




function showTaste(){


    let profile =
JSON.parse(
    localStorage.getItem("artProfile")
) || {};
    
    let ranked =
    Object.entries(ratings)

    .map(([id,data])=>{

        let art =
        artworks.find(a=>a.id==id);

        return {

            ...data,
            art

        };

    })

    .filter(x=>x.art)

    .sort(
        (a,b)=>b.elo-a.elo
    );



    let html = `
    <h2>Your Favorite Paintings</h2>
    `;



    ranked
    .slice(0,10)
    .forEach(item=>{

        html += `

        <div style="margin-bottom:20px">

        <img src="${item.art.images.web.url}"
        width="150">

        <br>

        <b>${item.art.title}</b>

        <br>

        ${item.art.creators?.[0]?.description || ""}

        <br>

        Rating:
        ${Math.round(item.elo)}

        <br>

        Wins:
        ${item.wins}

        Losses:
        ${item.losses}

        </div>

        `;

    });

html += "<h2>Your Style Profile</h2>";



function showCategory(name){

    if(!profile[name]) return;


    let sorted =
    Object.entries(profile[name])
    .sort((a,b)=>b[1]-a[1])
    .slice(0,5);


    html += `<h3>${name}</h3>`;


    sorted.forEach(item=>{

        html += `
        ${item[0]}
        —
        ${item[1]} choices
        <br>
        `;

    });

}



showCategory("artists");

showCategory("culture");

showCategory("department");

showCategory("type");

showCategory("classification");

    document.getElementById("taste").innerHTML=html;


    document.getElementById("taste").style.display="block";

}

function trackPreference(art){

    let profile =
    JSON.parse(
        localStorage.getItem("artProfile")
    ) || {};


    function add(category,value){

        if(!value) return;


        if(!profile[category]){

            profile[category]={};

        }


        profile[category][value] =
        (profile[category][value] || 0)+1;

    }



    add(
        "artists",
        art.creators?.[0]?.description
    );


    add(
        "culture",
        art.culture
    );


    add(
        "department",
        art.department
    );


    add(
        "type",
        art.type
    );


    add(
        "classification",
        art.classification
    );


    localStorage.setItem(
        "artProfile",
        JSON.stringify(profile)
    );

}

init();
