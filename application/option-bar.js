customElements.define(
  "option-bar",
  class extends HTMLElement {
    static get observedAttributes() {
      return ["number", "label", "total", "max"];
    }

    constructor() {
      super();
    }

    attributeChangedCallback(name, oldValue, newValue) {
      this.render();
    }

    connectedCallback() {
      this.render();
    }

    render() {
      const label = this.getAttribute("label");
      const number = this.getAttribute("number");
      const total = this.getAttribute("total") || 100;
      const max = this.getAttribute("max") || 100;
      const percentage = Math.round((number / total) * 100);
      const width = percentage * (total / max);
      this.innerHTML = `
		<div class="option-bar__grid">
          <label class="option-bar__label">${label}</label>
          <div class="option-bar__value">${percentage}%</div>
            <div class="option-bar__bar">
            <div class="option-bar__bar__filled" style="flex: 0 0 ${width}%"></div>
            <div class="option-bar__bar__empty"></div>
          </div>
        </div>
      `;
    }
  }
);
