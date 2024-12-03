import TopButton from "./TopButton.js"
import migrationListProjects from "./migrationListProjects.js"

/**
 * 
 * @param {*} rootSrc default--> ./
 * @returns 
 */
const Sidemenu = async (rootSrc = './') => {
    return `<div class="hamburger">
    <input type="checkbox" class="toggler" id="btnToggle" autocomplete="off">
    <div class="bars">
        <div class="ham-icon" id="ham-icon"></div>
    </div>
    </div>
    <div class="nav-side-menu" id="sideNav-left">
    <ul class="underlist">
        <li class="list-item data-list-url">
            <a href="/" class="nav-link" title="Home" id="index">
                <div class="nav-icon" data-icon="index">
                    <img src="${rootSrc}src/img/icon/social-23.svg" alt="Home">
                </div>
                <span class="nav-text" data-text="index">HOME</span>
            </a>
        </li>
        <li class="list-item data-list-url">
            <a href="../../profile.html" class="nav-link" title="Profile" id="profile">
                <div class="nav-icon" data-icon="profile">
                    <img src="${rootSrc}src/img/icon/social-09.svg" alt="Profile">
                </div>
                <span class="nav-text" data-text="profile">PROFILE</span>
            </a>
        </li>
        <li class="list-item has-treeview data-list-url">
            <a href="javascript:void(0)" class="nav-link btnDropmenu" title="Zxsandbox" id="zxsandbox">
                <div class="nav-icon" data-icon="zxsandbox">
                    <img src="${rootSrc}src/img/icon/social-37.svg" alt="Service">
                </div>
                <span class="nav-text" data-text="zxsandbox">ZXSANDBOX</span>
                <div class="iconArrowdrop">
                    <svg viewbox="0 0 40 40" width="15" heigth="15">
                        <path 
                            d = "M0.5 10 L19 30 L35 10"
                            fill = "none"
                            stroke-width = "4"
                        />
                    </svg>
                </div>
            </a>
            <ul class="underlist" id="projectLists">
                ${
                    await migrationListProjects(rootSrc)
                        .then(html => {
                            return html
                        })
                }
            </ul>
        </li>
        <li class="list-item data-list-url">
            <a href="../../blog.html" class="nav-link" title="Blog" id="blog">
                <div class="nav-icon" data-icon="blog">
                    <img src="${rootSrc}src/img/icon/social-33.svg" alt="Blog">
                </div>
                <span class="nav-text" data-text="blog">BLOG</span>
            </a>
        </li>
        <li class="list-item has-treeview data-list-url">
            <a href="javascript:void(0)" class="nav-link btnDropmenu" title="Resume">
                <div class="nav-icon">
                    <img src="${rootSrc}src/img/icon/social-31.svg" alt="Service">
                </div>
                <span class="nav-text">RESUME</span>
                <div class="iconArrowdrop">
                    <svg viewbox="0 0 40 40" width="15" heigth="15">
                        <path 
                            d = "M0.5 10 L19 30 L35 10"
                            fill = "none"
                            stroke-width = "4"
                        />
                    </svg>
                </div>
            </a>
            <ul class="underlist">
                <li class="list-item list-treeview">
                    <a href="${rootSrc}src/download/Prapas-Resume_EN.pdf" title="Download Resume" class="nav-link dlbtn-wraper" download>
                        <div class="nav-icon">
                            <img src="${rootSrc}src/img/icon/zmlogo-page-03.png" alt="Resume EN">
                        </div>
                        <span class="nav-text">RESUME EN</span>
                    </a>
                </li>
                <li class="list-item list-treeview">
                    <a href="${rootSrc}src/download/Prapas-Resume_TH.pdf" title="Download Resume" class="nav-link dlbtn-wraper" download>
                        <div class="nav-icon">
                            <img src="${rootSrc}src/img/icon/zmlogo-page-03.png" alt="Resume TH">
                        </div>
                        <span class="nav-text">RESUME TH</span>
                    </a>
                </li>
            </ul>
        </li>
    </ul>
    ${TopButton()}
    </div>`
}

export default Sidemenu