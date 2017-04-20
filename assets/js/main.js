window.addEventListener('orientationchange', function () {
  var originalBodyStyle = getComputedStyle(document.body).getPropertyValue('display');
  document.body.style.display='none';
  console.log('listening');
  setTimeout(function () {
    document.body.style.display = originalBodyStyle;
  }, 10);
});
