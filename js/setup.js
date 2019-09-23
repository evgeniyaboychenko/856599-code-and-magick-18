'use strict';
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_ITEM_TEMPLATE = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var NUMBER_WIZARDS = 4;

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

var setupWindow = document.querySelector('.setup');
setupWindow.classList.remove('hidden');

var wizardList = document.querySelector('.setup-similar-list');
wizardList.appendChild(createWizards());

var setupWizard = document.querySelector('.setup-similar');
setupWizard.classList.remove('hidden');
