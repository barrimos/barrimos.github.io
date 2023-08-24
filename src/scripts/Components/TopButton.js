const TopButton = (strokeColor = '#666', strokeWidth = 3) => {
  return `<div class="buttonToTop" id="buttonToTop" onclick="topFunction()">
  <input type="button" class="toTopBtn" id="toTopBtn">
  <svg class="arrowTop" viewbox="0 0 35 35" aria-hidden="true" alt="backTop">
      <path 
          d = "M10 22 L 18 13 L 25 22"
          fill = "none"
          stroke = "${strokeColor}"
          stroke-width = "${strokeWidth}"
      />
  </svg>
</div>`
}

export default TopButton;