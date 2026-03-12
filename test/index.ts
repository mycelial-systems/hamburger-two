import { test } from '@substrate-system/tapzero'
import { HamburgerTwo } from '../src/index.js'
HamburgerTwo.define()

test('Hamburger', async t => {
    t.plan(3)

    document.body.innerHTML += `
        <hamburger-two class="test"></hamburger-two>
    `

    const el = document.querySelector('hamburger-two')!

    t.ok(el, 'should find an element')

    el.addEventListener(HamburgerTwo.event('open'), (ev) => {
        t.ok(ev, 'should emit "open" event')
    })

    // setting this opens the menu, emits the event
    el.isOpen = true

    t.ok(el.hasAttribute('open'), 'should set the attribute')
})

test('all done', () => {
    if (window) {
        // @ts-expect-error tests
        window.testsFinished = true
    }
})
