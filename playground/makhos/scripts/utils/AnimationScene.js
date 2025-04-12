const animate = (p, cardDeclare) => {
  const sceneAnimation = document.querySelector('#animationScene')
  const cardAnimation = document.querySelectorAll('.cardAnimation')
  const [p1, p2] = p
  cardDeclare.classList.add('upScale')
  p1.classList.remove('d-none')
  p1.classList.add('d-block')
  p2.classList.remove('d-none')
  p2.classList.add('d-block')
  setTimeout(() => {
    p1.classList.add('slideLeft')
    p2.classList.add('slideRight')
  }, 100)
  setTimeout(() => {
    cardDeclare.classList.remove('upScale')
    p1.classList.remove('slideLeft')
    p2.classList.remove('slideRight')
    setTimeout(() => {
      cardAnimation.forEach(card => card.classList.add('fadeOut'))
      sceneAnimation.style.zIndex = -10
    }, 100)
  }, 1500)
}

export const Versus = (useSwap = false) => {
  const cardAi = document.querySelector('#cardAi')
  const cardYou = document.querySelector('#cardYou')
  const cardVs = document.querySelector('#cardVs')
  animate(useSwap ? [cardAi, cardYou] : [cardYou, cardAi], cardVs)
}

export const Declaration = (useSwap, result, winner) => {
  const sceneAnimation = document.querySelector('#animationScene')
  const cardDeclar = document.querySelector('#cardVs')
  cardDeclar.setAttribute('id', `card${result}`)
  const cardAi = document.querySelector('#cardAi')
  const cardYou = document.querySelector('#cardYou')
  cardAi.classList.remove('fadeOut')
  cardDeclar.classList.remove('fadeOut')
  cardYou.classList.remove('fadeOut')
  sceneAnimation.style.zIndex = 10
  const winPlayer = winner === 'p1' ? useSwap ? [cardAi, cardYou] : [cardYou, cardAi] : useSwap ? [cardYou, cardAi] : [cardAi, cardYou]
  animate(winPlayer, cardDeclar)
}