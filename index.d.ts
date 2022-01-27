// Type definitions for 3box 1.22
// Project: https://github.com/bl0cknumber/varwatch
// Definitions by: Muhammad Fauzan / bl0cknumber (https://github.com/bl0cknumber)

declare module "varwatch" {
  export default class Varwatch<T extends object> {
    constructor();
    // init watcher
    init(): typeof Proxy;
    // proxy getter method
    get(target: T, prop: string | symbol, receiver: any): any;
    // proxy setter method
    set(target: T, prop: string | symbol, value: any, receiver: any): boolean;
    // bind on from EventEmitter to new Varwatch().on
    on(eventName: string, callback: Function): void;
    // isPaused, used for core filter
    isPaused(eventName: string, callback: Function): boolean | void;
    // pause watcher event/s
    pause(eventName: string): void;
    // resume watcher event/s
    remove(eventName: string): void;
  }
}
