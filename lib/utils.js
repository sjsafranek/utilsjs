

var Utils = {};

var noop = function(){};

String.prototype.toTitleCase = function() {
    var str = this.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
}

Number.prototype.isInt = function() {
	return this % 1 === 0;
}

Number.prototype.isFloat = function() {
	return this % 1 !== 0;
}

Utils.md5uuid = function(len){
	return md5(Math.round(Date.now() / Math.random())).substr(0, len || 32);
}

Utils.md5object = function(val, suppress){
	if(val instanceof Object){
		if(!suppress && !Object.keys(val).length){
			console.log("Warning: msmd5 value has zero keys");
		}
		try{
			val = JSON.stringify(val);
		}catch(e){
			val = val.toString();
		}
	}
	if(!suppress && !val){
		console.log("Warning: msmd5 value is falsey");
	}
	if(!suppress && typeof val == "boolean"){
		console.log("Warning: msmd5 value is boolean");
	}
	return md5(val);
};

var FileUtils = {

    exportFile: function(content, fileName, fileType) {
        var a = document.createElement("a");
        var file = new Blob([content], {type: fileType});
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    },

    exportJSON: function(data, fileName) {
    	var content = JSON.stringify(data)
    	FileUtils.exportFile(content, fileName, 'application/json');
    }

};


// http://bl.ocks.org/jdarling/06019d16cb5fd6795edf
var randomColor = (function(){
    var golden_ratio_conjugate = 0.618033988749895;
    var h = Math.random();

    var hslToRgb = function (h, s, l){
        var r, g, b;

        if(s == 0){
            r = g = b = l; // achromatic
        }
        else {
            function hue2rgb(p, q, t){
                if(t < 0) t += 1;
                if(t > 1) t -= 1;
                if(t < 1/6) return p + (q - p) * 6 * t;
                if(t < 1/2) return q;
                if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            }

            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }

        return '#'+Math.round(r * 255).toString(16)+Math.round(g * 255).toString(16)+Math.round(b * 255).toString(16);
    };

    return function(){
        h += golden_ratio_conjugate;
        h %= 1;
        return hslToRgb(h, 0.5, 0.60);
    };
})();


function enableFileDrop($elem, callback) {
	$elem.get(0).ondrop = function(e) {
		e.preventDefault();
		$(this).css('outline', 'none');
		var file = e.dataTransfer.files[0];
		callback && callback(file);
	}
	$elem.get(0).ondragover = $elem.get(0).ondragenter = function(e) {
		e.preventDefault();
		$(this).css('outline', '2px dashed #92b0b3');
	};
	$elem.get(0).ondragstart = function(e) {
		e.preventDefault();
		$(this).css('outline', '2px dashed #92b0b3');
	};
	$elem.get(0).ondragend = $elem.get(0).ondragleave = function(e) {
		e.preventDefault();
		$(this).css('outline', 'none');
	};
}
