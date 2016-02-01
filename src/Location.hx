import js.Browser;
import js.html.PositionError;
import js.html.PositionOptions;
import js.html.Position;
import js.html.Navigator;

@:expose @:keep class Location {

	/**
	* Support check.
	*
	* @property isSupported
	* @type {Bool}
	*/
	public var isSupported:Bool;

	/**
	* Locaion options.
	*
	* @property options
	* @type {PositionOptions}
	*/
	var options:PositionOptions;

	var _navigator:Navigator;
	var _monitorId:Int;

	/**
	* Class to get user location.
	*
	* @class Location
	* @constructor
	* @example
	* 		var location = new Location();
	*       location.getCurrentPosition(onLocation, onError);
	*
	*       function onLocation(position:Position) {
	*           trace(position.coords.latitude, position.coords.longitude);
	*       }
	*
	*       function onError(msg) {
	*           trace(msg);
	*       }
	*/
	public function new(?enableHighAccuracy:Bool = false, ?timeout:Int = 5000, ?maximumAge:Int = 0) {
		options = { enableHighAccuracy: enableHighAccuracy, timeout: timeout, maximumAge: maximumAge };
		_navigator = Browser.navigator;
		isSupported = (Browser.window != null && _navigator.geolocation != null);
	}

	/**
	* Function to get current position.
	*
	* @method getCurrentPosition
	* @param {Function} callback
	* @param {Function} [errorCallback]
	*/
	public function getCurrentPosition(callback:Position -> Void, ?errorCallback:String -> Void) {
		_navigator.geolocation.getCurrentPosition(callback, function(error:PositionError) {
			if (errorCallback != null) _error(error.code, errorCallback);
		}, options);
	}

	/**
	* Function to monitor position updates.
	*
	* @method monitor
	* @param {Function} updateCallback
	* @param {Function} [errorCallback]
	*/
	public function monitor(updateCallback:Position -> Void, ?errorCallback:String -> Void) {
		if (_monitorId != null) _navigator.geolocation.clearWatch(_monitorId);
		_monitorId = _navigator.geolocation.watchPosition(updateCallback, function(error:PositionError) {
			if (errorCallback != null) _error(error.code, errorCallback);
		}, options);
	}

	/**
	* Function to clear position monitoring.
	*
	* @method clearMonitor
	*/
	public function clearMonitor() {
		if (_monitorId != null) _navigator.geolocation.clearWatch(_monitorId);
		_monitorId = null;
	}

	inline function _error(code:Int, errorCallback:String -> Void) {
		switch(code) {
			case PositionError.PERMISSION_DENIED: errorCallback("User denied location request.");
			case PositionError.POSITION_UNAVAILABLE: errorCallback("Location information is unavailable.");
			case PositionError.TIMEOUT: errorCallback("The request to get user location timed out.");
			default: errorCallback("An unknown error occurred.");
		}
	}
}