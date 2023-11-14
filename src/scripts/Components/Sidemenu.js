import TopButton from "./TopButton.js";

/**
 * DocsString
 * @param {*} backTo 
 * @param {*} newRoot 
 * @returns 
 */
const Sidemenu = (backTo = false, newRoot = '../src') => {
    let _ = './src';
    if(backTo){
        _ = newRoot;
    }
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
                  <img src="${_}/img/icon/social-23.svg" alt="Home">
              </div>
              <span class="nav-text" data-text="index">HOME</span>
          </a>
      </li>
      <li class="list-item data-list-url">
          <a href="../../profile.html" class="nav-link" title="Profile" id="profile">
              <div class="nav-icon" data-icon="profile">
                  <img src="${_}/img/icon/social-09.svg" alt="Profile">
              </div>
              <span class="nav-text" data-text="profile">PROFILE</span>
          </a>
      </li>
      <li class="list-item has-treeview data-list-url">
          <a href="javascript:void(0)" class="nav-link btnDropmenu" title="Zxsandbox" id="zxsandbox">
              <div class="nav-icon" data-icon="zxsandbox">
                  <img src="${_}/img/icon/social-37.svg" alt="Service">
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
          <ul class="underlist">
              <li class="list-item list-treeview">
                  <a href="../../playground/matrix/index.html" class="nav-link" title="Matrix calculator" data-page="matrix">
                      <div class="nav-icon">
                          <img src="${_}/img/icon/matrixcalc.png" alt="Matrix calculator">
                      </div>
                      <span class="nav-text">MATRIX CALC</span>
                  </a>
              </li>
              <li class="list-item list-treeview">
                  <a href="../../playground/pixelsart/index.html" class="nav-link" title="Pixels art drawing" data-page="pixelsart">
                      <div class="nav-icon">
                          <img src="${_}/img/icon/pixelsart.png" alt="Pixels art drawing">
                      </div>
                      <span class="nav-text">PIXELS ART</span>
                  </a>
              </li>
              <li class="list-item list-treeview">
                  <a href="../../playground/maze/index.html" class="nav-link" title="Maze game" data-page="maze">
                      <div class="nav-icon">
                          <img src="${_}/img/icon/maze-icon.png" alt="Maze game">
                      </div>
                      <span class="nav-text">MAZE GAME</span>
                  </a>
              </li>
              <li class="list-item list-treeview">
                  <a href="https://goaltofitapp.vercel.app" class="nav-link" title="Goal to fit">
                      <div class="nav-icon">
                          <img src="${_}/img/icon/gtf.png" alt="Goal to fit planing and tracking workout">
                      </div>
                      <span class="nav-text">GOAL TO FIT</span>
                  </a>
              </li>
              <li class="list-item list-treeview">
                  <a href="https://jammping.surge.sh" class="nav-link" title="Spotify music search">
                      <div class="nav-icon">
                          <img src="${_}/img/icon/spotify.png" alt="Spotify music search">
                      </div>
                      <span class="nav-text">SPOTIFY SEARCH</span>
                  </a>
              </li>
              <li class="list-item list-treeview">
                  <a href="../../playground/stylingtag/index.html" class="nav-link" title="Styling tags" data-page="stylingtag">
                      <div class="nav-icon">
                          <img src="${_}/img/icon/styling.png" alt="Styling tags">
                      </div>
                      <span class="nav-text">STYLING TAGS</span>
                  </a>
              </li>
              <li class="list-item list-treeview">
                  <a href="./playground/theunderclass/index.html" class="nav-link" title="The underclass make an id student card">
                      <div class="nav-icon">
                          <img src="${_}/img/icon/underclass.png" alt="The underclass make an id student card">
                      </div>
                      <span class="nav-text">THE UNDERCLASS</span>
                  </a>
              </li>
              <li class="list-item list-treeview">
                  <a href="../../playground/algopuzzle/index.html" class="nav-link" title="Algo Game" data-page="algopuzzle">
                      <div class="nav-icon">
                          <img src="${_}/img/icon/algopuzzle.png" alt="Algo Game">
                      </div>
                      <span class="nav-text">ALGO GAME</span>
                  </a>
              </li>
              <li class="list-item list-treeview">
                  <a href="javascript:void(0)" class="nav-link" title="Makhos Thai Chekers Game" data-page="makhos">
                      <div class="nav-icon">
                          <img src="${_}/img/icon/makhos.png" alt="Makhos Thai Chekers Game">
                      </div>
                      <span class="nav-text">MAKHOS</span>
                  </a>
              </li>
          </ul>
      </li>
      <li class="list-item data-list-url">
          <a href="../../blog.html" class="nav-link" title="Blog" id="blog">
              <div class="nav-icon" data-icon="blog">
                  <img src="${_}/img/icon/social-33.svg" alt="Blog">
              </div>
              <span class="nav-text" data-text="blog">BLOG</span>
          </a>
      </li>
      <li class="list-item has-treeview data-list-url">
          <a href="javascript:void(0)" class="nav-link btnDropmenu" title="Resume">
              <div class="nav-icon">
                  <img src="${_}/img/icon/social-31.svg" alt="Service">
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
                  <a href="${_}/download/Prapas - Resume_EN_2023.pdf" title="Download Resume" class="nav-link dlbtn-wraper" download>
                      <div class="nav-icon">
                          <img src="${_}/img/icon/zmlogo-page-03.png" alt="Resume EN">
                      </div>
                      <span class="nav-text">RESUME EN</span>
                  </a>
              </li>
              <li class="list-item list-treeview">
                  <a href="${_}/download/Prapas - Resume_TH_2023.pdf" title="Download Resume" class="nav-link dlbtn-wraper" download>
                      <div class="nav-icon">
                          <img src="${_}/img/icon/zmlogo-page-03.png" alt="Resume TH">
                      </div>
                      <span class="nav-text">RESUME TH</span>
                  </a>
              </li>
          </ul>
      </li>
  </ul>
  ${TopButton()}
</div>`;
}

export default Sidemenu;