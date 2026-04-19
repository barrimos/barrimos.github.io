const DownloadButton = () => {
    // render HTML
    const html = `
        <div class="d-none d-md-flex justify-content-center align-items-center">
            <div class="dropdownDownloadCVBtn">
                <input type="checkbox" class="dropdown-toggle" id="dropdownMenuButton">
                <div class="btnDownload">Download<i class="triangleDownIconBtnDownload fa fa-angle-down"></i></div>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a href="./src/download/Prapas_Resume_2026_EN.pdf" class="dropdown-item download resume" download>Resume</a>
                    <a href="./src/download/Prapas_CV_2026_EN.pdf" class="dropdown-item download cv" download>CV</a>
                </div>
            </div>
        </div>
    `

    // bind event หลัง DOM ถูก render
    setTimeout(() => {
        const checkbox = document.getElementById("dropdownMenuButton")
        if (checkbox) {
            checkbox.addEventListener("click", e => {
                document.body.addEventListener("click", ev => {
                    if (checkbox.checked && ev.target !== checkbox) {
                        checkbox.checked = false
                    }
                })
            })
        }
    }, 0)

    return html
}

export default DownloadButton
