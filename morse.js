/**
 * @Author: harsha
 * @Date:   2018-06-24T15:50:53+05:30
 * @Last modified by:   harsha
 * @Last modified time: 2018-07-13T12:18:01+05:30
 */
var checked = true;
var morseOutput = [];
console.log(document.getElementById('input'));
document.getElementById('input').addEventListener('input', function() {
	if (checked) {
		textToMorse(this.value.toLowerCase());
	} else {
		morseToText(this.value.toLowerCase());
	}
});

function morseToText(value) {
	const text = document.getElementById('text');
	text.innerHTML = '';
	let output = value
		.split(' ')
		.map(function(v) {
			if (v === '') return ' ';
			for (var i in morse) {
				if (morse[i] === v) {
					return i;
				}
			}
		})
		.filter(function(v) {
			return v;
		});
	document.getElementById('text').innerHTML = output.join('');
}

function textToMorse(value) {
	const res = document.getElementById('res');
	res.innerHTML = '';
	let output = '';
	morseOutput = [];
	for (var i in value) {
		if (morse[value[i]]) {
			output += morse[value[i]];
			morseOutput.push(morse[value[i]]);
		}
	}
	for (var i in output) {
		const div = document.createElement('div');
		if (output[i] === '.') {
			div.className = 'circle';
		} else if (output[i] === '-') {
			div.className = 'dash';
		} else if (output[i] === ' ') {
			div.className = 'whitespace';
		}
		res.appendChild(div);
	}
}

document.getElementById('checkbox').addEventListener('change', function() {
	checked = this.checked;
	const label = document.getElementById('label');
	const copyButton = document.getElementById('copybutton');
	const morseResultStack = document.getElementById('morseres');
	const textResultStack = document.getElementById('textres');
	if (checked) {
		label.innerHTML = 'Text to morse code';
		copyButton.style.display = '';
		morseResultStack.style.display =''
		textResultStack.style.display = 'none';
	} else {
		label.innerHTML =
			'Morse code to text (please use space between each character)';
		copyButton.style.display = 'none';
		morseResultStack.style.display ='none'
		textResultStack.style.display = '';
	}
	document.getElementById('input').value = '';
	document.getElementById('res').innerHTML = '';
	document.getElementById('text').innerHTML = '';
});

document.getElementById('copybutton').addEventListener('click', function() {
	const dummy = document.createElement('input');
	document.body.appendChild(dummy);
	dummy.setAttribute('id', 'dummy_id');
	document.getElementById('dummy_id').value = morseOutput.join(' ');
	dummy.select();
	document.execCommand('copy');
	document.body.removeChild(dummy);
});

var morse = {
	' ': '  ',
	'0': '-----',
	'1': '.----',
	'2': '..---',
	'3': '...--',
	'4': '....-',
	'5': '.....',
	'6': '-....',
	'7': '--...',
	'8': '---..',
	'9': '----.',
	a: '.-',
	b: '-...',
	c: '-.-.',
	d: '-..',
	e: '.',
	f: '..-.',
	g: '--.',
	h: '....',
	i: '..',
	j: '.---',
	k: '-.-',
	l: '.-..',
	m: '--',
	n: '-.',
	o: '---',
	p: '.--.',
	q: '--.-',
	r: '.-.',
	s: '...',
	t: '-',
	u: '..-',
	v: '...-',
	w: '.--',
	x: '-..-',
	y: '-.--',
	z: '--..',
	'.': '.-.-.-',
	',': '--..--',
	'?': '..--..',
	'!': '-.-.--',
	'-': '-....-',
	'/': '-..-.',
	'@': '.--.-.',
	'(': '-.--.',
	')': '-.--.-',
	"'": '.-..-.'
};

var AudioContext = window.AudioContext || window.webkitAudioContext;
var ctx = new AudioContext();
var dot = 1.2 / 15;

document.getElementById('playButton').addEventListener('click', function() {
	var t = ctx.currentTime;

	var oscillator = ctx.createOscillator();
	oscillator.type = 'sine';
	oscillator.frequency.value = 600;

	var gainNode = ctx.createGain();
	gainNode.gain.setValueAtTime(0, t);

	const dummy = document.createElement('input');
	document.body.appendChild(dummy);
	dummy.setAttribute('id', 'dummy_id');
	document.getElementById('dummy_id').value = morseOutput.join(' ');
	dummy.select();
	document.body.removeChild(dummy);

	morseOutput
		.join(' ')
		.split('')
		.forEach(function(letter) {
			switch (letter) {
				case '.':
					gainNode.gain.setValueAtTime(1, t);
					t += dot;
					gainNode.gain.setValueAtTime(0, t);
					t += dot;
					break;
				case '-':
					gainNode.gain.setValueAtTime(1, t);
					t += 3 * dot;
					gainNode.gain.setValueAtTime(0, t);
					t += dot;
					break;
				case ' ':
					t += 7 * dot;
					break;
			}
		});

	oscillator.connect(gainNode);
	gainNode.connect(ctx.destination);

	oscillator.start();

	return false;
});
