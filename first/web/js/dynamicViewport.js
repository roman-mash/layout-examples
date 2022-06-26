var viewport = document.querySelector('meta[name=viewport]');
if (viewport) {
  document.head.removeChild(viewport);
}
var sibling = document.getElementById('sibling');
var dvp = document.createElement('meta');
dvp.setAttribute('name', 'viewport');
if (window.innerWidth < 375) {
  dvp.setAttribute('content', 'width=375, user-scalable=no');
} else {
  dvp.setAttribute('content', 'width=device-width, initial-scale=1, user-scalable=no');
}
sibling.parentNode.insertBefore(dvp, sibling.nextSibling);
window.addEventListener('resize', function () {
  if (screen.width < 375 && dvp.getAttribute('content') != 'width=375, user-scalable=no') {
    sibling.parentNode.removeChild(dvp);
    dvp.setAttribute('content', 'width=375, user-scalable=no');
    sibling.parentNode.insertBefore(dvp, sibling.nextSibling);
  } else if (screen.width >= 376 && dvp.getAttribute('content') != 'width=device-width, initial-scale=1, user-scalable=no') {
    sibling.parentNode.removeChild(dvp);
    dvp.setAttribute('content', 'width=device-width, initial-scale=1, user-scalable=no');
    sibling.parentNode.insertBefore(dvp, sibling.nextSibling);
  }
});
