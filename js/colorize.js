'use strict';
(function () {
  window.colorize = function (element, elementInput, colors) {
    element.addEventListener('click', function () {
      if (element.tagName.toLowerCase() === 'div') {
        var valueColor = window.getArrayData(colors);
        element.style.background = valueColor;
        elementInput.value = valueColor;
      } else {
        element.style.fill = window.getArrayData(colors);
        elementInput.value = element.style.fill;
      }
    });
  };
})();
