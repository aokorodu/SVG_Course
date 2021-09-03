const template = document.createElement("template");
template.innerHTML = `
<!-- slider holder-->
<style>
  .slider-holder {
    position: relative;
    width: 100%;
  }
  .progress {
    position: absolute;
    top: 1px;
    left: 2px;
    width: 100%;
    height: 12px;
    background-color: #c4c4c4;
    background-image: linear-gradient(#E5E2E2, #E5E2E2);
    background-repeat: no-repeat;
    background-size: 50% 100%;
    border-radius: 4px;
  }

  .progress-error {
    background-image: linear-gradient(#e00000, #e00000);
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
    transform: translateY(2px);
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
  <div id="progress" class="progress"></div>
  <input id="slider" class="slider" type="range" value="50" />
</div>
`;

class CustomSliderComponent extends HTMLElement {
  constructor() {
    super();
    this.valueChosen = false;
    this.value = 50;
    this.max = 100;
    this.min = this.getAttribute("minimum");
    this.active = this.getAttribute("active") == null ? false : true;
    this.initShadow();
    this.initSlider();
    this.initProgress();
    this.positionElements(50);
  }

  initShadow() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  initSlider() {
    this.slider = this.shadowRoot.getElementById("slider");
    this.slider.step = 0.1;
    this.slider.addEventListener("input", (e) => {
      this.valueChosen = true;
      this.updateProgress(e.target.value);
    });
  }

  initProgress() {
    this.progress = this.shadowRoot.getElementById("progress");
  }

  updateProgress(val) {
      
    this.value = Number(val);
    
    this.positionElements(this.value);
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
    const mod = this.slider.value % this.slider.step;
    let percentage = this.slider.value/this.max * 100;
    if(this.max == 0 || this.max == '0') percentage = 0;
    this.progress.style.backgroundSize = `${percentage}% 100%`;
  }

  get val(){
    return this.value;
  }

  

}

window.customElements.define("custom-slider", CustomSliderComponent);
