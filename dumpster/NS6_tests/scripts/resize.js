// Netscape Resize Fix

if (document.layers) {
  widthCheck = window.innerWidth
  heightCheck = window.innerHeight
  window.onResize = resizeFix
}

function resizeFix() {
  if (widthCheck != window.innerWidth || heightCheck != window.innerHeight) {
    location.reload();
	}
}

