## Varwatch :eyes:

Varwatch is :package: tiny library (no dependencies) using ES6 Proxies and EventEmitter to watch for state changes and **retrieves :rocket:**. Access proxy data easily and without changing the way native proxy callbacks are used.

**Built simple and made easy.**

### Limitations

Before continue to use, please note that this library does not support for:

- Full ES5 spec of [Proxy polyfill](https://github.com/GoogleChrome/proxy-polyfill)
- Browser (for now)
- CommonJS (Built for modern EcmaScript Modules)

In short, this library only built for ESM and Node.js environment.

### Installation

```sh
npm install varwatch
```

### Usecases

#### Watch for data changes

```js
import Varwatch from "varwatch";
const watch = new Varwatch();

const foo = watch.init();

watch.on("set", function (target, prop, value, receiver) {
  if (prop === "try") {
    console.log("Wow you try it!");
  }
  console.log(`Value of ${prop} changed to ${value}`);
});

foo.try = "Hello";
```

#### Watch for data retrieves

```js
import Varwatch from "varwatch";
const watch = new Varwatch();

const foo = watch.init();

watch.on("get", function (target, prop, receiver) {
  if (prop === "try") {
    console.log("Wow you try it!");
  }
});

foo.try = "Hello";
console.log(foo.try);
```

#### Pause watcher

```js
import Varwatch from "varwatch";
const watch = new Varwatch();

const foo = watch.init();

watch.on("get", function () {
  console.log("data retrieved");
});

watch.on("set", function () {
  console.log("data changed");
});

watch.pause();

foo.try = "bar";
console.log(foo.try);
```

#### Resume watcher

```js
import Varwatch from "varwatch";
const watch = new Varwatch();

const foo = watch.init();

watch.on("get", function () {
  console.log("data retrieved");
});

watch.on("set", function () {
  console.log("data changed");
});

watch.pause();

foo.try = "bar";
console.log(foo.try);

watch.resume();

foo.try = "foo";
console.log(foo.try);
```

#### Pause watcher (only one between get or set)

```js
import Varwatch from "varwatch";
const watch = new Varwatch();

const foo = watch.init();

watch.on("get", function () {
  console.log("data retrieved");
});

watch.on("set", function () {
  console.log("data changed");
});

watch.pause("set");

foo.try = "bar";
console.log(foo.try);
```

#### Resume watcher (only one between get or set)

```js
import Varwatch from "varwatch";
const watch = new Varwatch();

const foo = watch.init();

watch.on("get", function () {
  console.log("data retrieved");
});

watch.on("set", function () {
  console.log("data changed");
});

watch.pause("set");

foo.try = "bar";
console.log(foo.try);

watch.resume("set");

foo.try = "foo";
console.log(foo.try);
```

### License

Varwatch is licensed under [MIT License](./LICENSE)
