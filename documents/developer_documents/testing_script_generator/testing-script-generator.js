// Instructions for generating new testing document:
// Make any changes in the data.json file
// Navigate to documents>developer_documents>testing-script-generator folder on the command line
// Run node testing-script-generator.js to generate new Testing Document file
// by default, this will create tests for the features with included=true in their features.json
// -l is the option to list the ids you would like to test
//  `node testing-script-generator.js -l e4 e5 e6` will create tests for e4, e5, e6 features from the table
// -j is the option to read the test ids from a .json file, default name is testFeatures.json
// `node testing-script-generator.js -j` will create tests for the ids listed in testFeatures.json
// `node testing-script-generator.js -j example.json` will create tests for the ids listed in example.json


var fs = require("fs");
var markdownpdf = require("markdown-pdf");
var moment = require("moment");

// Handle user CLI options
const options = process.argv.slice(2)
let toTest = undefined
if(options.length > 0){
    if(options[0] == '-l'){
        toTest = options.slice(1)
        console.log(toTest)
    } else if(options[0] == '-j'){
        const fileName = options[1] ? options[1] : 'testFeatures.json'
        toTest = JSON.parse(fs.readFileSync(fileName, 'utf-8'))
    }
}

// Imports JSON data from data.json
const JSONFileList = ['edgeFeatures.json', 'fileFeatures.json', 'layoutFeatures.json',
                'nodeFeatures.json', 'speciesFeatures.json', 'viewFeatures.json', 'viewportFeatures.json']
var grnsightOptions = JSONFileList.flatMap((fileName)=> JSON.parse(fs.readFileSync(fileName, 'utf8')) )
// var grnsightOptions = JSON.parse(fs.readFileSync('featureList.json', 'utf8'));

// Node class for representing each test
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

// Initially, arrayOfNodes only contains an empty node
var root = new Node();
var arrayOfNodes = [root];
var testDescription = "";
var availabilityDescription = "";

var addChildren = function (arrayOfNodes, optionKeys, test) {
    var newArrayOfNodes = [];
    // Loops through each node in arrayOfNodes
    arrayOfNodes.forEach(function(node) {
        if ( (!test.included && !toTest) || (toTest && !toTest.includes(test.id)) ) {
            // Skip this test by adding the original node itself to the newArrayOfNodes
            newArrayOfNodes.push(node);
        } else {
            optionKeys.forEach(function(option) {
                var instruction = test.title + " - " + option;
                var result = test.text + " " + test.options[option];
                result = test.conditional ? result + ", " + test.conditional : result;
                var newNode = new Node();
                // The null option is equivalent to disabling the test.
                if (option !== "NULL") {
                    // Adds the new instruction / result pair only
                    newNode.addInstruction(instruction);
                    newNode.addResult(result);
                }
                // The newNode inherits all of the parent's instruction / result pairs
                for (var i = 0; i < node.instructions.length; i++) {
                    newNode.addInstruction(node.instructions[i]);
                    newNode.addResult(node.results[i]);
                }
                newArrayOfNodes.push(newNode);
            });
        }
    });
    return newArrayOfNodes;
}

// Performs the combinatorics for each GRNsight option.
for (var i = grnsightOptions.length - 1; i >=0; i--) {
    var test = grnsightOptions[i];
    var optionKeys = Object.keys(test.options);
    arrayOfNodes = addChildren(arrayOfNodes, optionKeys, test);
}

// Formats the table to display all the GRNsight options, user interactions, and results.
grnsightOptions.forEach(function(test) {
    var optionKeys = Object.keys(test.options);
    var entry = "|" + test.title + "|";
    var status = (test.included && !toTest || toTest && toTest.includes(test.id)) ? "YES" : "NO";
    var entry = "|" + test.id +"|"+ status + " | " + test.title + "|";
    var noGraphLoadedAvailability = test.availability['NoGraphLoaded'] ? "YES": "NO";
    var weightedGraphLoadedAvailability = test.availability['WeightedGraphLoaded'] ? "YES": "NO";
    var unweightedGraphLoadedAvailability = test.availability['UnWeightedGraphLoaded'] ? "YES": "NO";
    var availability = `| ${noGraphLoadedAvailability} | ${weightedGraphLoadedAvailability} | ${unweightedGraphLoadedAvailability} | `
    optionKeys.forEach(function(option) {
        var result = test.text + " " + test.options[option];
        result = test.conditional ? result + ", " +  test.conditional : result;
        testDescription += entry + option +  " | " + result + "|\n";
        availabilityDescription += `| ${test.title} - ${option} ${availability}\n`
    });
});

// Generates the markdown document, combining the table with the test listing
var formatMarkdown = function (arrayOfNodes) {
    var md = "## GRNsight Client Side Testing Overview";
    md += "\nLast Updated: " + moment().format("YYYY-MM-DD");
    md += "\n\n";
    md += "| ID | Included in Testing Protocol  | GRNsight Option |  User Action | Result | \n"
    md += "| ---- |  --------------- | ------ | ------- | ------ | \n"
    md += testDescription;
    md += formatFunctionAvailabilityTable();
    md += "\n## Client Side Tests\n";
    for (var i = 0; i < arrayOfNodes.length; i++) {
        md += "### Test " + (i + 1) + "\n";
        md += arrayOfNodes[i].print() + "\n";
    }
    return md;
}

var formatFunctionAvailabilityTable = function() {
    var md = "\n## GRNsight Function Availability Table";
    md += "\n\n";
    md += "| GRNsight Function | No Graph Loaded | Weighted Graph Loaded | Unweighted Graph Loaded  | \n";
    md += "|  ---------------- | --------------- | ----------------------- | ---------------------- | \n";
    md += availabilityDescription;
    return md;
}

var markdownDocument = formatMarkdown(arrayOfNodes);
// var functionAvailability = formatFunctionAvailabilityTable();

// Writes over the GRNsightTestingDocument.md file
fs.writeFile('GRNsightTestingDocument.md', markdownDocument, function (err) {
  if (err) return console.log(err);
});

// Generates the GRNsight Function Availability Markdown file
// fs.writeFile("GRNsightFunctionAvailability.md", functionAvailability, function (err) {
//     if (err) return console.log(err);
// })

markdownpdf().from("GRNsightTestingDocument.md").to("GRNsightTestingDocument.pdf", function () {
  console.log("Created GRNsightTestingDocument.pdf");
})

// markdownpdf().from("GRNsightFunctionAvailability.md").to("GRNsightFunctionAvailability.pdf", function () {
//   console.log("Created GRNsightFunctionAvailability.pdf");
// })

console.log("\nGRNsightTestingDocument.md has been successfully regenerated, and includes " + arrayOfNodes.length + " tests.");
console.log("Update the wiki by copy/pasting Markdown code to: https://github.com/dondi/GRNsight/wiki/Client-Side-Testing-Document\n")
