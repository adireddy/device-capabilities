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

    public function new() {
        if (Reflect.field(Browser.window, "SpeechRecognition") != null) recognition = Type.createInstance(Reflect.field(Browser.window, "SpeechRecognition"), []);
        else if (Reflect.field(Browser.window, "webkitSpeechRecognition") != null) recognition = Type.createInstance(Reflect.field(Browser.window, "webkitSpeechRecognition"), []);

        if (Reflect.field(Browser.window, "SpeechGrammarList") != null) grammarList = Type.createInstance(Reflect.field(Browser.window, "SpeechGrammarList"), []);
        else if (Reflect.field(Browser.window, "webkitSpeechGrammarList") != null) grammarList = Type.createInstance(Reflect.field(Browser.window, "webkitSpeechGrammarList"), []);

        isSupported = (recognition != null && grammarList != null);
    }

    public function addGrammar(grammar:String) {
        grammarList.addFromString(grammar, 1);
    }

    public function startRecognition(callback:Dynamic -> Void, ?endCallback:Void -> Void, ?nomatch:Void -> Void, error:Void -> Void) {
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
            if (nomatch != null) nomatch();
        };
        recognition.onerror = function(event) {
            if (error != null) error();
        };
    }
}