(function (console, $hx_exports) { "use strict";
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
	}); else if(ready != null) ready();
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
		return null;
	}
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
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : exports);

//# sourceMappingURL=device-capabilities.js.map