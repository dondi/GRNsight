
var grnsightOptions = {
    "Hide/Show Edge Weights": {
        "text": "The edge weight should ",
        "options": [
            {"Show With Mouse Over": "display when user mouses over an edge."},
            {"Always Show Edge Weights": "always be visible."},
            {"Never Show Edge Weights": "not be displayed."}
        ]
    },
    "Viewport Size": {
        "text": "The viewport size should ",
        "options": [
            {"Detected": "be automatically detected and set to an optimal size."},
            {"Small": "be set to small, unless this was the size automatically detected."},
            {"Medium": "be set to medium, unless this was the size automatically detected."},
            {"Large": "be set to large, unless this was the size automatically detected"}
        ]
    },
    "Restrict Graph to Viewport": {
        "text": "The bounding box should ",
        "options" : [
            {"Checked": "always be within the viewport."},
            {"Unchecked": "be allowed to be past the viewport"}
        ]
    },
    "Lock Force Graph Parameters": {
        "text": "The sliders should ",
        "options": [
            {"Checked": "be disabled"},
            {"Unchecked": "be enabled"}
        ]
    },
    "Sliders": {
        "text": "The graph",
        "options": [
            {"Link Distance Increase": "'s edges should visibly decrease in length"},
            {"Link Distance Decrease": "'s edges should visibly increase in length"},
            {"Charge Increase": "'s nodes should visibly increase attraction with each other"},
            {"Charge Decrease": "'s nodes should visibly increase attraction with each other"},
            {"Charge Distance Increase" : "'s nodes should visibly increase charge distance"},
            {"Charge Distance Decrease" : "'s nodes should visibly decrease charge distance"},
            {"Gravity Increase": "'s response to gravity should increase"},
            {"Gravity Decrease": "'s response to gravity should decrease"}
        ]
        "conditional": "if Lock Force Graph Parameters is unchecked."
    },
    "Reset": {
        "text": "The slider's values should",
        "options": [
            {"clicked": ""},
            {"not clicked": ""}
        ],
        "conditional": ""
    },
    "Undo Reset": {
        "text": "The slider's values should",
        "options": [
            {"clicked": ""},
            {"not clicked": ""}
        ],
        "conditional": ""
    },
    "Drawing Board Controls": {
        "text": "The graph should",
        "options": [

        ],
        "conditional": ""
    }
}

var treeBuilder = function (grnsightOptions) {
    // var options = Object.keys(grnsightOptions);
    for (option in grnsightOptions) {
        console.log(Object.values(option));
    }
}

treeBuilder(grnsightOptions);
