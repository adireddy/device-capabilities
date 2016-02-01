(function (console, $hx_exports) { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var BatterySupport = $hx_exports.BatterySupport = function(ready) {
	var _g = this;
	this._navigator = window.navigator;
	this.battery = this._navigator.battery;
	if(this.battery == null) this.battery = Reflect.field(this._navigator,"webkitBattery");
	if(this.battery == null) this.battery = Reflect.field(this._navigator,"mozBattery");
	this.isSupported = this.battery != null;
	if(this.battery == null && Reflect.field(this._navigator,"getBattery") != null) window.navigator.getBattery().then(function(b) {
		_g.battery = b;
		_g.isSupported = true;
		if(ready != null) ready();
	}); else if(ready != null) haxe_Timer.delay(ready,1);
};
var Location = $hx_exports.Location = function(enableHighAccuracy,timeout,maximumAge) {
	if(maximumAge == null) maximumAge = 0;
	if(timeout == null) timeout = 5000;
	if(enableHighAccuracy == null) enableHighAccuracy = false;
	this.options = { enableHighAccuracy : enableHighAccuracy, timeout : timeout, maximumAge : maximumAge};
	this._navigator = window.navigator;
	this.isSupported = window != null && this._navigator.geolocation != null;
};
Location.prototype = {
	getCurrentPosition: function(callback,errorCallback) {
		var _g = this;
		this._navigator.geolocation.getCurrentPosition(callback,function(error) {
			if(errorCallback != null) switch(error.code) {
			case 1:
				errorCallback("User denied location request.");
				break;
			case 2:
				errorCallback("Location information is unavailable.");
				break;
			case 3:
				errorCallback("The request to get user location timed out.");
				break;
			default:
				errorCallback("An unknown error occurred.");
			}
		},this.options);
	}
	,monitor: function(updateCallback,errorCallback) {
		var _g = this;
		if(this._monitorId != null) this._navigator.geolocation.clearWatch(this._monitorId);
		this._monitorId = this._navigator.geolocation.watchPosition(updateCallback,function(error) {
			if(errorCallback != null) switch(error.code) {
			case 1:
				errorCallback("User denied location request.");
				break;
			case 2:
				errorCallback("Location information is unavailable.");
				break;
			case 3:
				errorCallback("The request to get user location timed out.");
				break;
			default:
				errorCallback("An unknown error occurred.");
			}
		},this.options);
	}
	,clearMonitor: function() {
		if(this._monitorId != null) this._navigator.geolocation.clearWatch(this._monitorId);
		this._monitorId = null;
	}
	,_error: function(code,errorCallback) {
		switch(code) {
		case 1:
			errorCallback("User denied location request.");
			break;
		case 2:
			errorCallback("Location information is unavailable.");
			break;
		case 3:
			errorCallback("The request to get user location timed out.");
			break;
		default:
			errorCallback("An unknown error occurred.");
		}
	}
};
var Motion = $hx_exports.Motion = function() {
	this._window = window;
};
Motion.prototype = {
	shake: function(callback,threshold,interval) {
		if(interval == null) interval = 1000;
		if(threshold == null) threshold = 10;
		this._x = null;
		this._y = null;
		this._z = null;
		this._time = null;
		this._threshold = threshold;
		this._interval = interval;
		this._callback = callback;
		this._time = new Date().getTime();
		this._window.addEventListener("devicemotion",$bind(this,this._onDeviceMotion));
	}
	,stopShake: function() {
		this._window.removeEventListener("devicemotion",$bind(this,this._onDeviceMotion));
		this._callback = null;
		this._x = null;
		this._y = null;
		this._z = null;
		this._time = null;
	}
	,_onDeviceMotion: function(evt) {
		if(this._x == null || this._y == null || this._z == null) {
			this._x = evt.accelerationIncludingGravity.x;
			this._y = evt.accelerationIncludingGravity.y;
			this._z = evt.accelerationIncludingGravity.z;
			return;
		}
		var diffX = Math.abs(this._x - evt.accelerationIncludingGravity.x);
		var diffY = Math.abs(this._y - evt.accelerationIncludingGravity.x);
		var diffZ = Math.abs(this._z - evt.accelerationIncludingGravity.x);
		if(diffX > this._threshold && diffY > this._threshold || diffX > this._threshold && diffZ > this._threshold || diffY > this._threshold && diffZ > this._threshold) {
			if(new Date().getTime() - this._time > this._interval) {
				this._callback();
				this._time = new Date().getTime();
			}
		}
		this._x = evt.accelerationIncludingGravity.x;
		this._y = evt.accelerationIncludingGravity.y;
		this._z = evt.accelerationIncludingGravity.z;
	}
	,_reset: function() {
		this._x = null;
		this._y = null;
		this._z = null;
		this._time = null;
	}
};
var Reflect = function() { };
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
var Speech = $hx_exports.Speech = function() {
	if(Reflect.field(window,"SpeechRecognition") != null) this.recognition = Type.createInstance(Reflect.field(window,"SpeechRecognition"),[]); else if(Reflect.field(window,"webkitSpeechRecognition") != null) this.recognition = Type.createInstance(Reflect.field(window,"webkitSpeechRecognition"),[]);
	if(Reflect.field(window,"SpeechGrammarList") != null) this.grammarList = Type.createInstance(Reflect.field(window,"SpeechGrammarList"),[]); else if(Reflect.field(window,"webkitSpeechGrammarList") != null) this.grammarList = Type.createInstance(Reflect.field(window,"webkitSpeechGrammarList"),[]);
	this.isSupported = this.recognition != null && this.grammarList != null;
};
Speech.prototype = {
	addGrammar: function(grammar) {
		this.grammarList.addFromString(grammar,1);
	}
	,startRecognition: function(callback,endCallback) {
		var _g = this;
		this.recognition.grammars = this.grammarList;
		this.recognition.lang = Speech.language;
		this.recognition.interimResults = Speech.interimResults;
		this.recognition.maxAlternatives = Speech.maxAlternatives;
		this.recognition.start();
		this.recognition.onresult = function(event) {
			callback(event.results);
		};
		this.recognition.onspeechend = function() {
			_g.recognition.stop();
			if(endCallback != null) endCallback();
		};
	}
};
var Type = function() { };
Type.createInstance = function(cl,args) {
	var _g = args.length;
	switch(_g) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw new js__$Boot_HaxeError("Too many arguments");
	}
	return null;
};
var Vibration = $hx_exports.Vibration = function() {
	this._navigator = window.navigator;
	this.isSupported = window != null && ($_=this._navigator,$bind($_,$_.vibrate)) != null;
};
Vibration.prototype = {
	start: function(duration) {
		if(duration == null) duration = 1000;
		if(this.isSupported) this._navigator.vibrate(duration);
	}
	,startPattern: function(pattern) {
		if(this.isSupported) this._navigator.vibrate(pattern);
	}
	,stop: function() {
		if(this.isSupported) this._navigator.vibrate(0);
	}
};
var haxe_Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe_Timer.delay = function(f,time_ms) {
	var t = new haxe_Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe_Timer.prototype = {
	stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
});
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
Speech.language = "en-GB";
Speech.maxAlternatives = 1;
Speech.interimResults = false;
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : exports);

//# sourceMappingURL=device-capabilities.js.map