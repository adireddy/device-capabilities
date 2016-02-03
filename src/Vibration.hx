import js.html.Navigator;
import js.Browser;

@:expose @:keep class Vibration {

	/**
	* Support check.
	*
	* @property isSupported
	* @type {Bool}
	*/
	public var isSupported:Bool;

	var _navigator:Navigator;

	/**
	* Class to vibrate the device.
	*
	* @class Vibration
	* @constructor
	* @example
	* 		var vibration = new Vibration();
	* 		vibration.start(2000);
	*/
	public function new() {
		_navigator = Browser.navigator;
		isSupported = (Browser.window != null && _navigator.vibrate != null);
	}

	/**
	* Function to start vibration.
	*
	* @method start
	* @param {Int} [duration = 1000]
	*/
	public function start(?duration:Int = 1000) {
		if (isSupported) _navigator.vibrate(duration);
	}

	/**
	* Function to start vibration pattern.
	*
	* @method startPattern
	* @param {Array<Int>} pattern
	* @example
	*       vibration.startPattern([200, 100, 300, 50, 200]);
	*/
	public function startPattern(pattern:Array<Int>) {
		if (isSupported) _navigator.vibrate(pattern);
	}

	/**
	* Function to stop vibration.
	*
	* @method stop
	*/
	public function stop() {
		if (isSupported) _navigator.vibrate(0);
	}
}