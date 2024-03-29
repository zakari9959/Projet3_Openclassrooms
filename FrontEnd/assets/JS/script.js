function createWorkElement(work) {
    let figurePhoto = document.createElement("figure");
    let figcaptionPhoto = document.createElement("figcaption");
    let imgWork = document.createElement("img");
    imgWork.src = work.imageUrl;
    imgWork.alt = work.title;
    imgWork.crossOrigin = 'same-origin';
    figcaptionPhoto.innerHTML = work.title;
    figurePhoto.classList.add('work');
    figurePhoto.dataset.workcategoryid = work.categoryId;
    figurePhoto.dataset.workid = work.id;
    figurePhoto.appendChild(imgWork);
    figurePhoto.appendChild(figcaptionPhoto);
    return figurePhoto;
}
function filterWorksByCategoryId(categoryId) {
    const works = document.querySelectorAll('.work');
    if (works) {
        works.forEach(work => {
            let workCategoryId = work.dataset.workcategoryid;
            if (workCategoryId === categoryId || categoryId === 'tous') {
                work.style.display = 'block';
            } else {
                work.style.display = 'none';
            }
        })
    };
}
function populateGallery(data) {
    let galleryDiv = document.querySelector('#gallery');
    if (galleryDiv) {
        for (let i = 0; i < data.length; i++) {
            let workElement = createWorkElement(data[i]);
            galleryDiv.appendChild(workElement);
        }
    }
}
initApi()
async function initApi() {
    await fetch("http://localhost:5678/api/works")
        .then(response => response.json())
        .then(data => {
            populateGallery(data);
        })
        .then(() => {
            document.querySelectorAll(".filtre").forEach(filtre => {
                filtre.addEventListener("click", function () {
                    const categoryId = this.getAttribute("data-categoryId");
                    filterWorksByCategoryId(categoryId);
                });
            })
        });
}
const modal = document.getElementById("modale");
modal.addEventListener("onhidden", function () {
    console.log(ok);
    initApi()
});