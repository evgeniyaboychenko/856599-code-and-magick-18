'use strict';
(function () {
  var WIZARD_ITEM_TEMPLATE = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  // var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  // var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var NUMBER_WIZARDS = 4;

  // var createCharacters = function () {
  //   var characters = [];
  //   for (var i = 0; i < NUMBER_WIZARDS; i++) {
  //     characters[i] = {
  //       name: window.getArrayData(NAMES) + ' ' + window.getArrayData(SURNAMES),
  //       coatColor: window.getArrayData(COAT_COLORS),
  //       eyesColor: window.getArrayData(EYES_COLORS)
  //     };
  //   }
  //   return characters;
  // };

  var createWizard = function (wizard) {
    var wizardItem = WIZARD_ITEM_TEMPLATE.cloneNode(true);
    var nameWizard = wizardItem.querySelector('.setup-similar-label');
    var coatColorWizard = wizardItem.querySelector('.wizard-coat');
    var eyesColorWizard = wizardItem.querySelector('.wizard-eyes');
    nameWizard.textContent = wizard.name;
    coatColorWizard.style.fill = wizard.colorCoat;
    eyesColorWizard.style.fill = wizard.colorEyes;
    return wizardItem;
  };

  var createWizards = function (data) {
    var fragment = document.createDocumentFragment();
    var wizards = randomArray(NUMBER_WIZARDS, data);
    for (var i = 0; i < NUMBER_WIZARDS; i++) {
      fragment.appendChild(createWizard(wizards[i]));
    }
    return fragment;
  };

  var randomArray = function (n, array) {
    var smallArray = [];
    for (var i = 0; i < n; i++) {
      smallArray[i] = (array.splice(Math.floor(Math.random() * array.length), 1))[0];
    }
    return smallArray;
  };

  var wizardList = document.querySelector('.setup-similar-list');

  var onError = function (message) {
    var div = document.createElement('div');
    var header = document.querySelector('header');
    div.style = 'z-index: 100;  text-align: center; background-color: red; position: absolute; fontSize: 30px; width: 800px; left: 50%; margin-left: -400px; top: 40px; font-size: 30px';
    div.textContent = message;
    header.appendChild(div);
  };

  var onRenderWizards = function (data) {
    wizardList.appendChild(createWizards(data));
  };

  window.backend.load(onRenderWizards, onError);

  var setupSimilarWizard = document.querySelector('.setup-similar');
  setupSimilarWizard.classList.remove('hidden');

  var setupPlayer = document.querySelector('.setup-player');
  var setupMyWizard = setupPlayer.querySelector('.setup-wizard');
  var coatColorMyWizard = setupMyWizard.querySelector('.wizard-coat');
  var eyesColorMyWizard = setupMyWizard.querySelector('.wizard-eyes');
  var fireballColorMyWizard = setupPlayer.querySelector('.setup-fireball-wrap');
  var fieldInputFireballColor = fireballColorMyWizard.querySelector('input[name="fireball-color"]');
  var fieldInputCoatColor = setupPlayer.querySelector('input[name="coat-color"]');
  var fieldInputEyesColor = setupPlayer.querySelector('input[name="eyes-color"]');


  window.colorize(coatColorMyWizard, fieldInputCoatColor, COAT_COLORS);
  window.colorize(eyesColorMyWizard, fieldInputEyesColor, EYES_COLORS);
  window.colorize(fireballColorMyWizard, fieldInputFireballColor, FIREBALL_COLOR);


  var onSaveSuccess = function () {
    document.querySelector('.setup').classList.add('hidden');
  };

  var form = document.querySelector('.setup').querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), onSaveSuccess, onError);
  });
})();
