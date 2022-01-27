/*
 * Copyright (C) 2022 Muhammad Fauzan, bl0cknumber - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the MIT license.
 *
 * Extra Information:
 * Copyright is the legal term used to declare and prove who owns the intellectual property (the code, text, etc.).
 * Licensing is the legal term used to describe the terms under which people are allowed to use the copyrighted material.
 */

import EventEmitter from "events";
// declare event emitter
const event = new EventEmitter();

// import Varwatch from "varwatch"
export default class Varwatch {
  constructor() {
    this.pausedEvents = {
      get: false,
      set: false,
    };

    this.currentVar = new Proxy(
      {},
      {
        pausedEvents: this.pausedEvents,
        get: this.get,
        set: this.set,
        isPaused: this.isPaused,
      }
    );
  }

  init() {
    return this.currentVar;
  }

  get(target, prop, receiver) {
    const paused = this.isPaused("get");
    if (!paused) {
      event.emit("get", target, prop, receiver);
    }

    return target[prop];
  }

  set(target, prop, value, receiver) {
    const paused = this.isPaused("set");
    if (!paused) {
      event.emit("set", target, prop, value, receiver);
    }

    // function set(target: object, propertyKey: PropertyKey, value: any, receiver?: any): boolean;
    return Reflect.set(...arguments);
  }

  on(eventName, callback) {
    if (eventName !== "get" && eventName !== "set") {
      throw new Error(
        `Event ${eventName.toString()} is not exist, use get or set only.`
      );
    }
    event.on(eventName, callback);
  }

  isPaused(eventName) {
    return this.pausedEvents[eventName];
  }

  pause(eventName) {
    if (eventName) {
      if (eventName !== "get" && eventName !== "set") {
        throw new Error(
          `Event ${eventName.toString()} is not exist, use get or set only.`
        );
      } else {
        this.pausedEvents[eventName] = true;
      }
    } else {
      this.pausedEvents["get"] = true;
      this.pausedEvents["set"] = true;
    }
  }

  resume(eventName) {
    if (eventName) {
      if (eventName !== "get" && eventName !== "set") {
        throw new Error(
          `Event ${eventName.toString()} is not exist, use get or set only.`
        );
      } else {
        this.pausedEvents[eventName] = false;
      }
    } else {
      this.pausedEvents["get"] = false;
      this.pausedEvents["set"] = false;
    }
  }
}
