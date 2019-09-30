'use strict';
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARD_ITEM_TEMPLATE = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var NUMBER_WIZARDS = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var generateData = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var createCharacters = function () {
  var characters = [];
  for (var i = 0; i < NUMBER_WIZARDS; i++) {
    characters[i] = {
      name: generateData(NAMES) + ' ' + generateData(SURNAMES),
      coatColor: generateData(COAT_COLORS),
      eyesColor: generateData(EYES_COLORS)
    };
  }
  return characters;
};

var createWizard = function (wizard) {
  var wizardItem = WIZARD_ITEM_TEMPLATE.cloneNode(true);
  var nameWizard = wizardItem.querySelector('.setup-similar-label');
  var coatColorWizard = wizardItem.querySelector('.wizard-coat');
  var eyesColorWizard = wizardItem.querySelector('.wizard-eyes');
  nameWizard.textContent = wizard.name;
  coatColorWizard.style.fill = wizard.coatColor;
  eyesColorWizard.style.fill = wizard.eyesColor;
  return wizardItem;
};

var createWizards = function () {
  var fragment = document.createDocumentFragment();
  var wizardsData = createCharacters();
  for (var i = 0; i < NUMBER_WIZARDS; i++) {
    fragment.appendChild(createWizard(wizardsData[i]));
  }
  return fragment;
};

var wizardList = document.querySelector('.setup-similar-list');
wizardList.appendChild(createWizards());

var setupSimilarWizard = document.querySelector('.setup-similar');
setupSimilarWizard.classList.remove('hidden');

var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');
var setupMyWizard = document.querySelector('.setup-wizard');
var coatColorMyWizard = setupMyWizard.querySelector('.wizard-coat');
var eyesColorMyWizard = setupMyWizard.querySelector('.wizard-eyes');
var fireballColorMyWizard = document.querySelector('.setup-fireball-wrap');

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  removeListenersOpenPopup();
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  addtListenersOpenPopup();
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    setup.classList.add('hidden');
  }
};

var addtListenersOpenPopup = function () {
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

addtListenersOpenPopup();
removeListenersOpenPopup();

var fieldInputFireballColor = fireballColorMyWizard.querySelector('input[name="fireball-color"]');
var fieldInputCoatColor = setup.querySelector('input[name="coat-color"]');
var fieldInputEyesColor = setup.querySelector('input[name="eyes-color"]');

coatColorMyWizard.addEventListener('click', function () {
  coatColorMyWizard.style.fill = generateData(COAT_COLORS);
  fieldInputCoatColor.value = coatColorMyWizard.style.fill;
});

eyesColorMyWizard.addEventListener('click', function () {
  eyesColorMyWizard.style.fill = generateData(EYES_COLORS);
  fieldInputEyesColor.value = eyesColorMyWizard.style.fill;
});

fireballColorMyWizard.addEventListener('click', function () {
  var valueColor = generateData(FIREBALL_COLOR);
  fireballColorMyWizard.style.background = valueColor;
  fieldInputFireballColor.value = valueColor;
});

