// --- START BY CREATING THE TEMPLATES
var palette565 = [],
	charset = ["", "\u3042", "\u3044", "\u3046", "\u3048", "\u304a", "\u304b", "\u304d", "\u304f", "\u3051", "\u3053", "\u3055", "\u3057", "\u3059", "\u305b", "\u305d", "\u305f", "\u3061", "\u3064", "\u3066", "\u3068", "\u306a", "\u306b", "\u306c", "\u306d", "\u306e", "\u306f", "\u3072", "\u3075", "\u3078", "\u307b", "\u307e", "\u307f", "\u3080", "\u3081", "\u3082", "\u3084", "\u3086", "\u3088", "\u3089", "\u308a", "\u308b", "\u308c", "\u308d", "\u308f", "\u3092", "\u3093", "\u3041", "\u3043", "\u3045", "\u3047", "\u3049", "\u3063", "\u3083", "\u3085", "\u3087", "\u304c", "\u304e", "\u3050", "\u3052", "\u3054", "\u3056", "\u3058", "\u305a", "\u305c", "\u305e", "\u3060", "\u3062", "\u3065", "\u3067", "\u3069", "\u3070", "\u3073", "\u3076", "\u3079", "\u307c", "\u3071", "\u3074", "\u3077", "\u307a", "\u307d", "\u30fc", "\uff5e", "\u2026", "\uff64", "\uff61", "(", ")", "\uff62", "\uff63", ".", "\u30fb", "!", "?", "&", "\u2B24", "\u271D", "\u2665", "\u263c", "\u2605", "@", "\u266a", "\u256c", "\u2191", "\u2193", "\u2192", "\u2190", "$", " ", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "\u30a2", "\u30a4", "\u30a6", "\u30a8", "\u30aa", "\u30ab", "\u30ad", "\u30af", "\u30b1", "\u30b3", "\u30b5", "\u30b7", "\u30b9", "\u30bb", "\u30bd", "\u30bf", "\u30c1", "\u30c4", "\u30c6", "\u30c8", "\u30ca", "\u30cb", "\u30cc", "\u30cd", "\u30ce", "\u30cf", "\u30d2", "\u30d5", "\u30d8", "\u30db", "\u30de", "\u30df", "\u30e0", "\u30e1", "\u30e2", "\u30e4", "\u30e6", "\u30e8", "\u30e9", "\u30ea", "\u30eb", "\u30ec", "\u30ed", "\u30ef", "\u30f2", "\u30f3", "\u30a1", "\u30a3", "\u30a5", "\u30a7", "\u30a9", "\u30c3", "\u30e3", "\u30e5", "\u30e7", "\u30ac", "\u30ae", "\u30b0", "\u30b2", "\u30b4", "\u30b6", "\u30b8", "\u30ba", "\u30bc", "\u30be", "\u30c0", "\u30c2", "\u30c5", "\u30c7", "\u30c9", "\u30d0", "\u30d3", "\u30d6", "\u30d9", "\u30dc", "\u30d1", "\u30d4", "\u30d7", "\u30da", "\u30dd", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
	header_struct, s1c33;

// Get the header structure
var xhr = new XMLHttpRequest();
xhr.open("GET", "source/tamago.struct", false);
xhr.send()
header_struct = structure.parse(xhr.responseText);

// Get the disassembler definition
var xhr = new XMLHttpRequest();
xhr.open("GET", "source/s1c33.json", false);
xhr.send()
s1c33 = JSON.parse(xhr.responseText);

for (var w = 0; w < 0x10000; w++) {
	var b = ((w >> 11) & 0x1F) / 0x1f,
		g = ((w >>  5) & 0x3F) / 0x3f,
		r = ((w >>  0) & 0x1f) / 0x1f;

	palette565[w] = 0xFF000000 + 
		(Math.ceil(r * 0xFF)) * 0x1 +
		(Math.ceil(g * 0xFF)) * 0x100 +
		(Math.ceil(b * 0xFF)) * 0x10000;

	// Chroma key
	palette565[0x07E0] = 0;
}

// -- This is our image display helper
function DisplayImage(element, bytes, idx) {
	var d = document.createElement("div");
	element.appendChild(d);

	var img = document.createElement("tamaimg"),
		canvas = document.createElement("canvas"),
		width = bytes[idx+0],
		height = bytes[idx+1],
		colors = bytes[idx+2],
		palette = [],
		ctx, i;

	if (bytes[idx+3] !== 0 ||
		bytes[idx+4] !== 1 ||
		bytes[idx+5] !== 0xFF) {
		throw new Error("Cannot decode image")
	}

	canvas.setAttribute("width", width);
	canvas.setAttribute("height", height);
	img.appendChild(canvas);
	d.appendChild(img);

	var s = document.createElement("address");
	s.innerHTML = "(" + idx.toString(16).toUpperCase() + ")";
	d.appendChild(s);

	ctx = canvas.getContext("2d");

	var id = ctx.getImageData(0,0,width,height),
		px = new Uint32Array(id.data.buffer);

	idx += 6;

	for (i = 0; i < colors; i++) {
		palette[i] = palette565[(bytes[idx++] << 8) | (bytes[idx++])];
	}

	for (var pixel = 0; pixel < width * height; ) {
		var a = bytes[idx++];
		if (colors <= 16) {
			px[pixel++] = palette[a&0xF];
			px[pixel++] = palette[a>>4];
		} else {
			px[pixel++] = palette[a];
		}
	}

	ctx.putImageData(id, 0, 0);
}

function disassemble(element, buffer) {
	var words = new Uint16Array(buffer);

	var asm = document.createElement("disassembly");

	// EXT chain
	var saved = 0,
		bits = 0,
		bytes = [],
		exts = [];

	for(var k = 0; k < words.length; k++) {
		var o = words[k];

		s1c33.forEach(function (i) {
			if ((o & i.mask) != i.locked) { return ; }

			var code = i.code,
				code_with_ext = code;

			function toHex(v) {
				v = v.toString(16);
				while (v.length < 4) v = "0" + v;
				return v;
			}

			i.fields.forEach(function (f) {
				var length = f.length,
					v = (o >> f.start) & ((1 << length) - 1),
					imm_ext;

				if (['rs', 'rd', 'rb', 'ss', 'sd'].indexOf(f.name) >= 0) {
					v = f.name[0] + v;

					if (exts.length && f.name == 'rb') {
						if (exts.length == 1) {
							v += "+#" + exts[0].toString(16)
						} else {
							v += "+#" + (exts[0] * Math.pow(2,13) + exts[1]).toString(16);
						}
						exts = [];
					}

					imm_ext = v;
				} else {
					// Premultiply immediates
					switch (f.name) {
					case 'sign8':
						length += 1;
						v <<= 1;
						break ;
					case 'imm10':
						length += 2;
						v <<= 2;
						break ;
					}

					imm_ext = v;

					//	EXTs are buffered
					if (f.name !== 'imm13') {
						switch (exts.length) {
						case 1:
							imm_ext = v +
								exts[0] * Math.pow(2, length);
							length += 13;
							break ; 
						case 2:
							if (f.name == "sign8") {
								// Sign 8 drops the bottom 3 bits
								imm_ext = v +
									(exts[0] >> 3) * Math.pow(2, length + 13) +
									exts[1] * Math.pow(2, length);
								length += 36;
							} else {
								imm_ext = v +
									exts[0] * Math.pow(2, length + 13) +
									exts[1] * Math.pow(2, length);
								length += 36;
							}							
							break ; 
						default:
							break ; 
						}

					} else {
						exts.push(v);
					}

					// Sign extend
					if (f.name.substr(0,4) === 'sign') {
						var d = Math.max(0, 32 - length);
						v = v << d >> d;
						imm_ext = imm_ext << d >> d;
					}

	                v = "#" + v.toString(16);
	                imm_ext = "#" + imm_ext.toString(16);
				}

	            code = code.replace(f.name, v);
	            code_with_ext = code_with_ext.replace(f.name, imm_ext);
			});

			// Flush exts
			if (code.substr(0,3) !== 'ext') { exts = []; }

			bytes.push(toHex(o));

			// Display instruction
			var addr = document.createElement("address"),
				op = document.createElement("operation"),
				op2 = document.createElement("operation"),
				hex = document.createElement("bytes"),
				item = document.createElement("instruction");

			addr.innerHTML = ((k - bytes.length + 1)*2 + 0x02000104).toString(16);
			hex.innerHTML = bytes.join(" ");
			op.innerHTML = code;
			if (code !== code_with_ext) op2.innerHTML = code_with_ext;
			item.appendChild(addr);
			item.appendChild(hex);
			item.appendChild(op);
			item.appendChild(op2);
			asm.appendChild(item);
			bytes = [];
		});
	}
	element.appendChild(asm);
}

// This decodes the heder
function tamago(element, buffer) {
	var fields = new header_struct(buffer),
		bytes = new Uint8Array(buffer),
		dv = new DataView(buffer),
		idx = -1;

	fields.intelligence = 100;

	function line(name, string) {
		var l = document.createElement("row");
		element.appendChild(l);

		var s = document.createElement("label");
		s.innerHTML = name + ":";
		
		l.appendChild(s);

		var s = document.createElement("data");
		s.innerHTML = string;
		l.appendChild(s);
	}

	function string(values) {
		var s = [];
		for (var i = 0; values[i] !== undefined; i++) {
			s.push(String.fromCharCode(values[i]));
		}
		return s.join('');
	}
	function catalog(values) {
		var s = [];
		for (var i = 0; values[i] !== undefined; i++) {
			s.push(charset[values[i]]);
		}
		return s.join('');
	}

	function hex(values) {
		// Display hex 
		var e = [];
		for (var i = 0; values[i] !== undefined; i++) {
			var v = values[i].toString(16); 
			e.push(v);
		}

		return e.join(" ");
	}

	// --- Display junk ---
	function names(o) {
		return Object.getOwnPropertyNames(Object.getPrototypeOf(o)).filter(function (v) {
			return v[0] !== '$' && v !== '_data' && v !== '_size';
		}).sort();
	}

	function head() {
		var format = {
			"_00_magic": "string",
			"_06_internal_filename": "string",
			"_34_internal_marker": "string",
			"_4e_load_location": "hex",
			"_5e_catalog_name": "catalog",
			"_a6_entry_point": "hex"
		}

		names(fields).forEach(function (n) {
			var v = fields[n];

			// Format arrays
			switch (format[n]) {
			case 'string':
				v = string(v);
				break ;
			case 'catalog':
				v = catalog(v);
				break ;
			case 'hex':
				v = "0x" + v.toString(16);
				break ;
			default:
				/*
				if (n.indexOf("zero") >= 0) {
					return ;
				}
				*/

				if (typeof v === 'object') {
					v = hex(v);
				} else if (n.indexOf("unknown") >= 0) {
					v = "0x" + v.toString(16);
				} 
			}


			line(n, v);
		});
	}

	// Display images
	var found = 0;
	while (++idx < bytes.length - 6) {
		// Image magic number
		if (bytes[idx+3] === 0x00 &&
			bytes[idx+4] === 0x01 &&
			bytes[idx+5] === 0xFF) {
			if (!(found++)) {
				if (dv.getUint8(0xA6)) disassemble(element, buffer.slice(0x104, idx));
				head();
			}

			DisplayImage(element, bytes, idx);
		}
	}

	if (!found) {
		if (dv.getUint8(0xA6)) disassemble(element, buffer.slice(0x104, idx));
		head();
	}
}

// Find TAMAGO chunks and send them to the other bit
function image(root, name, buffer) {
	var header = "TAMAGO".split('').map(function(v) { return v.charCodeAt(0); }),
		bytes = new Uint8Array(buffer);

	for (var i = 0; i < bytes.length; i++) {
		for (var b = 0; b < header.length && header[b] == bytes[i+b]; b++) ;

		if (b === header.length) {
			var elem = document.createElement("div"),
				title = document.createElement("title");
			title.innerHTML = name + " ("+i+")";
			elem.appendChild(title);

			tamago(elem, buffer.slice(i));

			root.innerHTML = '';
			root.appendChild(elem);
		}
	}
}
