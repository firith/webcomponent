class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer = null;
    this._tooltipText = 'Some dummy tooltip text.';
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: relative;
        }
        
        ::slotted(span) {
          border: 1px dotted orangered;
        }
      
        div {
          background-color: black;
          color: white;
          position: absolute;
          z-index: 10;
        }
      </style>
      <slot>Defaul</slot>
      <span> (?)</span>
    `;
  }

  connectedCallback() {
    this._setText();
    this._addIcon();
  }

  _addIcon() {
    const tooltipIcon = this.shadowRoot.querySelector('span');

    tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
    tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));

    this.shadowRoot.appendChild(tooltipIcon);
  }

  _showTooltip() {
    this._tooltipContainer = document.createElement('div');
    this._tooltipContainer.textContent = this._tooltipText;

    this.shadowRoot.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer);
  }

  _setText() {
    if (this.hasAttribute('text')) {
      this._tooltipText = this.getAttribute('text');
    }
  }
}

customElements.define('uc-tooltip', Tooltip);
