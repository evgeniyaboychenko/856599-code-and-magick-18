'use strict';
var FONT_SIZE = 16;
var INDENT_SIZE = 10;
var BOX_X = 100;
var BOX_Y = 10;
var WIDTH_BOX = 420;
var HEIGHT_BOX = 270;
var WIDTH_COLUMN = 40;
var INTERVAL_COLUMN = 50;

var calculateHeightColumn = function (times) {
  var heightColumn = [];
  var maxItem = times[0];
  for (var i = 1; i < times.length; i++) {
    if (maxItem < times [i]) {
      maxItem = times[i];
    }
  }
  for (var j = 0; j < times.length; j++) {
    if (times[j] === maxItem) {
      heightColumn[j] = 150;
    }
    heightColumn[j] = times[j] * 150 / maxItem;
  }
  return heightColumn;
};

var drawCloud = function (ctx, x, y, width, height) {
  for (var i = 0; i < 6; i++) {
    ctx.lineTo(x = x + width / 6, ((i % 2) ? 0 : 1) * 10);
  }
  for (i = 0; i < 9; i++) {
    ctx.lineTo(((i % 2) ? 0 : 1) * 10 + x, y = y + height / 9);
  }
  for (i = 0; i < 6; i++) {
    ctx.lineTo(x = x - width / 6, y + ((i % 2) ? 0 : 1) * 10);
  }
  for (i = 0; i < 9; i++) {
    ctx.lineTo(((i % 2) ? 0 : 1) * 10 + x, y = y - height / 9);
  }
};

window.renderStatistics = function (ctx, names, times) {
  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,0.7)';
  ctx.shadowOffsetX = 10;
  ctx.shadowOffsetY = 10;
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.moveTo(BOX_X, BOX_Y);
  drawCloud(ctx, BOX_X, BOX_Y, WIDTH_BOX, HEIGHT_BOX);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
  ctx.restore();

  ctx.fontsize = FONT_SIZE;
  ctx.fontFamily = 'PT Mono';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', WIDTH_BOX / 2 + BOX_X, INDENT_SIZE + BOX_Y);
  ctx.fillText('Список результатов:', WIDTH_BOX / 2 + BOX_X, 2 * INDENT_SIZE + BOX_Y + FONT_SIZE);
  ctx.textAlign = 'left';

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = 'black';
    ctx.fillText(names[i], BOX_X + INDENT_SIZE + INTERVAL_COLUMN + i * (WIDTH_COLUMN + INTERVAL_COLUMN), HEIGHT_BOX - INDENT_SIZE);
    ctx.fillText(Math.round(times[i]), BOX_X + INDENT_SIZE + INTERVAL_COLUMN + i * (WIDTH_COLUMN + INTERVAL_COLUMN), HEIGHT_BOX - 2 * INDENT_SIZE - FONT_SIZE - calculateHeightColumn(times)[i]);
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      var saturation = Math.round(Math.random() * 100);
      ctx.fillStyle = 'hsl(240, ' + saturation + '%, 50%)';
    }
    ctx.fillRect(BOX_X + INDENT_SIZE + INTERVAL_COLUMN + i * (WIDTH_COLUMN + INTERVAL_COLUMN), HEIGHT_BOX - 2 * INDENT_SIZE - calculateHeightColumn(times)[i], 40, calculateHeightColumn(times)[i]);
  }
};
