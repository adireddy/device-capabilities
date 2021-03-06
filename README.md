# ![device-capabilities logo](https://raw.githubusercontent.com/adireddy/device-capabilities/master/logo.png)
Library to detect and use capabilities like Battery, DeviceMotion, Vibration, etc.

![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)

[![Build Status](https://travis-ci.org/adireddy/device-capabilities.svg?branch=master)](https://travis-ci.org/adireddy/device-capabilities)
[![npm version](https://badge.fury.io/js/device-capabilities.js.svg)](https://badge.fury.io/js/device-capabilities.js)
[![Code Climate](https://codeclimate.com/github/adireddy/device-capabilities/badges/gpa.svg)](https://codeclimate.com/github/adireddy/device-capabilities)
[![Code Climate Issues](https://img.shields.io/codeclimate/issues/github/adireddy/device-capabilities.svg)](https://codeclimate.com/github/adireddy/device-capabilities/issues)

### Installation

`npm install device-capabilities.js`

For haxe users:

`haxelib install device-capabilities`

### [API Documentation](http://adireddy.github.io/docs/device-capabilities/)

### Usage

```js
<script src="dist/device-capabilities.min.js"></script>
```

```js
var batterySupport = new BatterySupport(onReady);
var vibration = new Vibration();
var motion = new Motion();

function onReady() {
	console.log(batterySupport.isSupported);
	console.log("Charging: " + batterySupport.battery.charging);
	console.log("Charging Time: " + batterySupport.battery.chargingTime);
	console.log("Level: " + batterySupport.battery.level);
	console.log("Discharging Time: " + batterySupport.battery.dischargingTime);
}

motion.shake(onShake);
function onShake() {
	console.log("shake detected");
}

if (vibration.isSupported) {
    vibration.start(10000); // Vibrates for 10 seconds
    vibration.startPattern([200, 100, 300, 200, 50, 50, 50, 50, 1000]); // On and off vibration pattern
    vibration.stop(); // Stops vibration
}
```

### Demo

- [JavaScript](http://adireddy.github.io/demos/device-capabilities/)

### Licensing Information

<a rel="license" href="http://opensource.org/licenses/MIT">
<img alt="MIT license" height="40" src="http://upload.wikimedia.org/wikipedia/commons/c/c3/License_icon-mit.svg" /></a>

This content is released under the [MIT](http://opensource.org/licenses/MIT) License.

Icon by [Icons8](https://icons8.com)

### Contributor Code of Conduct ###

[Code of Conduct](https://github.com/CoralineAda/contributor_covenant) is adapted from
[Contributor Covenant, version 1.4](http://contributor-covenant.org/version/1/4)
