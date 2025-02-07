const ButtonChangePage = (props) => {
    const { isDisabled, currentPage, name, inner, onClick, value, isActive } = props

    // Create the button dynamically
    const button = document.createElement('button')
    button.type = 'button'
    button.name = name
    button.className = `btn-control-topic ${name} ${isActive ? 'active' : ''}`
    button.disabled = isDisabled
    button.dataset.currPage = currentPage
    if (value) button.value = value
    button.innerHTML = inner
    
    // Attach the click event listener
    button.addEventListener('click', onClick)
    
    return button
}

export default ButtonChangePage