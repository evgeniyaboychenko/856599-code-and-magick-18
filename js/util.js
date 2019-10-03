'use strict';
(function () {
  // получить случайный элемент массива
  window.getArrayData = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };
})();
