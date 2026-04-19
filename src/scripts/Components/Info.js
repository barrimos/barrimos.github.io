const Info = () => {
    const html = `
        <div class="infoWrapper">
            <input type="checkbox" name="checkboxToggleInfo" class="checkboxToggleInfo" checked>
            <div class="infoBox">
                <p>- swip right to open menu</p>
                <p>- swip left to close menu</p>
            </div>
        </div>
    `

    setTimeout(() => {
        document.querySelector('.checkboxToggleInfo').checked = false
    }, 5000)

    return html
}

export default Info