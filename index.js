
const accessKey = "MwpdNUDzarK8RW_XCz0_jQ-B1hithAVWXLO0x-UlTPk";

const myForm = document.getElementById("search-form");
const myInput = document.querySelector(".search-box");
const resultContainer = document.getElementById("result-container");
const notice = document.querySelector(".notice");
const myButton = document.querySelector(".search-btn");
const myShowMore = document.getElementById("showMore-btn");

let inputedData = "";
let page = 1;

async function searchImages(){
    inputedData = myInput.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputedData}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;
    console.log(results);

    if(page == 1){
        resultContainer.innerHTML = ""
    }
    page++
    
    if(results == 0) {
        notice.style.opacity = 1;
        myShowMore.style.display = "none"
    }else{
        notice.style.opacity = 0;
        myShowMore.style.display = "block";
    }
    
    results.map((result) => {
        const image = document.createElement("img");
        image.src = result.urls.small;

        const imgWrapper = document.createElement("div");
        imgWrapper.classList.add("img-wrapper"); 

        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";

        imgWrapper.appendChild(imageLink); 
        imageLink.appendChild(image);
        resultContainer.appendChild(imgWrapper);
    });

};

myForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

myShowMore.addEventListener("click", () => {
    searchImages();
});

