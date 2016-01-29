import js.html.Navigator;
import js.Browser;

// Chrome & Firefox only
@:expose @:keep class Vibration {

    public var isSupported:Bool;

    var _navigator:Navigator;

    public function new() {
        _navigator = Browser.navigator;
        isSupported = (Browser.window != null && _navigator.vibrate != null);
    }

    public function start(?duration:Int = 1000) {
        if (isSupported) _navigator.vibrate(duration);
    }

    public function startPattern(pattern:Array<Int>) {
        if (isSupported) _navigator.vibrate(pattern);
    }

    public function stop() {
        if (isSupported) _navigator.vibrate(0);
    }
}