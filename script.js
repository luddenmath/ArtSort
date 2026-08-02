const images = [

    {
        name: "Art Institute Chicago",
        url: "https://www.artic.edu/iiif/2/0f1cc0e0-e42e-be16-3f71-2022da38cb93/full/843,/0/default.jpg"
    },

    {
        name: "Metropolitan Museum",
        url: "https://images.metmuseum.org/CRDImages/ep/original/DP-14949-001.jpg"
    },

    {
        name: "Wikimedia Commons",
        url: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Vincent_van_Gogh_-_The_Starry_Night_-_Google_Art_Project.jpg"
    },

    {
        name: "Unsplash",
        url: "https://images.unsplash.com/photo-1577083288073-40892c0860a4"
    },

    {
        name: "Wikipedia",
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Mona_Lisa.jpg/800px-Mona_Lisa.jpg"
    },

    {
        name: "NASA",
        url: "https://images-assets.nasa.gov/image/PIA12348/PIA12348~orig.jpg"
    },

    {
        name: "Pexels",
        url: "https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg"
    },

    {
        name: "Picsum",
        url: "https://picsum.photos/500"
    },

    {
        name: "Placehold",
        url: "https://placehold.co/500x500"
    },

    {
        name: "GitHub raw",
        url: "https://raw.githubusercontent.com/github/explore/main/topics/javascript/javascript.png"
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
