/**
 * Event Constants
 */
export declare const CONNECTED = "CONNECTED";
export declare const CONNECTION_SUSPENDED = "CONNECTION_SUSPENDED";
export declare const CONNECTION_FAILED = "CONNECTION_FAILED";
export declare const DISCONNECTED = "DISCONNECTED";
export declare const MESSAGE_FOUND = "MESSAGE_FOUND";
export declare const MESSAGE_LOST = "MESSAGE_LOST";
export declare const DISTANCE_CHANGED = "DISTANCE_CHANGED";
export declare const BLE_SIGNAL_CHANGED = "BLE_SIGNAL_CHANGED";
export declare const PUBLISH_SUCCESS = "PUBLISH_SUCCESS";
export declare const PUBLISH_FAILED = "PUBLISH_FAILED";
export declare const SUBSCRIBE_SUCCESS = "SUBSCRIBE_SUCCESS";
export declare const SUBSCRIBE_FAILED = "SUBSCRIBE_FAILED";
declare type EventHandler = (messge: string | null, value: number | null) => void;
interface Event {
    event: string;
    message: string;
    value: any;
}
export declare class NearbyAPI {
    /**
     * Initializer for the RNNearbyApi wrapper.
     * @param {Boolean} bleOnly Only utilizes bluetooth through the Google Nearby SDK. Defaults to `true`.
     */
    private _nearbyAPI;
    private _eventEmitter;
    private _handlers;
    private _deviceEventSubscription;
    private _isBLEOnly;
    constructor(bleOnly: boolean);
    connect: (apiKey: string) => void;
    disconnect: () => void;
    isConnected: (cb: (value: boolean) => void) => void;
    publish: (message: string) => void;
    isPublishing: (cb: (value: boolean) => void) => void;
    subscribe: () => void;
    isSubscribing: (cb: (value: boolean) => void) => void;
    unpublish: () => void;
    unsubscribe: () => void;
    /**
     * Handler Helper Functions.
     */
    onConnected: (handler: EventHandler) => void;
    onConnectionFailure: (handler: EventHandler) => void;
    onConnectionSuspended: (handler: EventHandler) => void;
    onDisconnected: (handler: EventHandler) => void;
    onFound: (handler: EventHandler) => void;
    onLost: (handler: EventHandler) => void;
    onDistanceChanged: (handler: EventHandler) => void;
    onBLESignalChanged: (handler: EventHandler) => void;
    onPublishSuccess: (handler: EventHandler) => void;
    onPublishFailed: (handler: EventHandler) => void;
    onSubscribeSuccess: (handler: EventHandler) => void;
    onSubscribeFailed: (handler: EventHandler) => void;
    _setHandler: (eventName: string, handler: EventHandler) => void;
    _eventHandler: (event: Event) => void;
}
export {};
