"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const { RNNearbyApi } = react_native_1.NativeModules;
/**
 * Event Constants
 */
exports.CONNECTED = 'CONNECTED';
exports.CONNECTION_SUSPENDED = 'CONNECTION_SUSPENDED';
exports.CONNECTION_FAILED = 'CONNECTION_FAILED';
exports.DISCONNECTED = 'DISCONNECTED';
exports.MESSAGE_FOUND = 'MESSAGE_FOUND';
exports.MESSAGE_LOST = 'MESSAGE_LOST';
exports.DISTANCE_CHANGED = 'DISTANCE_CHANGED';
exports.BLE_SIGNAL_CHANGED = 'BLE_SIGNAL_CHANGED';
exports.PUBLISH_SUCCESS = 'PUBLISH_SUCCESS';
exports.PUBLISH_FAILED = 'PUBLISH_FAILED';
exports.SUBSCRIBE_SUCCESS = 'SUBSCRIBE_SUCCESS';
exports.SUBSCRIBE_FAILED = 'SUBSCRIBE_FAILED';
class NearbyAPI {
    constructor(bleOnly) {
        this.connect = (apiKey) => {
            this._nearbyAPI.connect(apiKey, this._isBLEOnly);
        };
        this.disconnect = () => {
            this._nearbyAPI.disconnect();
        };
        this.isConnected = (cb) => {
            this._nearbyAPI.isConnected((raw) => {
                cb(!!raw);
            });
        };
        this.publish = (message) => {
            if (message !== null) {
                this._nearbyAPI.publish(message);
            }
            else {
                throw new Error('Unable to publish a null message.');
            }
        };
        this.isPublishing = (cb) => {
            this._nearbyAPI.isPublishing((raw) => {
                cb(!!raw);
            });
        };
        this.subscribe = () => {
            this._nearbyAPI.subscribe();
        };
        this.isSubscribing = (cb) => {
            this._nearbyAPI.isSubscribing((raw) => {
                cb(!!raw);
            });
        };
        this.unpublish = () => {
            this._nearbyAPI.unpublish();
        };
        this.unsubscribe = () => {
            this._nearbyAPI.unsubscribe();
        };
        /**
         * Handler Helper Functions.
         */
        this.onConnected = (handler) => {
            this._setHandler(exports.CONNECTED, handler);
        };
        this.onConnectionFailure = (handler) => {
            this._setHandler(exports.CONNECTION_FAILED, handler);
        };
        this.onConnectionSuspended = (handler) => {
            this._setHandler(exports.CONNECTION_SUSPENDED, handler);
        };
        this.onDisconnected = (handler) => {
            this._setHandler(exports.DISCONNECTED, handler);
        };
        this.onFound = (handler) => {
            this._setHandler(exports.MESSAGE_FOUND, handler);
        };
        this.onLost = (handler) => {
            this._setHandler(exports.MESSAGE_LOST, handler);
        };
        this.onDistanceChanged = (handler) => {
            this._setHandler(exports.DISTANCE_CHANGED, handler);
        };
        this.onBLESignalChanged = (handler) => {
            this._setHandler(exports.BLE_SIGNAL_CHANGED, handler);
        };
        this.onPublishSuccess = (handler) => {
            this._setHandler(exports.PUBLISH_SUCCESS, handler);
        };
        this.onPublishFailed = (handler) => {
            this._setHandler(exports.PUBLISH_FAILED, handler);
        };
        this.onSubscribeSuccess = (handler) => {
            this._setHandler(exports.SUBSCRIBE_SUCCESS, handler);
        };
        this.onSubscribeFailed = (handler) => {
            this._setHandler(exports.SUBSCRIBE_FAILED, handler);
        };
        this._setHandler = (eventName, handler) => {
            this._handlers[eventName] = handler;
        };
        this._eventHandler = (event) => {
            if (this._handlers.hasOwnProperty(event.event)) {
                this._handlers[event.event](event.hasOwnProperty('message') ? event.message : null, event.hasOwnProperty('value') ? event.value : null);
            }
        };
        this._nearbyAPI = RNNearbyApi;
        this._eventEmitter =
            react_native_1.Platform.OS === 'android'
                ? react_native_1.DeviceEventEmitter
                : new react_native_1.NativeEventEmitter(this._nearbyAPI);
        this._handlers = {};
        this._deviceEventSubscription = this._eventEmitter.addListener('subscribe', this._eventHandler.bind(this));
        this._isBLEOnly = !!bleOnly;
    }
}
exports.NearbyAPI = NearbyAPI;
