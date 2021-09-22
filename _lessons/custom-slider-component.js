const template = document.createElement("template");
template.innerHTML = `
<!-- slider holder-->
<style>
.slider-holder {
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

#value-holder {
  width: 100%;
  height: 26px;
  text-align: left;
  line-height: 26px;
}

  #progress-holder {
    position: relative;
    width: 100%;
  }

  .progress {
    position: absolute;
    top: 7px;
    left: 2px;
    width: 100%;
    height: 12px;
    background-color: #c4c4c4;
    background-image: linear-gradient(#E5E2E2, #E5E2E2);
    background-repeat: no-repeat;
    background-size: 50% 100%;
    border-radius: 4px;
  }

  input[type="range"] {
    -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
    width: 100%; /* Specific width is required for Firefox. */
    background: transparent; /* Otherwise white in Chrome */
    outline: none; /* for testing purposes */
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 31px;
    height: 26px;
    background-color: black;
    transform: translateY(8px);
    border-radius: 4px;
    background-image: url("assets/dragger.svg");
    background-repeat: no-repeat;
    box-shadow: 0 0 0 0 black;
    transition: box-shadow 333ms;
  }

  input[type="range"]:hover::-webkit-slider-thumb {
    box-shadow: 0 0 0 2px black;
  }

  input[type="range"]::-webkit-slider-runnable-track {
    width: 100%;
    height: 20px;
    cursor: pointer;
    background: transparent;
    border-radius: 4px;
    transform: translateY(-10px);
  }

  input[type="range"]::-moz-range-track {
    width: 100%;
    height: 20px;
    cursor: pointer;
    background: transparent;
  }

  input[type="range"]::-ms-track {
    width: 100%;
    height: 20px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    border-width: 16px 0;
    color: transparent;
  }
</style>
<div class="slider-holder">
    <div id="title-holder">hello world</div>
    <div id="progress-holder">
        <div id="progress" class="progress"></div>
        <input id="slider" class="slider" type="range" value="0" min="0" max="100"/>
    </div>
    <div id="value-holder">000</div>
</div>
`;

class CustomSliderComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.init()
  }

  init(){
    this.initProps();
    this.initShadow();
    this.initSlider();
    this.initProgress(this.val);
    this.positionElements(this.val);
    this.initLabel(this.label);
    this.initValueHolder(this.val);
  }

  initValueHolder(val){
    this.valueHolder = this.shadowRoot.getElementById("value-holder");
    this.valueHolder.innerText = val;
  }

  initProps(){
    this.value = this.getAttribute("val");
    this.min = this.getAttribute("minimum");
    this.max = this.getAttribute("maximum");
    this.label = this.getAttribute("label");
    this.step = this.getAttribute("step") || 0.01;
  }

  initShadow() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  initSlider() {
    this.slider = this.shadowRoot.getElementById("slider");
    this.slider.step = this.step;
    this.slider.min = this.min;
    this.slider.max = this.max;
    this.slider.addEventListener("input", (e) => {
      this.valueChosen = true;
      this.updateProgress(e.target.value);
    });
  }

  initProgress() {
    this.progress = this.shadowRoot.getElementById("progress");
  }

  initLabel(label) {
    const title = this.shadowRoot.getElementById("title-holder");
    title.innerText = label;
  }

  updateProgress(val) {
    this.value = Number(val);
    this.positionElements(this.val);
    this.valueHolder.innerText = this.value;
    this.dispatchEvent(
      new CustomEvent("value", {
        bubbles: true,
        composed: true,
        detail: { value: Number(val), max: this.max },
      })
    );
  }

  positionElements(val){
    this.slider.value = val;
    let percentage = (this.slider.value - this.min)/(this.max - this.min) * 100;
    if(this.max == 0 || this.max == '0') percentage = 0;
    this.progress.style.backgroundSize = `${percentage}% 100%`;
  }

  get val(){
    return this.value;
  }
}

window.customElements.define("custom-slider", CustomSliderComponent);
