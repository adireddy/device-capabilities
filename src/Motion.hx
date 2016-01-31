import js.html.DeviceMotionEvent;
import js.html.Window;
import js.Browser;

@:keep @:expose class Motion {

    var _window:Window;
    var _x:Float;
    var _y:Float;
    var _z:Float;
    var _time:Float;
    var _threshold:Int;
    var _interval:Int;
    var _callback:Void -> Void;

    /**
	* Class for shake(devicemotion) functionality.
	*
	* @class Motion
	* @constructor
	* @example
	* 		var motion = new Motion();
	* 		motion.shake(onShake);
	* 		function onShake() {
	* 	        trace("shake detected");
	*       }
	*/
    public function new() {
        _window = Browser.window;
    }

    /**
	* Function to detect shake motion.
	*
	* @method shake
	* @param {Function} callback
	* @param {Int} [threshold = 10]
	* @param {Int} [interval = 1000]
	*/
    public function shake(callback:Void -> Void, ?threshold:Int = 10, ?interval:Int = 1000) {
        _reset();
        _threshold = threshold;
        _interval = interval;
        _callback = callback;
        _time = Date.now().getTime();
        _window.addEventListener("devicemotion", _onDeviceMotion);
    }

    /**
	* Function to stop shake motion detection.
	*
	* @method stopShake
	*/
    public function stopShake() {
        _window.removeEventListener("devicemotion", _onDeviceMotion);
        _callback = null;
        _reset();
    }

    function _onDeviceMotion(evt:DeviceMotionEvent) {
        if (_x == null || _y == null || _z == null) {
            _x = evt.accelerationIncludingGravity.x;
            _y = evt.accelerationIncludingGravity.y;
            _z = evt.accelerationIncludingGravity.z;
            return;
        }

        var diffX = Math.abs(_x - evt.accelerationIncludingGravity.x);
        var diffY = Math.abs(_y - evt.accelerationIncludingGravity.x);
        var diffZ = Math.abs(_z - evt.accelerationIncludingGravity.x);

        if ((diffX > _threshold && diffY > _threshold) || (diffX > _threshold && diffZ > _threshold) || (diffY > _threshold && diffZ > _threshold)) {
            if (Date.now().getTime() - _time > _interval) {
                _callback();
                _time = Date.now().getTime();
            }
        }

        _x = evt.accelerationIncludingGravity.x;
        _y = evt.accelerationIncludingGravity.y;
        _z = evt.accelerationIncludingGravity.z;
    }

    inline function _reset() {
        _x = null;
        _y = null;
        _z = null;
        _time = null;
    }
}