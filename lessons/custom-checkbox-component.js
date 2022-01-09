const templ = document.createElement("template");
templ.innerHTML = `
<!-- checkbox holder-->
<style>
.holder{
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1.5fr .5fr;
  column-gap: 1em;
  font-size: .8rem;
  margin: .5rem 0;

}

#title-holder {
  width: 100%;
  height: 26px;
  text-align: right;
  line-height: 26px;
  font-weight: bold;
}

/* The container */
.container {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
  border-radius: 4px;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: #000;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
<div class="holder">
<div id="title-holder">hello world</div>
<label class="container">
  <input id="checkbox" type="checkbox">
  <span class="checkmark"></span>
</label>
</div>
`;

class CustomCheckboxComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.init()
  }

  init(){
    this.initProps();
    this.initShadow();
    this.initCheckbox();
    this.initLabel(this.label);
  }

  initProps(){
    this.label = this.getAttribute("label");
    this.checked = this.getAttribute("checked");
  }

  initShadow() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(templ.content.cloneNode(true));
  }

  initCheckbox() {
    this.checkbox = this.shadowRoot.getElementById("checkbox");
    this.checkbox.addEventListener("input", (e) => {
      this.checked = e.target.checked
      this.dispatchEvent(
        new CustomEvent("value", {
          bubbles: true,
          composed: true,
          detail: { value: this.checked },
        })
      );
    });
  }

  initLabel(label) {
    const title = this.shadowRoot.getElementById("title-holder");
    title.innerText = label;
  }

  get ischecked(){
    return this.checked;
  }
}

window.customElements.define("custom-checkbox", CustomCheckboxComponent);
