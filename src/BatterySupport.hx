import haxe.Timer;
import js.Browser;
import js.html.BatteryManager;
import js.html.Navigator;

@:expose @:keep class BatterySupport {

	/**
	* Support check.
	*
	* @property isSupported
	* @type {Bool}
	*/
	public var isSupported:Bool;

	/**
	* Battery manager instance.
	*
	* @property battery
	* @type {BatteryManager}
	*/
	public var battery:BatteryManager;

	var _navigator:Navigator;

	/**
	* Class to access battery manager.
	*
	* @class BatterySupport
	* @constructor
	* @example
	* 		var batterySupport = new BatterySupport(onReady);
	*
	* 	    function onReady() {
	* 	        trace(batterySupport.isSupported);
	* 	        if (batterySupport.isSupported) {
	* 	            trace(batterySupport.battery.level);
	* 	        }
	* 	    }
	*/
	public function new(?ready:Void -> Void) {
		_navigator = Browser.navigator;
		battery = _navigator.battery;
		if (battery == null) battery = Reflect.field(_navigator, "webkitBattery");
		if (battery == null) battery = Reflect.field(_navigator, "mozBattery");
		isSupported = (battery != null);
		if (battery == null && Reflect.field(_navigator, "getBattery") != null) {
			untyped __js__("window.navigator").getBattery().then(function(b) {
				battery = b;
				isSupported = true;
				if (ready != null) ready();
			});
		}
		else {
			if (ready != null) Timer.delay(ready, 1);
		}
	}
}