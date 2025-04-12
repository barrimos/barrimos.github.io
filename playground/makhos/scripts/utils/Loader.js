export const Loader = () => {
  // Add an event listener to window.onload
  if (window.addEventListener) {
    window.addEventListener('load', allScriptsLoaded)
  } else if (window.attachEvent) {
    // For older versions of Internet Explorer
    window.attachEvent('onload', allScriptsLoaded)
  }
}

// Function to run when all scripts have loaded
export function allScriptsLoaded() {
  // Hide the loading spinner
  document.getElementById('loading-spinner').style.display = 'none'

  document.getElementById('content').style.display = 'block'

  document.getElementById('loading-spinner').remove()
}

// Add an event listener to window.onload
if (window.addEventListener) {
  window.addEventListener('load', allScriptsLoaded)
} else if (window.attachEvent) {
  // For older versions of Internet Explorer
  window.attachEvent('onload', allScriptsLoaded)
}