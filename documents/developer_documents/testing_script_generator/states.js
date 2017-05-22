// node states.js

var INTERACTIONS = {
  "LOAD_GRAPH": ["WEIGHTED", "UNWEIGHTED"],
  "TOGGLE_FORCE_GRAPH_PARAMETERS": ["LOCK", "UNLOCK"],
  "SLIDERS": ["MOVE", "RESET", "UNDO_RESET"],
  "SET_WEIGHTS": ["ALWAYS", "NEVER", "MOUSEOVER"],
  "SET_VIEWPORT_RESTRICTION": ["CHECKED", "UNCHECKED"],
  "SET_VIEWPORT": ["SMALL", "MEDIUM", "LARGE", "FIT_TO_WINDOW"]
};

var STATES = {
  "STATE": ["START", "WEIGHTED_NETWORK_LOADED", "UNWEIGHTED_NETWORK_LOADED"],
  "NETWORK" : ["LOADED", "NOT_LOADED"],
  "SLIDERS": ["ACTIVE", "INACTIVE"],
  "RESET" : ["ACTIVE", "INACTIVE"],
  "UNDO_RESET": ["ACTIVE", "INACTIVE"],
  "SLIDER_VALUES": ["DEFAULT", "MANUAL"],
  "RELOAD_AND_PRINT": ["ENABLED", "DISABLED"],
  "VIEWPORT_SIZE": ["DETECTED", "SMALL", "MEDIUM", "LARGE", "FIT_TO_WINDOW"],
  "VIEWPORT_OPTION": ["RESTRICTED", "NOT_RESTRICTED"],
  "WEIGHTS": ["VISIBLE_ALWAYS", "VISIBLE_NEVER", "VISIBLE_ON_MOUSEOVER", "MENU_INACTIVE"]
};

class Node {
  constructor() {
    this.state = STATES.STATE[0];
    this.network = STATES.NETWORK[1];
    this.sliders = STATES.SLIDERS[0];
    this.reset = STATES.RESET[0];
    this.undoReset = STATES.UNDO_RESET[1];
    this.sliderValues = STATES.SLIDER_VALUES[0];
    this.reloadAndPrint = STATES.RELOAD_AND_PRINT[1];
    this.viewportSize = STATES.VIEWPORT_SIZE[0];
    this.viewportOption = STATES.VIEWPORT_OPTION[1];
    this.weights = STATES.WEIGHTS[3];
    this.interactionLog = [];
    console.log(JSON.stringify(this) + "\n");
  };

  loadGraph(type) {
    if (type === "weighted") {
      this.state = STATES.STATE[1];
      this.network = STATES.NETWORK[0]
    } else if (type === "unweighted") {
      this.state = STATES.STATE[2];
      this.network = STATES.NETWORK[0]
    } else {
      return;
    }
    this.interactionLog.push("Load " + type + " graph.");
    console.log(JSON.stringify(this) + "\n");
  }

  toggleForceGraphParameters() {

  }

  setForceGraphParams() {

  }

  setWeights() {

  }

  sliders() {

  }

  setViewportRestriction(){

  }

  setViewport() {

  }

}

var nodeA = new Node();
nodeA.loadGraph("weighted");
