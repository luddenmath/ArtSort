const images = [

    {
        name: "Cleveland Museum of Art",
        url: "https://openaccess-cdn.clevelandart.org/1942.647/1942.647_web.jpg"
    },

    {
        name: "Rijksmuseum",
        url: "https://lh3.ggpht.com/CI7H7M8W3Z7Wzq8Q9fZJkY2GJ2nQ6u3J7Q0nVZx1qQ9qv2rJ3gVY8r0VJ7cVj8pKJm4Q=w1000"
    },

    {
        name: "Harvard Art Museums",
        url: "https://hvrd.artmuseum.harvard.edu/sites/default/files/styles/image_1200/public/2023-01/2006.100.jpg"
    },

    {
        name: "Europeana",
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Rembrandt_-_The_Night_Watch_-_Google_Art_Project.jpg/800px-Rembrandt_-_The_Night_Watch_-_Google_Art_Project.jpg"
    },

    {
        name: "Google Arts & Culture",
        url: "https://lh3.googleusercontent.com/ci/AI5c3wFh0x5ZVJvXJ7Z7J8W8Kxw1X2Y3Z4"
    },

    {
        name: "Smithsonian Open Access",
        url: "https://ids.si.edu/ids/deliveryService?id=SAAM-1971.374.4_1"
    },

    {
        name: "Library of Congress",
        url: "https://tile.loc.gov/storage-services/service/pnp/cph/3c00000/3c07000/3c07100/3c07153v.jpg"
    },

    {
        name: "National Gallery of Art",
        url: "https://images.nga.gov/en/web_images/constable.jpg"
    },

    {
        name: "Art UK",
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/John_Constable_-_The_Hay_Wain_-_Google_Art_Project.jpg/800px-John_Constable_-_The_Hay_Wain_-_Google_Art_Project.jpg"
    },

    {
        name: "Walters Art Museum",
        url: "https://art.thewalters.org/images/art/PS3_22.20_Fnt_DD_TW.jpg"
    }

];


const container = document.getElementById("imageContainer");


images.forEach(item => {

    const wrapper = document.createElement("div");

    wrapper.innerHTML = `
        <h3>${item.name}</h3>
    `;

    const img = new Image();

    img.width = 300;

    img.onload = () => {
        console.log("LOADED:", item.name);
    };

    img.onerror = () => {
        console.log("FAILED:", item.name);
    };

    img.src = item.url;

    wrapper.appendChild(img);

    container.appendChild(wrapper);

});
