var selectedLink = null

window.onload = function() {
    let links = document.getElementsByClassName("image-text")
    
    for(let link of links) {
        let hoverHandler = function(event) {
            let imageId = link.dataset.imageId
            let image = document.getElementById(imageId)
            image.style.display = "block"
            link.classList.add(["highlighted"])
            selectedLink = link

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
            var imageTop = linkRect.bottom - 30
            var imageLeft = linkRect.left + 200
            let minimumSpaceFromEdge = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--minimum-space-from-edge'))

            imageTop = boundDimensionByViewport(imageTop, imageRect.height, viewportHeight, minimumSpaceFromEdge)
            imageLeft = boundDimensionByViewport(imageLeft, imageRect.width, viewportWidth, minimumSpaceFromEdge)

            image.style.top = "" + imageTop + "px"
            image.style.left = "" + imageLeft + "px"
        }
        link.addEventListener("mouseover", hoverHandler)
        link.addEventListener("touchend", hoverHandler)
    
        link.addEventListener("mouseout", function(event) {
            let imageId = link.dataset.imageId
            let image = document.getElementById(imageId)
            let x = event.clientX
            let y = event.clientY
            let elementMouseIsOver = document.elementFromPoint(x, y)
            let dismissImage = function(event) {
                image.style.display = "none"
                link.classList.remove(["highlighted"])
                selectedLink = null
            }
            if(elementMouseIsOver !== null && elementMouseIsOver.id !== imageId) {
                dismissImage(event)
            } else {
                image.onmouseout = dismissImage
            }
        })
    }

    document.addEventListener("touchstart", function(event) {
        if(selectedLink !== null) {
            let imageId = selectedLink.dataset.imageId
            let x = event.touches[0].clientX
            let y = event.touches[0].clientY
            let elementMouseIsOver = document.elementFromPoint(x, y)
            if(elementMouseIsOver !== null && elementMouseIsOver !== selectedLink && elementMouseIsOver.id !== imageId) {
                let image = document.getElementById(imageId)
                image.style.display = "none"
                selectedLink.classList.remove(["highlighted"])
                selectedLink = null
            }
        }
    })
    
    let modal = document.getElementsByClassName("mailing-list")[0]
    let signUpButton = document.getElementById("signUp")
    let body = document.getElementsByTagName("body")[0]
    signUpButton.onclick = function(event) {
        event.preventDefault()
        modal.style.display = "block"
        body.classList.add(["overflow-hidden"])
        window.scrollTo(0, 0)
    }

    let dismissButton = document.getElementById("dismiss")
    dismissButton.onclick = function(event) {
        event.preventDefault()
        modal.style.display = "none"
        body.classList.remove(["overflow-hidden"])
    }

    let resizeHandler = function() {
        // Mobile Viewport Height: https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
        let vh = window.innerHeight / 100.0
        document.documentElement.style.setProperty('--vh', "" + vh + "px")
    }
    resizeHandler()
    window.addEventListener("resize", function(event) {
        requestAnimationFrame(resizeHandler)
    })
}