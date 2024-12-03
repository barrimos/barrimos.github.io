const toggleCert = () => {
    let openModal = false;
    const selectedCert = document.getElementsByClassName('modalEnlarge')[0]
    const srcModalImg = document.getElementsByClassName('enlargeImg')[0]
    const certImgProject = document.querySelectorAll('.certImg.projectLink')
    const modalEnlarge = document.querySelector('.modalEnlarge')

    const enlarge = (e) => {
        selectedCert.style.display = 'flex'
        srcModalImg.setAttribute('src', `./src/img/${e.attributes.folder.value}/${e.name}.jpg`)
        document.getElementsByTagName('BODY')[0].style.overflow = 'hidden'
        openModal = true
    }

    const closeModal = () => {
        if (openModal) {
            selectedCert.style.display = 'none'
            srcModalImg.setAttribute('src', '#')
            document.getElementsByTagName('BODY')[0].style.overflow = ''
            openModal = false
        } else {
            return
        }
    }

    certImgProject.forEach(elem => {
        elem.addEventListener('click', e => {
            enlarge(e.target)
        })
    })

    modalEnlarge.addEventListener('click', e => {
        closeModal()
    })
}