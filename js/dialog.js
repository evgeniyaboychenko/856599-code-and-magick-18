'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');

  var openPopup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    removeListenersOpenPopup();
  };

  var closePopup = function () {
    setup.style.top = '';
    setup.style.left = '';
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    addListenersOpenPopup();
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      setup.style.top = '';
      setup.style.left = '';
      setup.classList.add('hidden');
    }
  };

  var addListenersOpenPopup = function () {
    setupOpen.addEventListener('click', openPopup);
    setupOpen.addEventListener('keydown', onOpenPopupLinkEnterPress);
  };

  var removeListenersOpenPopup = function () {
    setupClose.addEventListener('click', closePopup);
    setupClose.addEventListener('keydown', onClosePopupLinkEnterPress);
  };

  var setupUserName = document.querySelector('.setup-user-name');
  setupUserName.addEventListener('focus', function () {
    document.removeEventListener('keydown', onPopupEscPress);
  });

  setupUserName.addEventListener('blur', function () {
    document.addEventListener('keydown', onPopupEscPress);
  });

  var onOpenPopupLinkEnterPress = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  };

  var onClosePopupLinkEnterPress = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  };
  addListenersOpenPopup();
  removeListenersOpenPopup();

  // перемещение окна
  var iconUser = setup.querySelector('.upload');

  iconUser.addEventListener('mousedown', function (evtDown) {
    evtDown.preventDefault();
    var mouseX = evtDown.clientX;
    var mouseY = evtDown.clientY;
    var flagMove = false;
    var onMouseMove = function (evtMove) {
      flagMove = true;
      evtMove.preventDefault();
      var shiftX = mouseX - evtMove.clientX;
      var shiftY = mouseY - evtMove.clientY;

      mouseX = evtMove.clientX;
      mouseY = evtMove.clientY;

      setup.style.top = (setup.offsetTop - shiftY) + 'px';
      setup.style.left = (setup.offsetLeft - shiftX) + 'px';
    };

    var onMouseUp = function (evtUp) {
      evtUp.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      if (flagMove) {
        var onClickPreventDefault = function (evtClick) {
          evtClick.preventDefault();
          iconUser.removeEventListener('click', onClickPreventDefault);
        };
        iconUser.addEventListener('click', onClickPreventDefault);
      }
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
