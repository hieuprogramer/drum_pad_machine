const projectName = "drum-machine";

// coded by @no-stack-dub-sack (github) / @no_stack_sub_sack (codepen)

const bankOne = [
{
  keyCode: 81,
  keyTrigger: "Q",
  id: "Heater-1",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" },

{
  keyCode: 87,
  keyTrigger: "W",
  id: "Heater-2",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" },

{
  keyCode: 69,
  keyTrigger: "E",
  id: "Heater-3",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" },

{
  keyCode: 65,
  keyTrigger: "A",
  id: "Heater-4",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" },

{
  keyCode: 83,
  keyTrigger: "S",
  id: "Clap",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" },

{
  keyCode: 68,
  keyTrigger: "D",
  id: "Open-HH",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" },

{
  keyCode: 90,
  keyTrigger: "Z",
  id: "Kick-n'-Hat",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" },

{
  keyCode: 88,
  keyTrigger: "X",
  id: "Kick",
  url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" },

{
  keyCode: 67,
  keyTrigger: "C",
  id: "Closed-HH",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" }];



const bankTwo = [
{
  keyCode: 81,
  keyTrigger: "Q",
  id: "Chord-1",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3" },

{
  keyCode: 87,
  keyTrigger: "W",
  id: "Chord-2",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3" },

{
  keyCode: 69,
  keyTrigger: "E",
  id: "Chord-3",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3" },

{
  keyCode: 65,
  keyTrigger: "A",
  id: "Shaker",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3" },

{
  keyCode: 83,
  keyTrigger: "S",
  id: "Open-HH",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3" },

{
  keyCode: 68,
  keyTrigger: "D",
  id: "Closed-HH",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3" },

{
  keyCode: 90,
  keyTrigger: "Z",
  id: "Punchy-Kick",
  url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3" },

{
  keyCode: 88,
  keyTrigger: "X",
  id: "Side-Stick",
  url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3" },

{
  keyCode: 67,
  keyTrigger: "C",
  id: "Snare",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3" }];


const inactiveStyle = {
  height: 50,
  backgroundColor: '#c2e59c',
  boxShadow: "3px 3px 5px black",
  userSelect: "none" };

const activeStyle = {
  height: 50,
  backgroundColor: '#faffd1',
  boxShadow: "3px 3px 5px black",
  userSelect: "none" };


class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      padStyle: inactiveStyle };

    this.playSound = this.playSound.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.activatePad = this.activatePad.bind(this);
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }
  handleKeyPress(e) {
    console.log(e.keyCode, this.props.keyCode);
    if (e.keyCode === this.props.keyCode) {
      this.playSound();
    }
  }
  activatePad() {
    if (this.state.padStyle.backgroundColor === '#c2e59c') {
      this.setState({
        padStyle: activeStyle });

    } else {
      this.setState({
        padStyle: inactiveStyle });

    }
  }
  playSound() {
    const sound = document.getElementById(this.props.keyTrigger);
    sound.currentTime = 0;
    sound.play();
    this.activatePad();
    setTimeout(() => this.activatePad(), 100);
    if (this.props.power)
    this.props.updateDisplay(this.props.clipID.replace(/-/g, " "));
  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", {
        className: "drum-pad",
        id: this.props.clipID,
        onClick: this.playSound,
        style: this.state.padStyle }, /*#__PURE__*/
      React.createElement("audio", {
        className: "clip",
        id: this.props.keyTrigger,
        src: this.props.clip }),

      this.props.keyTrigger));


  }}

class PadBank extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let padbank;
    if (this.props.power) {
      padbank = this.props.currentBank.map((drumObj, j, padBankArr) => {
        return /*#__PURE__*/(
          React.createElement(DrumPad, {
            clipID: drumObj.id,
            clip: drumObj.url,
            updateDisplay: this.props.updateDisplay,
            power: this.props.power,
            keyTrigger: drumObj.keyTrigger,
            keyCode: drumObj.keyCode }));


      });
    } else {
      padbank = this.props.currentBank.map((drumObj, j, padBankArr) => {
        return /*#__PURE__*/(
          React.createElement(DrumPad, {
            clipID: drumObj.id,
            clip: "#",
            updateDisplay: this.props.updateDisplay,
            keyTrigger: drumObj.keyTrigger,
            keyCode: drumObj.keyCode }));


      });
    }
    return /*#__PURE__*/(
      React.createElement("div", { className: "pad-bank" }, padbank));

  }}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: '',
      power: true,
      currentBank: bankOne,
      sliderVal: 0.5 };

    this.powerControl = this.powerControl.bind(this);
    this.selectBank = this.selectBank.bind(this);
    this.displayClipName = this.displayClipName.bind(this);
    this.volumeControl = this.volumeControl.bind(this);
  }
  powerControl() {
    this.setState({
      power: !this.state.power,
      display: '' });

  }
  selectBank() {
    if (this.state.power) {
      if (this.state.currentBank === bankOne) {
        this.setState({
          currentBank: bankTwo,
          display: "Smooth piano" });

      } else {
        this.setState({
          currentBank: bankOne,
          display: "Rock" });

      }
    }
  }
  displayClipName(name) {
    console.log(name);
    this.setState({
      display: name });

  }
  volumeControl(e) {
    if (this.state.power) {
      this.setState({
        sliderVal: e.target.value,
        display: "Volume: " + Math.round(e.target.value * 100) });

      setTimeout(() => this.clearDisplay(), 1000);
    }
  }
  clearDisplay() {
    this.setState({
      display: '' });

  }
  render() {
    const powerStyle = this.state.power ?
    { float: "right" } :
    { float: "left" };
    const bankStyle = this.state.currentBank === bankOne ?
    { float: "left" } :
    { float: "right" };
    {
      const clips = [].slice.call(document.getElementsByClassName("clip"));
      clips.forEach(sound => {
        sound.volume = this.state.sliderVal;
      });
    }
    return /*#__PURE__*/(
      React.createElement("div", { id: "drum-machine" }, /*#__PURE__*/
      React.createElement(PadBank, {
        power: this.state.power,
        currentBank: this.state.currentBank,
        updateDisplay: this.displayClipName }), /*#__PURE__*/

      React.createElement("div", { className: "control-container" }, /*#__PURE__*/

      React.createElement("div", { className: "control" }, /*#__PURE__*/
      React.createElement("p", null, "Power"), /*#__PURE__*/
      React.createElement("div", { className: "select", onClick: this.powerControl }, /*#__PURE__*/
      React.createElement("div", { className: "inner", style: powerStyle }))), /*#__PURE__*/


      React.createElement("p", { id: "display" }, this.state.display), /*#__PURE__*/
      React.createElement("div", { className: "volume-slider" }, /*#__PURE__*/
      React.createElement("input", {
        max: "1",
        min: "0",
        step: "0.01",
        type: "range",
        onChange: this.volumeControl,
        value: this.state.sliderVal })), /*#__PURE__*/


      React.createElement("div", { className: "control" }, /*#__PURE__*/
      React.createElement("p", null, "Bank"), /*#__PURE__*/
      React.createElement("div", { className: "select", onClick: this.selectBank }, /*#__PURE__*/
      React.createElement("div", { className: "inner", style: bankStyle }))))));





  }}

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("root"));