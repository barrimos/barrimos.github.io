import Sidemenu from "./Sidemenu.js"
import Footer from "./Footer.js"


const layout = async (children, rootSrc = './') => {
    return `<div class="wrapper">
        <nav class="sideMenu noSelect" id="sideMenu">
            ${
                await Sidemenu(rootSrc)
                    .then(html => {
                        return html
                    })
            }
        </nav>
        
        <main class="main">
            <div class="topNav-section" id="topNav-section">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <div class="nav-menu">
                                <div class="topLogo">
                                    <img src="./src/img/icon/zmlogo-page-15.png" alt="logo zixma">
                                </div>
                                <div class="btn d-none d-md-block">
                                    <a href="./src/download/Prapas_Resume_2025_EN.pdf" class="Downloadresume" download>Download Resume</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ${children}
        </main>
        <div class="push"></div>
    </div>
    <footer id="footer">${Footer()}</footer>`
}

export default layout