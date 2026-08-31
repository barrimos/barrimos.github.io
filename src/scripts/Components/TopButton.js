/**
 * DocsString
 * @param {*} strokeColor 
 * @param {*} strokeWidth 
 * @returns 
 */
const TopButton = (strokeColor = '#666', strokeWidth = 3) => {
  return `<div class="buttonToTop" id="buttonToTop" onclick="topFunction()">
  <div style="position: relative; width: 35px; height: 35px;">
  <input type="button" class="toTopBtn" id="toTopBtn" style="position: absolute; top: 0; left: 0;">
  <svg class="arrowTop" viewbox="0 0 35 35" aria-hidden="true" alt="backTop" style="position: absolute; top: 0; left: 0;">
      <path 
          d = "M10 22 L 18 13 L 25 22"
          fill = "none"
          stroke = "${strokeColor}"
          stroke-width = "${strokeWidth}"
      />
  </svg>
  </div>
</div>`
}

export default TopButton;