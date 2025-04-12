/**
 * 
 * @param {*} player 
 * @returns 
 */
const StatusBar = (player = undefined, settings) => {
  try {
    if (typeof player !== 'object' && Array.isArray(player)) {
      throw ReferenceError;
    }
    return `<span class="play-timer" data-timer-for=${player.color} data-timer-seconds=${settings.time * 60}>
      <span class="minutes" data-m="">--</span><span>:</span><span class="seconds" data-s="">--</span>
    </span>
    <strong class="player-username">${player.username}</strong>`
    // return `<span class="play-timer" data-timer-for=${player.color} data-timer-seconds=${settings.time * 60}>--:--</span>
    // <strong class="player-username">${player.username}</strong>
    // <div class="stats-wrapper" data-stats-for=${player.username}>
    //     <p class="stats win">W : ${player.win || 0}</p>
    //     <p class="stats lose">L : ${player.lose || 0}</p>
    //     <p class="stats draw">D : ${player.draw || 0}</p>
    // </div>`
  } catch (e) {
    throw new ReferenceError(`${player} is provinded with ${typeof player}, Expected object`)
  }

}

export default StatusBar;
