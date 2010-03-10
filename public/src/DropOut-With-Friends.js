/*
 * @author jnf (http://github.com/jnf)
 * @description Extends Scripty to include three new effects: Effect.DropIn, Effect.PullIn, Effect.PullOut. Enhances Effct.DropOut.
 * @dependency Prototype 1.6.1 (http://www.prototypejs.org)
 * @dependecy Scriptaculous 1.8.3 (http://github.com/madrobby/scriptaculous)
 * @license MIT License, see README.rdoc
*/

Effect.DropOut = function(element) {
  element = $(element);
  var oldStyle = {
    top: element.getStyle('top'),
    left: element.getStyle('left'),
    opacity: element.getInlineOpacity() };
	var distance = (typeof arguments[1] == "object") ? arguments[1].distance || 100 : 100;
  return new Effect.Parallel(
    [ new Effect.Move(element, {x: 0, y: distance, sync: true }),
      new Effect.Opacity(element, { sync: true, to: 0.0 }) ],
    Object.extend(
      { duration: 0.5,
        beforeSetup: function(effect) {
          effect.effects[0].element.makePositioned();
        },
        afterFinishInternal: function(effect) {
          effect.effects[0].element.hide().undoPositioned().setStyle(oldStyle);
        }
      }, arguments[1] || { }));
};

Effect.DropIn = function(element) {
  element = $(element);
  var oldStyle = {
    top: element.getStyle('top'),
    left: element.getStyle('left'),
    opacity: element.getInlineOpacity() };
		var distance = (typeof arguments[1] == "object") ? arguments[1].distance || 100 : 100;
  return new Effect.Parallel(
    [ new Effect.Move(element, {x: 0, y: distance, sync: true }),
      new Effect.Appear(element, { sync: true }) ],
    Object.extend(
      { duration: 0.5,
        beforeSetup: function(effect) {
          effect.effects[0].element.makePositioned();
					effect.effects[0].element.setStyle({ top: (effect.effects[0].element.positionedOffset()[1] - distance) + 'px' });
        },
        afterFinishInternal: function(effect) {
          effect.effects[0].element.undoPositioned().setStyle(oldStyle);
        }
      }, arguments[1] || { }));
};

Effect.PullOut = function(element) {
  element = $(element);
  var oldStyle = {
    top: element.getStyle('top'),
    left: element.getStyle('left'),
    opacity: element.getInlineOpacity() };
	var distance = (typeof arguments[1] == "object") ? arguments[1].distance || 100 : 100;
  return new Effect.Parallel(
    [ new Effect.Move(element, {x: 0, y: distance * -1, sync: true }),
      new Effect.Opacity(element, { sync: true, to: 0.0 }) ],
    Object.extend(
      { duration: 0.5,
        beforeSetup: function(effect) {
          effect.effects[0].element.makePositioned();
        },
        afterFinishInternal: function(effect) {
          effect.effects[0].element.hide().undoPositioned().setStyle(oldStyle);
        }
      }, arguments[1] || { }));
};

Effect.PullIn = function(element) {
  element = $(element);
  var oldStyle = {
    top: element.getStyle('top'),
    left: element.getStyle('left'),
    opacity: element.getInlineOpacity() };
	var distance = (typeof arguments[1] == "object") ? arguments[1].distance || 100 : 100;
  return new Effect.Parallel(
    [ new Effect.Move(element, {x: 0, y: distance * -1, sync: true }),
      new Effect.Appear(element, { sync: true }) ],
    Object.extend(
      { duration: 0.5,
        beforeSetup: function(effect) {
          effect.effects[0].element.makePositioned();
					effect.effects[0].element.setStyle({ top: (effect.effects[0].element.positionedOffset()[1] + distance) + 'px' });
        },
        afterFinishInternal: function(effect) {
          effect.effects[0].element.undoPositioned().setStyle(oldStyle);
        }
      }, arguments[1] || { }));
};