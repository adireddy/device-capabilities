import js.Browser;
import js.html.SpeechRecognitionEvent;
import js.html.SpeechGrammarList;
import js.html.SpeechRecognition;

@:expose @:keep class Speech {

    public static var language:String = "en-GB";
    public static var maxAlternatives:Int = 1;
    public static var interimResults:Bool = false;

    /**
	* Support check.
	*
	* @property isSupported
	* @type {Bool}
	*/
    public var isSupported:Bool;

    public var recognition:SpeechRecognition;
    public var grammarList:SpeechGrammarList;

    /**
	* Class for speech recognition.
	*
	* @class Vibration
	* @constructor
	* @example
	* 		var speech = new Speech();
	* 		vibration.startRecognition(onResult);
	*
	*       function onResult(results) {
	* 	        trace(results[0][0].transcript);
	*       }
	*/
    public function new() {
        if (Reflect.field(Browser.window, "SpeechRecognition") != null) recognition = Type.createInstance(Reflect.field(Browser.window, "SpeechRecognition"), []);
        else if (Reflect.field(Browser.window, "webkitSpeechRecognition") != null) recognition = Type.createInstance(Reflect.field(Browser.window, "webkitSpeechRecognition"), []);

        if (Reflect.field(Browser.window, "SpeechGrammarList") != null) grammarList = Type.createInstance(Reflect.field(Browser.window, "SpeechGrammarList"), []);
        else if (Reflect.field(Browser.window, "webkitSpeechGrammarList") != null) grammarList = Type.createInstance(Reflect.field(Browser.window, "webkitSpeechGrammarList"), []);

        isSupported = (recognition != null && grammarList != null);
    }

    /**
	* Function to add grammar string.
	*
	* @method addGrammar
	* @param {String} grammar
	*/
    public function addGrammar(grammar:String) {
        grammarList.addFromString(grammar, 1);
    }

    /**
	* Function to start speech recognition.
	*
	* @method startRecognition
	* @param {Function} callback
	* @param {Function} [endCallback]
	* @param {Function} [noMatchCallback]
	* @param {Function} [errorCallback]
	*/
    public function startRecognition(callback:Dynamic -> Void, ?endCallback:Void -> Void, ?noMatchCallback:Void -> Void, ?errorCallback:Void -> Void) {
        recognition.grammars = grammarList;
        recognition.lang = language;
        recognition.interimResults = interimResults;
        recognition.maxAlternatives = maxAlternatives;
        recognition.start();
        recognition.onresult = function(event:SpeechRecognitionEvent) {
            callback(event.results);
        };
        recognition.onspeechend = function() {
            recognition.stop();
            if (endCallback != null) endCallback();
        };
        recognition.onnomatch = function(event) {
            if (noMatchCallback != null) noMatchCallback();
        };
        recognition.onerror = function(event) {
            if (errorCallback != null) errorCallback();
        };
    }
}