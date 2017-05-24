// Instructions for generating new testing document:
// Make any changes in the data.json file
// Navigate to documents>developer_documents>testing-script-generator folder on the command line
// Run node testing-script-generator.js to generate new Testing Document file

fs = require('fs');
var grnsightOptions = JSON.parse(fs.readFileSync('data.json', 'utf8'));

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
            var instruction = test.title + " - " + option;
            var result = test.text + " " + test.options[option];
            result = test.conditional ? result + " " +  test.conditional : result;
            var newNode = new Node();
            if (option !== "NULL") {
                newNode.addInstruction(instruction);
                newNode.addResult(result);
            }
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

console.log("\nGRNsightTestingDocument.md has been successfully regenerated, and includes " + arrayOfNodes.length + " tests.");
console.log("Update the wiki by copy/pasting Markdown code to: https://github.com/dondi/GRNsight/wiki/Client-Side-Testing-Document\n")
