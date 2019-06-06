window.onload = function() {
    let links = document.getElementsByClassName("image-text")
    for(let link of links) {
        link.onmouseover = function(event) {
            let imageId = link.dataset.imageId
            let image = document.getElementById(imageId)
            image.style.display = "block"

            let boundDimensionByViewport = function(elementStart, elementDimension, viewportDimension, margin) {
                let elementEnd = elementStart + elementDimension
                var newElementStart = elementStart
                if(elementEnd > viewportDimension - margin) {
                    newElementStart -= elementEnd - (viewportDimension - margin)
                }
                return newElementStart
            }

            let linkRect = link.getBoundingClientRect()
            let imageRect = image.getBoundingClientRect()
            let viewportHeight = window.innerHeight
            let viewportWidth = window.innerWidth
            var imageTop = linkRect.bottom
            var imageLeft = linkRect.left
            let margin = 30

            imageTop = boundDimensionByViewport(imageTop, imageRect.height, viewportHeight, margin)
            imageLeft = boundDimensionByViewport(imageLeft, imageRect.width, viewportWidth, 15)

            image.style.top = "" + imageTop + "px"
            image.style.left = "" + imageLeft + "px"
        }
    
        link.onmouseout = function(event) {
            let imageId = link.dataset.imageId
            let image = document.getElementById(imageId)
            let x = event.clientX
            let y = event.clientY
            let elementMouseIsOver = document.elementFromPoint(x, y);
            if(elementMouseIsOver !== null && elementMouseIsOver.id !== imageId) {
                image.style.display = "none"
            } else {
                image.onmouseout = function(event) {
                    image.style.display = "none"
                }
            }
        }
    }
    
}