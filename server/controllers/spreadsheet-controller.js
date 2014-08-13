var multiparty = require('multiparty'),
    xlsx = require('node-xlsx'),
    util = require('util'),
    path = require('path');

    processGRNmap = function (path, res, app) {
      var sheet,
          currentSheet,
          network = {
            genes: [],
            links: [],
            errors: [],
            positiveWeights: [],
            negativeWeights: []
          },
          currentLink,
          currentGene;

      try {
        sheet = xlsx.parse(path);
      } catch (err) {
        return res.json(400, "Unable to read input. The file may be corrupt.");
      }

      // For the time being, send the result in a form readable by people
      //TODO: Optimize the result for D3
      res.header('Access-Control-Allow-Origin', app.get('corsOrigin'));
      //Look for the worksheet containing the network data
      for (var i = 0; i < sheet.worksheets.length; i++) {
        if (sheet.worksheets[i].name == "network") {
          //Here we have found a sheet containing simple data. We keep looking
          //in case there is also a sheet with optimized weights
          currentSheet = sheet.worksheets[i];
        } else if (sheet.worksheets[i].name == "network_optimized_weights") {
          //We found a sheet with optimized weights, which is the ideal data source.
          //So we stop looking.
          currentSheet = sheet.worksheets[i];
          break;
        }
      }

      if(currentSheet === undefined) {
        return res.json(400, "This file does not have a 'network' sheet or a 'network_optimized_weights' sheet. Please select another" + 
          " file, or rename the sheet containing the adjacency matrix accordingly. Please refer to the " + 
          "<a href='http://dondi.github.io/GRNsight/documentation.html#section1' target='_blank'>Documentation page</a> for more information.");
      }
      
      for (var j = 1; j < currentSheet.data.length; j++) {
        try {
          currentGene = {name: currentSheet.data[0][j].value}
          if(currentSheet.data[0][j].value.length > 12 ) {
            return res.json(400, "Gene names must be at most 12 characters in length. The gene " + currentSheet.data[0][j].value + 
              " is greater than 12 characters. Please edit the name and resubmit your sheet.");
          }
          network.genes.push(currentGene);
        } catch (err) {
          network.errors.push(err.message);
        }
        for(var k = 1; k < currentSheet.data[j].length; k++) {
          try {
            if (currentSheet.data[j][k].value != 0) {
              currentLink = {source: k - 1, target: j - 1, value: currentSheet.data[j][k].value};
              if (currentLink.value > 0) {
                currentLink.type = "arrowhead";
                currentLink.stroke = "MediumVioletRed";
                network.positiveWeights.push(currentLink.value);
              } else {
                currentLink.type = "repressor";
                currentLink.stroke = "DarkTurquoise";
                network.negativeWeights.push(currentLink.value);
              }
              network.links.push(currentLink);
            }
          } catch (err) {
            network.errors.push(err.message);
          }
        }
      }
      return res.json(network);
    };

module.exports = function (app) {
  //parse the incoming form data, then parse the spreadsheet. Finally, send back json.
  app.post('/upload', function (req, res) {
    //TODO: Add file validation
    (new multiparty.Form()).parse(req, function (err, fields, files) {
      if (err) {
        return res.json(400, "There was a problem uploading your file. Please try again.");
      }

      try {
        var input = files.file[0].path;
      } catch (err) {
        return res.json(400, "No upload file selected.");
      }

      if (path.extname(input) !== ".xlsx") {
        return res.json(400, "Invalid input file. Please select an Excel Workbook (*.xlsx) file." +
          "<br><br>Note that Excel 97-2003 Workbook (*.xls) files are not able to be read by GRNsight.");
      }

      return processGRNmap(input, res, app);
    });
  });

  app.get('/demo/unweighted', function (req, res) {
    return processGRNmap("test/dahlquist_wt-data_21-gene-sample-input_20140122.xlsx", res, app);
  });

  app.get('/demo/weighted', function (req, res) {
    return processGRNmap("test/dahlquist_wt-data_21-gene-_sample-output_20140122_est_out_1.xlsx", res, app);
  });
}