# hamburger two
[![tests](https://img.shields.io/github/actions/workflow/status/substrate-system/hamburger-two/nodejs.yml?style=flat-square)](https://github.com/substrate-system/hamburger-two/actions/workflows/nodejs.yml)
[![types](https://img.shields.io/npm/types/@substrate-system/hamburger-two?style=flat-square)](README.md)
[![module](https://img.shields.io/badge/module-ESM%2FCJS-blue?style=flat-square)](README.md)
[![install size](https://flat.badgen.net/packagephobia/install/@bicycle-codes/keys?cache-control=no-cache)](https://packagephobia.com/result?p=@bicycle-codes/keys)
[![gzip size](https://img.shields.io/bundlephobia/minzip/@substrate-system/hamburger-two?style=flat-square)](https://bundlephobia.com/package/@substrate-system/hamburger-two)
[![semantic versioning](https://img.shields.io/badge/semver-2.0.0-blue?logo=semver&style=flat-square)](https://semver.org/)
[![Common Changelog](https://nichoth.github.io/badge/common-changelog.svg)](./CHANGELOG.md)
[![license](https://img.shields.io/badge/license-Big_Time-blue?style=flat-square)](LICENSE)

Another hamburger menu, as a
[web component](https://developer.mozilla.org/en-US/docs/Web/API/Web_components).
This extends
[@susbtrate-system/web-component](https://www.npmjs.com/package/@substrate-system/web-component).

[See a live demo](https://substrate-system.github.io/hamburger-two/)

>
> [!NOTE]  
> In the example page, you must be in mobile view to see the component.
>

See [@substrate-system/hamburger](https://github.com/substrate-system/hamburger/)
for something similar but with different style.

<details><summary><h2>Contents</h2></summary>

<!-- toc -->

- [Install](#install)
- [Use](#use)
  * [HTML](#html)
  * [Javascript](#javascript)
  * [CSS](#css)
  * [events](#events)
- [Example](#example)
- [Modules](#modules)
  * [ESM](#esm)
  * [Common JS](#common-js)
  * [pre-built](#pre-built)
- [CSS](#css-1)
  * [Import CSS](#import-css)
  * [Customize CSS via variables](#customize-css-via-variables)
- [test](#test)
- [Develop](#develop)
- [See also](#see-also)

<!-- tocstop -->

</details>


## Install

```sh
npm i -S @substrate-system/hamburger-two
```

## Use

Just import; the library code calls `window.customElements.define`.
`hamburger-two`.

>
> [!NOTE]  
> This module only has client-side code. There is no provision for server-side
> rendering, because this element is only useful on the client-side.
>

### HTML

Application code should listen for hamburger events, and show/hide the menu.

```html
    <hamburger-two></hamburger-two>

    <div class="mobile-nav-menu">
        <ul>
          <li><a href="/hello">hello</a></li>
          <li><a href="/abc">abc</a></li>
          <li><a href="/def">def</a></li>
        </ul>
    </div>
```

### Javascript

```js
import { HamburgerTwo } from '@substrate-system/hamburger-two'
import '@substrate-system/hamburger-two/css'

// tag name is exposed as .TAG
const el = document.querySelector(HamburgerTwo.TAG)

// programmatically open the menu
el?.isOpen = true

// listen for events, then change the class on our navigation element
el?.addEventListener(HamburgerTwo.event('open'), () => {
    debug('menu is open...')
    document.querySelector('.mobile-nav-menu')!.classList.add('open')
})

// or use .on, because this extends @substrate-system/web-component
el.on('open', ev => {
    // ...
})

el?.addEventListener(HamburgerTwo.event('close'), () => {
    debug('menu is closed...')
    document.querySelector('.mobile-nav-menu')!.classList.remove('open')
})
```

### CSS

Only display on small screens. **This needs to be part of the application code**;
it is not in this library.

```css
hamburger-two {
    display: none;
}

/* show/hide our menu */
.mobile-nav-menu {
    display: none;

    &.open {
        display: flex;
    }
}

@media (width < 680px) {
    hamburger-two {
        display: block;
    }
}
```

### events

Typically you would use the tag in the DOM, then listen for events and show/hide
a menu element in response.

#### open

```js
HamburgerTwo.event('open')
// => 'hamburger-two:open'
```

```js
document.querySelector('hamburger-two')
    .addEventListener(HamburgerTwo.event('open'), () => {
        document
            .querySelector('.mobile-nav-menu')
            .classList
            .add('open')
    })
```

#### close

```js
HamburgerTwo.event('close')
// => 'hamburger-two:close'
```

```js
document.querySelector('hamburger-two')
    .addEventListener(HamburgerTwo.event('close'), () => {
        document
            .querySelector('.mobile-nav-menu')
            .classList
            .remove('open')
    })
```


## Example

See [./example](./example/index.ts).

```js
// after registering the component
document.body.innerHTML += `
    <hamburger-two></hamburger-two>
`

const el = document.querySelector('hamburger-two')

el?.addEventListener(HamburgerTwo.event('open'), () => {
    debug('menu is open...')
    document.querySelector('.mobile-nav-menu')!.classList.add('open')
})

el?.addEventListener(HamburgerTwo.event('close'), () => {
    debug('menu is closed...')
    document.querySelector('.mobile-nav-menu')!.classList.remove('open')
})
```

## Modules

This exposes ESM and common JS via
[package.json `exports` field](https://nodejs.org/api/packages.html#exports).

### ESM
```js
import { HamburgerTwo } from '@substrate-system/hamburger-two'
```

### Common JS
```js
require('@substrate-system/hamburger-two')
```

### pre-built

This package exposes minified JS and CSS files too. Copy them to a location that
is accessible to your web server, then link to them in HTML.

#### copy
```sh
cp ./node_modules/@substrate-system/hamburger-two/dist/index.min.js ./public/hamburger-two.min.js
cp ./node_modules/@substrate-system/hamburger-two/dist/style.min.css ./public/hamburger-two.css
```

#### HTML
```html
<head>
    <link rel="stylesheet" href="./hamburger-two.css">
</head>
<body>
    <!-- ... -->
    <script type="module" src="./hamburger-two.min.js"></script>
</body>
```

## CSS

### Import CSS

```js
import '@substrate-system/hamburger-two/css'
```

Or minified:
```js
import '@substrate-system/hamburger-two/css/min'
```

### Customize CSS via variables

You can redefine some CSS variables. `--burger-open-color` sets the color of
the close "x" button when the menu is open. Default is "white".

```css
:root {
    --burger-open-color: white;
    --fade-in-time: 0.4s;
}
```

## test

Run some tests locally with [tape-run](https://github.com/tape-testing/tape-run).

```sh
npm test
```

## Develop

Start a localhost server of the example page.

```sh
npm start
```

## See also

* [@substrate-system/hamburger](https://github.com/substrate-system/hamburger/)
  The same thing, different style.
