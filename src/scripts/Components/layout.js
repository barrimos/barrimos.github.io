import Sidemenu from "./Sidemenu.js"
import Footer from "./Footer.js"
import DownloadButton from "./DownloadButton.js"


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
                                <div class="hamburger hide-md-query">
                                    <input type="checkbox" class="toggler" id="btnToggle" autocomplete="off">
                                    <div class="bars">
                                        <div class="ham-icon" id="ham-icon"></div>
                                    </div>
                                </div>
                                ${DownloadButton()}
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