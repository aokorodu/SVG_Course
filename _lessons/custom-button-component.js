const button_template = document.createElement("template");
button_template.innerHTML = `
<!-- slider holder-->
<style>

.button {
  padding: .5rem 1rem;
  border-radius: 4px;
  background-color: #eaeaea;
  color: #000;
  font-size: .8rem;
  text-align: center;
  transition-property: all;
  transition-timing-function: ease-in-out;
  transition-duration: 150ms;
  width:fit-content;
  min-width: 100px;
}

.button:hover {
  background-color: #787777;
    color: #eaeaea;
}

  
  
</style>
<div id="button" class="button">
</div>
`;

class CustomButtonComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.init()
  }

  init(){
    this.initProps();
    this.initShadow();
    this.initButton();
  }

  initProps(){
    this.value = this.getAttribute("val");
    this.label = this.getAttribute("label");
  }

  initShadow() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(button_template.content.cloneNode(true));
  }

  initButton() {
    const button = this.shadowRoot.getElementById("button");
    button.innerText = this.label;

    button.addEventListener("click", ()=>{
      this.dispatchEvent(
        new CustomEvent("value", {
          bubbles: true,
          composed: true,
          detail: { value: this.value},
        })
      );
    })
  }

  get val(){
    return this.value;
  }
}

window.customElements.define("custom-button", CustomButtonComponent);
