import { html } from 'lit-element';
import TrackedElement from './tracked-element';
import icons from './assets/img/icons';
import loginButtonCSS from './styles/login-button';
import formatUrl from './lib/formatUrl';

class LoginButton extends TrackedElement {
  static get styles() {
    return loginButtonCSS;
  }

  static get properties() {
    return {
      baseHost: { type: String },
      config: { type: Object },
      openMenu: { type: String },
    };
  }

  constructor() {
    super();
    this.config = {};
    this.openMenu = '';
  }

  get signupPath() {
    return formatUrl('/account/signup', this.baseHost);
  }

  get loginPath() {
    return formatUrl('/account/login', this.baseHost);
  }

  get analyticsEvent() {
    return `${this.config.eventCategory}|NavLoginIcon`;
  }

  get menuOpened() {
    return this.openMenu === 'login';
  }

  get avatarClass() {
    return `dropdown-toggle${this.menuOpened ? ' active' : ''}`;
  }

  toggleDropdown(e) {
    e.preventDefault();
    this.trackClick(e);
    this.dropdownTabIndex = this.menuOpened ? '' : '-1';
    this.dispatchEvent(new CustomEvent('menuToggled', {
      bubbles: true,
      composed: true,
      detail: {
        menuName: 'login'
      }
    }));
  }

  render() {
    return html`
      <div class="logged-out-toolbar">
        <a
          class="${this.avatarClass}"
          @click=${this.toggleDropdown}
          data-event-click-tracking="${this.analyticsEvent}"
        >
          ${icons.user}
        </a>
        <span>
        <a href="${this.signupPath}">Sign up</a>
        |
        <a href="${this.loginPath}">Log in</a>
        </span>
      </div>
    `;
  }
}

customElements.define('login-button', LoginButton);
