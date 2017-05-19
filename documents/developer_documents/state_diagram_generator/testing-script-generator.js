// node testing-script-generator.js

var grnsightOptions = [
    {
        "title": "Hide/Show Edge Weights",
        "text": "The edge weight should",
        "options": {
            "Show With Mouse Over": "display when user mouses over an edge.",
            "Always Show Edge Weights": "always be visible.",
            "Never Show Edge Weights": "not be displayed."
        }

    },
    {
        "title": "Viewport Size",
        "text": "The viewport size should",
        "options": {
            "Detected": "be automatically detected and set to small, medium, or large, based on the browser window.",
            "Small": "be set to small, unless this was the size automatically detected.",
            "Medium": "be set to medium, unless this was the size automatically detected.",
            "Large": "be set to large, unless this was the size automatically detected"
        }
    },
    {
        "title" : "Restrict Graph to Viewport",
        "text": "The bounding box should",
        "options" : {
            "Checked": "always be within the viewport.",
            "Unchecked": "be allowed to be past the viewport"
        }
    },
    {
        "title": "Lock Force Graph Parameters",
        "text": "The sliders should",
        "options": {
            "Checked": "be disabled",
            "Unchecked": "be enabled"
        }
    }
    ,
    {
        "title": "Sliders",
        "text": "The graph",
        "options": {
            "Link Distance Increase": "edges should visibly decrease in length",
            "Link Distance Decrease": "edges should visibly increase in length",
            "Charge Increase": "nodes should visibly increase attraction with each other",
            "Charge Decrease": "nodes should visibly decrease attraction with each other",
            "Charge Distance Increase" : "nodes should visibly increase charge distance",
            "Charge Distance Decrease" : "nodes should visibly decrease charge distance",
            "Gravity Increase": "response to gravity should increase",
            "Gravity Decrease": "response to gravity should decrease"
        },
        "conditional": "if Lock Force Graph Parameters is unchecked."
    }

    ,
    // {
    //     "title" : "Reset",
    //     "text": "The slider's values should",
    //     "options": {
    //         "clicked": "",
    //         "not clicked": ""
    //     },
    //     "conditional": ""
    // },
    // {
    //     "title": "Undo Reset",
    //     "text": "The slider's values should",
    //     "options": {
    //         "clicked": "",
    //         "not clicked": ""
    //     },
    //     "conditional": ""
    // },
    // {
    //     "title": "Drawing Board Controls",
    //     "text": "The graph should",
    //     "options": {
    //
    //     },
    //     "conditional": ""
    // }
]

class Node {
    constructor (instructions, results) {
        this.instructions = instructions || [];
        this.results = results || [];
    }
    addResult (result) {
        this.results.push(result);
    }
    addInstruction(instruction) {
        this.instructions.push(instruction);
    }
    print() {
        var string = "";
        string += "Instructions:\n";
        this.instructions.forEach(function(instruction) {
            string += "- " + instruction + "\n";
        });
        string += "\nResults:\n";
        this.results.forEach(function (result) {
            string += "- " + result + "\n";
        });
        return string;
    }
}
var root = new Node();
var arrayOfNodes = [root];

var addChildren = function (arrayOfNodes, optionKeys, test) {
    var newArrayOfNodes = [];
    arrayOfNodes.forEach(function(node) {
        var parentInstructions = node.instructions;
        var parentResults = node.results;
        optionKeys.forEach(function(option) {
            var instruction = test.title + "-" + option;
            var result = test.text + " " + test.options[option];
            result = test.conditional ? result + " " +  test.conditional : result;
            var newNode = new Node();
            newNode.addInstruction(instruction);
            newNode.addResult(result);
            for (var i = 0; i < node.instructions.length; i++) {
                newNode.addInstruction(parentInstructions[i]);
                newNode.addResult(parentResults[i]);
            }
            newArrayOfNodes.push(newNode);
        });
    });
    return newArrayOfNodes;
}

grnsightOptions.forEach(function(test) {
    var optionKeys = Object.keys(test.options);
    arrayOfNodes = addChildren(arrayOfNodes, optionKeys, test);

});

// console.log(arrayOfNodes);
// console.log(arrayOfNodes.length);

var formatMarkdown = function (arrayOfNodes) {
    var md = "";
    for (var i = 0; i < arrayOfNodes.length; i++) {
        md += "## Test " + (i + 1) + "\n";
        md += arrayOfNodes[i].print() + "\n";
    }
    return md;
}

var markdownDocument = formatMarkdown(arrayOfNodes);

fs = require('fs');
fs.writeFile('GRNsightTestingDocument.md', markdownDocument, function (err) {
  if (err) return console.log(err);
});
