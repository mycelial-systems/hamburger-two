import {
    lockBodyScrolling,
    unlockBodyScrolling
} from '@substrate-system/scroll-lock'
import { WebComponent } from '@substrate-system/web-component'
import { define as _define } from '@substrate-system/web-component/util'

// for docuement.querySelector
declare global {
    interface HTMLElementTagNameMap {
        'hamburger-two':HamburgerTwo
    }
}

export class HamburgerTwo extends WebComponent.create('hamburger-two') {
    static TAG = 'hamburger-two'
    static observedAttributes = ['open']

    get isOpen ():boolean {
        return this.hasAttribute('open')
    }

    set isOpen (value:boolean) {
        const els = this._getElements()
        if (this.isOpen === value) return

        if (!value) {
            // closed
            document.body.classList.remove('hamburging')
            this.classList.remove('open')
            this.removeAttribute('open')
            els.forEach(el => el?.classList.remove('open'))
            unlockBodyScrolling(document.body)
            this.emit('close')
        } else {
            // open
            document.body.classList.add('hamburging')
            this.classList.add('open')
            this.setAttribute('open', '')
            els.forEach(el => el?.classList.add('open'))
            lockBodyScrolling(document.body)
            this.emit('open')
        }
    }

    _getElements () {
        return [
            this.querySelector('.hamburger-wrapper'),
            this.querySelector('.hamburger')
        ]
    }

    burgerIcon:null|string = null
    transition:number = 200

    constructor () {
        super()

        const transition = this.getAttribute('transition')
        if (transition) {
            this.transition = parseInt(transition)
        }

        this.isOpen = this.hasAttribute('open')
    }

    /**
     * The work happens in the setter method.
     */
    hamburgle (ev?:Event) {
        if (ev) ev.preventDefault()
        this.isOpen = !(this.isOpen)
    }

    /**
     * Handle 'open' attribute changes
     * @see {@link https://gomakethings.com/how-to-detect-when-attributes-change-on-a-web-component/#organizing-your-code Go Make Things article}
     *
     * The work is done in the getter & setter methods.
     *
     * @param  {string} oldValue The old attribute value
     * @param  {string} newValue The new attribute value
     */
    handleChange_open (oldValue:string, newValue:string) {
        if (newValue === oldValue) return

        if (newValue === null) {
            // closed
            this.isOpen = false
        } else {
            // open
            this.isOpen = true
        }
    }

    /**
     * Create DOM and listen for events.
     */
    connectedCallback () {
        this.render()
        this.addEventListener('click', ev => {
            ev.preventDefault()
            this.hamburgle()
        })
    }

    render () {
        const isOpen = this.isOpen

        this.burgerIcon = `<label class="burger" for="burger-checkbox">
            <button name="open-nav">
                <div class="container top">
                    <div class="line top"></div>
                </div>
                <div class="container middle">
                    <div class="line middle"></div>
                </div>
                <div class="container bottom">
                    <div class="line bottom"></div>
                </div>
            </button>
        </label>`

        this.innerHTML = (`<div class="hamburger-wrapper">
            <div class="${'hamburger' + (isOpen ? ' open' : '')}">
                <input type="checkbox" id="burger-checkbox" checked=${isOpen} />
                ${this.burgerIcon}
            </div>
        </div>`)
    }
}

export function define () {
    _define(HamburgerTwo.TAG, HamburgerTwo)
}

define()
