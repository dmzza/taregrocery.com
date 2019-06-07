window.onload = function() {
    let links = document.getElementsByClassName("image-text")
    for(let link of links) {
        link.onmouseover = function(event) {
            let imageId = link.dataset.imageId
            let image = document.getElementById(imageId)
            let companyName = document.getElementById("company-name")
            let primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
            image.style.display = "block"
            link.style.color = primaryColor
            companyName.style.color = "white"

            let boundDimensionByViewport = function(elementStart, elementDimension, viewportDimension, minimumSpaceFromEdge) {
                let elementEnd = elementStart + elementDimension
                var newElementStart = elementStart
                if(elementEnd > viewportDimension - minimumSpaceFromEdge) {
                    newElementStart -= elementEnd - (viewportDimension - minimumSpaceFromEdge)
                }
                return newElementStart
            }

            let linkRect = link.getBoundingClientRect()
            let imageRect = image.getBoundingClientRect()
            let viewportHeight = window.innerHeight
            let viewportWidth = window.innerWidth
            var imageTop = linkRect.bottom - 40
            var imageLeft = linkRect.left + 200
            let minimumSpaceFromEdge = 100

            imageTop = boundDimensionByViewport(imageTop, imageRect.height, viewportHeight, minimumSpaceFromEdge)
            imageLeft = boundDimensionByViewport(imageLeft, imageRect.width, viewportWidth, minimumSpaceFromEdge)

            image.style.top = "" + imageTop + "px"
            image.style.left = "" + imageLeft + "px"
        }
    
        link.onmouseout = function(event) {
            let imageId = link.dataset.imageId
            let image = document.getElementById(imageId)
            let companyName = document.getElementById("company-name")
            let primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
            let x = event.clientX
            let y = event.clientY
            let elementMouseIsOver = document.elementFromPoint(x, y);
            let dismissImage = function(event) {
                image.style.display = "none"
                link.style.color = "white"
                companyName.style.color = primaryColor
            }
            if(elementMouseIsOver !== null && elementMouseIsOver.id !== imageId) {
                dismissImage(event)
            } else {
                image.onmouseout = dismissImage
            }
        }
    }
    
    let modal = document.getElementsByClassName("mailing-list")[0]
    let signUpButton = document.getElementById("signUp")
    signUpButton.onclick = function(event) {
        event.preventDefault()
        modal.style.display = "block"
        window.scrollTo(0, 0)
    }

    let dismissButton = document.getElementById("dismiss")
    dismissButton.onclick = function(event) {
        event.preventDefault()
        modal.style.display = "none"
    }
}