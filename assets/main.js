window.onload = function() {
    let links = document.getElementsByClassName("image-text")
    for(let link of links) {
        link.onmouseover = function(event) {
            let imageId = link.dataset.imageId
            let image = document.getElementById(imageId)
            image.style = "display:block;"
        }
    
        link.onmouseout = function(event) {
            let imageId = link.dataset.imageId
            let image = document.getElementById(imageId)
            let x = event.clientX
            let y = event.clientY
            let elementMouseIsOver = document.elementFromPoint(x, y);
            if(elementMouseIsOver !== null && elementMouseIsOver.parentElement.id !== imageId) {
                image.style = "display:none;"
            } else {
                image.onmouseout = function(event) {
                    image.style = "display:none;"
                }
            }
        }
    }
    
}