
let DEFAULTS = {

	size: [ 'mini', 'tiny', 'small', 'medium', 'big', 'huge' ],

	direction: [ 'left', 'right', 'top', 'bottom', 'below' ],
	corner: [ 'left top', 'left bottom', 'right top', 'right bottom' ],

	separator: '<|separator|>',

	transition: [
		'scale', 'fade', 'fade up', 'fade down', 'fade left', 'fade right',
		'horizontal flip', 'vertical flip', 'drop', 'fly left', 'fly right',
		'fly up', 'fly down', 'swing left', 'swing right', 'swing up', 'swing down',
		'slide dwon', 'slide up', 'slide left', 'slide right', 'flash', 'shake',
		'pulse', 'tada', 'bounce'
	],

	level: [ 'primary', 'secondary', 'tertiary' ]

};

DEFAULTS.directionCorner = DEFAULTS.direction.concat(DEFAULTS.corner);

if (window) {
	window.DEFAULTS = DEFAULTS;
}

module.exports = DEFAULTS;
