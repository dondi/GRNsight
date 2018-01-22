## GRNsight Client Side Testing Overview
Last Updated: 2018-01-17

| Included in Testing Protocol  | GRNsight Option |  User Action | Result | 
| --------------- | ------ | ------- | ------ | 
|YES | Load Graph|None | GRNsight should have no graph in the viewport|
|YES | Load Graph|File Menu -> Open | GRNsight should lay out a network graph from the Excel workbook if there are no errors in the file|
|YES | Load Graph|File Menu -> Import SIF | GRNsight should lay out a network graph from the SIF file if there are no errors in the file|
|YES | Load Graph|File Menu -> Import GraphML | GRNsight should lay out a network graph from the GraphML file if there are no errors in the file|
|YES | Load Graph|Demo Menu -> Demo #1 | GRNsight should lay out an unweighted network graph from Demo #1|
|YES | Load Graph|Demo Menu -> Demo #2 | GRNsight should lay out a weighted network graph from Demo #2|
|YES | Load Graph|Demo Menu -> Demo #3 | GRNsight should lay out an unweighted network graph from Demo #3|
|YES | Load Graph|Demo Menu -> Demo #4 | GRNsight should lay out a weighted network graph from Demo #4|
|NO | File Menu -> Reload|Select | The graph should center, zoom to 100%, and reapply the force graph parameters|
|NO | File Menu -> Export Data|Select "To Unweighted SIF" | GRNsight should export an unweighted SIF file from the graph currently loaded|
|NO | File Menu -> Export Data|Select "To Weighted SIF" | GRNsight should export a weighted SIF file from the graph currently loaded|
|NO | File Menu -> Export Data|Select "To Unweighted GraphML" | GRNsight should export an unweighted GraphML file from the graph currently loaded|
|NO | File Menu -> Export Data|Select "To Weighted GraphML" | GRNsight should export a weighted GraphML file from the graph currently loaded|
|NO | File Menu -> Print|Select | GRNsight should open the Print Dialogue Box|
|NO | Edit Menu -> Preferences|Select "Format edges based on optimized weight parameters" | GRNsight should format edges based on optimized weight parameters|
|NO | Edit Menu -> Preferences|Select "Default to black edges with regular arrowheads" | GRNsight should default to black edges with regular arrowheads|
|YES | Format Menu|Check "Lock Force Graph Parameters" | The Force Graph Parameter sliders should be disabled.|
|YES | Format Menu|Uncheck "Lock Force Graph Parameters" | The Force Graph Parameter sliders should be enabled.|
|NO | Format Menu|Select "Reset Force Graph Parameters" |  revert to the default values, if Lock Force Graph Parameters is unchecked|
|NO | Format Menu|Click "Undo Reset" | The Force Graph Parameter sliders should return to the values they had before the Undo Reset button (or menu item) was selected, if the Undo Reset button is enabled.|
|YES | Format Menu|Select "Show With Mouse Over" | The edge weight should display when user mouses over an edge.|
|YES | Format Menu|Select "Always Show Edge Weights" | The edge weight should always be visible.|
|YES | Format Menu|Select "Never Show Edge Weights" | The edge weight should not be displayed.|
|NO | Help Menu|Select "Getting Started" | GRNsight should open the GRNsight documentation page|
|NO | Help Menu|Select "GRNsight Wiki" | GRNsight should open the GRNsight wiki page|
|NO | Help Menu|Select "About GRNsight" | GRNsight should open the About GRNsight page|
|NO | Force Graph Parameter Sliders|Keep at Default Values |  The graph should be laid out according to the default values of the force graph parameter sliders|
|NO | Force Graph Parameter Sliders|Decrease Link Distance |  The graph's edges should visibly decrease in length if Lock Force Graph Parameters is unchecked|
|NO | Force Graph Parameter Sliders|Increase Link Distance |  The graph's edges should visibly increase in length if Lock Force Graph Parameters is unchecked|
|NO | Force Graph Parameter Sliders|Increase Charge |  The graph's nodes should visibly increase attraction to each other if Lock Force Graph Parameters is unchecked|
|NO | Force Graph Parameter Sliders|Decrease Charge |  The graph's nodes should visibly decrease attraction to each other if Lock Force Graph Parameters is unchecked|
|NO | Lock Force Graph Parameters CheckBox|Check | The Force Graph Parameter sliders should be disabled.|
|NO | Lock Force Graph Parameters CheckBox|Uncheck | The Force Graph Parameter sliders should be enabled.|
|NO | Reset Force Graph Parameters Button|Click | The Force Graph Parameter sliders should revert to the default values, if Lock Force Graph Parameters is unchecked.|
|NO | Undo Reset Button|Click | The Force Graph Parameter sliders should return to the values they had before the Undo Reset button (or menu item) was selected, if the Undo Reset button is enabled.|
|NO | Restrict Graph to Viewport|Check | The graph bounding box should always be contained within the viewport.|
|NO | Restrict Graph to Viewport|Uncheck | The graph bounding box should be allowed to extend past the viewport|
|NO | Viewport Size|Keep as Detected |  Upon loading or reloading the GRNsight webpage, the viewport size should be automatically detected and set to small, medium, or large, based on the size of the browser window.|
|NO | Viewport Size|Select "Small" |  The viewport size should be set to small|
|NO | Viewport Size|Select "Medium" |  The viewport size should be set to medium|
|NO | Viewport Size|Select "Large" |  The viewport size should be set to large|
|NO | Viewport Size|Select "Fit to Window" |  The viewport size should automatically be set to the size of the browser window|
|NO | Hide/Show Edge Weights|Select "Show With Mouse Over" |  A single edge weight should display when user mouses over a single edge.|
|NO | Hide/Show Edge Weights|Select "Always Show Edge Weights" |  All edge weights should always be visible.|
|NO | Hide/Show Edge Weights|Select "Never Show Edge Weights" |  No edge weights should be visible.|
|NO | Set Normalization Factor|Enter a Number in the Box and Click "Set Normalization Factor" button | The graph should reload with the new normalization factor applied to its edge weight thicknesses|
|NO | Reset Normalization Parameters Button|Click | The graph should reset to its default normalization factor and reload the graph|
|NO | Gray Threshold Slider|Change the Grey Threshold Value | The graph should reload, with edges that fall below the threshold value colored gray|
|NO | D-Pad Control|Click Right Arrow | The graph should shift to the left if "Restrict Graph to Viewport" is Unchecked.|
|NO | D-Pad Control|Click Left Arrow | The graph should shift to the right if "Restrict Graph to Viewport" is Unchecked.|
|NO | D-Pad Control|Click Up Arrow | The graph should shift down if "Restrict Graph to Viewport" is Unchecked.|
|NO | D-Pad Control|Click Down Arrow | The graph should shift up if "Restrict Graph to Viewport" is Unchecked.|
|NO | D-Pad Control|Click Center Button | The graph should move to the center of the bounding box (note that it is not the same thing as the viewport if "Restrict Graph to Viewport" is Unchecked.|
|NO | Zoom Slider|Increase Zoom Level | The graph should zoom in (get larger)|
|NO | Zoom Slider|Decrease Zoom Level | The graph should zoom out (get smaller)|

## GRNsight Function Availability Table

| GRNsight Function | No Graph Loaded | Weighted Graph Loaded | Unweighted Graph Loaded  | 
|  ---------------- | --------------- | ----------------------- | ---------------------- | 
| Load Graph - None | YES | YES | YES | 
| Load Graph - File Menu -> Open | YES | YES | YES | 
| Load Graph - File Menu -> Import SIF | YES | YES | YES | 
| Load Graph - File Menu -> Import GraphML | YES | YES | YES | 
| Load Graph - Demo Menu -> Demo #1 | YES | YES | YES | 
| Load Graph - Demo Menu -> Demo #2 | YES | YES | YES | 
| Load Graph - Demo Menu -> Demo #3 | YES | YES | YES | 
| Load Graph - Demo Menu -> Demo #4 | YES | YES | YES | 
| File Menu -> Reload - Select | NO | YES | YES | 
| File Menu -> Export Data - Select "To Unweighted SIF" | NO | YES | YES | 
| File Menu -> Export Data - Select "To Weighted SIF" | NO | YES | YES | 
| File Menu -> Export Data - Select "To Unweighted GraphML" | NO | YES | YES | 
| File Menu -> Export Data - Select "To Weighted GraphML" | NO | YES | YES | 
| File Menu -> Print - Select | NO | YES | YES | 
| Edit Menu -> Preferences - Select "Format edges based on optimized weight parameters" | YES | YES | YES | 
| Edit Menu -> Preferences - Select "Default to black edges with regular arrowheads" | YES | YES | YES | 
| Format Menu - Check "Lock Force Graph Parameters" | YES | YES | YES | 
| Format Menu - Uncheck "Lock Force Graph Parameters" | YES | YES | YES | 
| Format Menu - Select "Reset Force Graph Parameters" | YES | YES | YES | 
| Format Menu - Click "Undo Reset" | YES | YES | YES | 
| Format Menu - Select "Show With Mouse Over" | YES | YES | YES | 
| Format Menu - Select "Always Show Edge Weights" | YES | YES | YES | 
| Format Menu - Select "Never Show Edge Weights" | YES | YES | YES | 
| Help Menu - Select "Getting Started" | YES | YES | YES | 
| Help Menu - Select "GRNsight Wiki" | YES | YES | YES | 
| Help Menu - Select "About GRNsight" | YES | YES | YES | 
| Force Graph Parameter Sliders - Keep at Default Values | YES | YES | YES | 
| Force Graph Parameter Sliders - Decrease Link Distance | YES | YES | YES | 
| Force Graph Parameter Sliders - Increase Link Distance | YES | YES | YES | 
| Force Graph Parameter Sliders - Increase Charge | YES | YES | YES | 
| Force Graph Parameter Sliders - Decrease Charge | YES | YES | YES | 
| Lock Force Graph Parameters CheckBox - Check | YES | YES | YES | 
| Lock Force Graph Parameters CheckBox - Uncheck | YES | YES | YES | 
| Reset Force Graph Parameters Button - Click | YES | YES | YES | 
| Undo Reset Button - Click | YES | YES | YES | 
| Restrict Graph to Viewport - Check | YES | YES | YES | 
| Restrict Graph to Viewport - Uncheck | YES | YES | YES | 
| Viewport Size - Keep as Detected | YES | YES | YES | 
| Viewport Size - Select "Small" | YES | YES | YES | 
| Viewport Size - Select "Medium" | YES | YES | YES | 
| Viewport Size - Select "Large" | YES | YES | YES | 
| Viewport Size - Select "Fit to Window" | YES | YES | YES | 
| Hide/Show Edge Weights - Select "Show With Mouse Over" | NO | YES | NO | 
| Hide/Show Edge Weights - Select "Always Show Edge Weights" | NO | YES | NO | 
| Hide/Show Edge Weights - Select "Never Show Edge Weights" | NO | YES | NO | 
| Set Normalization Factor - Enter a Number in the Box and Click "Set Normalization Factor" button | NO | YES | NO | 
| Reset Normalization Parameters Button - Click | NO | YES | NO | 
| Gray Threshold Slider - Change the Grey Threshold Value | NO | YES | NO | 
| D-Pad Control - Click Right Arrow | NO | YES | YES | 
| D-Pad Control - Click Left Arrow | NO | YES | YES | 
| D-Pad Control - Click Up Arrow | NO | YES | YES | 
| D-Pad Control - Click Down Arrow | NO | YES | YES | 
| D-Pad Control - Click Center Button | NO | YES | YES | 
| Zoom Slider - Increase Zoom Level | NO | YES | YES | 
| Zoom Slider - Decrease Zoom Level | NO | YES | YES | 

## Client Side Tests
### Test 1
Instructions:
- Load Graph - None
- Format Menu - Check "Lock Force Graph Parameters"
- Format Menu - Select "Show With Mouse Over"

Results:
- GRNsight should have no graph in the viewport
- The Force Graph Parameter sliders should be disabled.
- The edge weight should display when user mouses over an edge.

### Test 2
Instructions:
- Load Graph - File Menu -> Open
- Format Menu - Check "Lock Force Graph Parameters"
- Format Menu - Select "Show With Mouse Over"

Results:
- GRNsight should lay out a network graph from the Excel workbook if there are no errors in the file
- The Force Graph Parameter sliders should be disabled.
- The edge weight should display when user mouses over an edge.

### Test 3
Instructions:
- Load Graph - File Menu -> Import SIF
- Format Menu - Check "Lock Force Graph Parameters"
- Format Menu - Select "Show With Mouse Over"

Results:
- GRNsight should lay out a network graph from the SIF file if there are no errors in the file
- The Force Graph Parameter sliders should be disabled.
- The edge weight should display when user mouses over an edge.

### Test 4
Instructions:
- Load Graph - File Menu -> Import GraphML
- Format Menu - Check "Lock Force Graph Parameters"
- Format Menu - Select "Show With Mouse Over"

Results:
- GRNsight should lay out a network graph from the GraphML file if there are no errors in the file
- The Force Graph Parameter sliders should be disabled.
- The edge weight should display when user mouses over an edge.

### Test 5
Instructions:
- Load Graph - Demo Menu -> Demo #1
- Format Menu - Check "Lock Force Graph Parameters"
- Format Menu - Select "Show With Mouse Over"

Results:
- GRNsight should lay out an unweighted network graph from Demo #1
- The Force Graph Parameter sliders should be disabled.
- The edge weight should display when user mouses over an edge.

### Test 6
Instructions:
- Load Graph - Demo Menu -> Demo #2
- Format Menu - Check "Lock Force Graph Parameters"
- Format Menu - Select "Show With Mouse Over"

Results:
- GRNsight should lay out a weighted network graph from Demo #2
- The Force Graph Parameter sliders should be disabled.
- The edge weight should display when user mouses over an edge.

### Test 7
Instructions:
- Load Graph - Demo Menu -> Demo #3
- Format Menu - Check "Lock Force Graph Parameters"
- Format Menu - Select "Show With Mouse Over"

Results:
- GRNsight should lay out an unweighted network graph from Demo #3
- The Force Graph Parameter sliders should be disabled.
- The edge weight should display when user mouses over an edge.

### Test 8
Instructions:
- Load Graph - Demo Menu -> Demo #4
- Format Menu - Check "Lock Force Graph Parameters"
- Format Menu - Select "Show With Mouse Over"

Results:
- GRNsight should lay out a weighted network graph from Demo #4
- The Force Graph Parameter sliders should be disabled.
- The edge weight should display when user mouses over an edge.

### Test 9
Instructions:
- Load Graph - None
- Format Menu - Uncheck "Lock Force Graph Parameters"
- Format Menu - Select "Show With Mouse Over"

Results:
- GRNsight should have no graph in the viewport
- The Force Graph Parameter sliders should be enabled.
- The edge weight should display when user mouses over an edge.

### Test 10
Instructions:
- Load Graph - File Menu -> Open
- Format Menu - Uncheck "Lock Force Graph Parameters"
- Format Menu - Select "Show With Mouse Over"

Results:
- GRNsight should lay out a network graph from the Excel workbook if there are no errors in the file
- The Force Graph Parameter sliders should be enabled.
- The edge weight should display when user mouses over an edge.

### Test 11
Instructions:
- Load Graph - File Menu -> Import SIF
- Format Menu - Uncheck "Lock Force Graph Parameters"
- Format Menu - Select "Show With Mouse Over"

Results:
- GRNsight should lay out a network graph from the SIF file if there are no errors in the file
- The Force Graph Parameter sliders should be enabled.
- The edge weight should display when user mouses over an edge.

### Test 12
Instructions:
- Load Graph - File Menu -> Import GraphML
- Format Menu - Uncheck "Lock Force Graph Parameters"
- Format Menu - Select "Show With Mouse Over"

Results:
- GRNsight should lay out a network graph from the GraphML file if there are no errors in the file
- The Force Graph Parameter sliders should be enabled.
- The edge weight should display when user mouses over an edge.

### Test 13
Instructions:
- Load Graph - Demo Menu -> Demo #1
- Format Menu - Uncheck "Lock Force Graph Parameters"
- Format Menu - Select "Show With Mouse Over"

Results:
- GRNsight should lay out an unweighted network graph from Demo #1
- The Force Graph Parameter sliders should be enabled.
- The edge weight should display when user mouses over an edge.

### Test 14
Instructions:
- Load Graph - Demo Menu -> Demo #2
- Format Menu - Uncheck "Lock Force Graph Parameters"
- Format Menu - Select "Show With Mouse Over"

Results:
- GRNsight should lay out a weighted network graph from Demo #2
- The Force Graph Parameter sliders should be enabled.
- The edge weight should display when user mouses over an edge.

### Test 15
Instructions:
- Load Graph - Demo Menu -> Demo #3
- Format Menu - Uncheck "Lock Force Graph Parameters"
- Format Menu - Select "Show With Mouse Over"

Results:
- GRNsight should lay out an unweighted network graph from Demo #3
- The Force Graph Parameter sliders should be enabled.
- The edge weight should display when user mouses over an edge.

### Test 16
Instructions:
- Load Graph - Demo Menu -> Demo #4
- Format Menu - Uncheck "Lock Force Graph Parameters"
- Format Menu - Select "Show With Mouse Over"

Results:
- GRNsight should lay out a weighted network graph from Demo #4
- The Force Graph Parameter sliders should be enabled.
- The edge weight should display when user mouses over an edge.

### Test 17
Instructions:
- Load Graph - None
- Format Menu - Check "Lock Force Graph Parameters"
- Format Menu - Select "Always Show Edge Weights"

Results:
- GRNsight should have no graph in the viewport
- The Force Graph Parameter sliders should be disabled.
- The edge weight should always be visible.

### Test 18
Instructions:
- Load Graph - File Menu -> Open
- Format Menu - Check "Lock Force Graph Parameters"
- Format Menu - Select "Always Show Edge Weights"

Results:
- GRNsight should lay out a network graph from the Excel workbook if there are no errors in the file
- The Force Graph Parameter sliders should be disabled.
- The edge weight should always be visible.

### Test 19
Instructions:
- Load Graph - File Menu -> Import SIF
- Format Menu - Check "Lock Force Graph Parameters"
- Format Menu - Select "Always Show Edge Weights"

Results:
- GRNsight should lay out a network graph from the SIF file if there are no errors in the file
- The Force Graph Parameter sliders should be disabled.
- The edge weight should always be visible.

### Test 20
Instructions:
- Load Graph - File Menu -> Import GraphML
- Format Menu - Check "Lock Force Graph Parameters"
- Format Menu - Select "Always Show Edge Weights"

Results:
- GRNsight should lay out a network graph from the GraphML file if there are no errors in the file
- The Force Graph Parameter sliders should be disabled.
- The edge weight should always be visible.

### Test 21
Instructions:
- Load Graph - Demo Menu -> Demo #1
- Format Menu - Check "Lock Force Graph Parameters"
- Format Menu - Select "Always Show Edge Weights"

Results:
- GRNsight should lay out an unweighted network graph from Demo #1
- The Force Graph Parameter sliders should be disabled.
- The edge weight should always be visible.

### Test 22
Instructions:
- Load Graph - Demo Menu -> Demo #2
- Format Menu - Check "Lock Force Graph Parameters"
- Format Menu - Select "Always Show Edge Weights"

Results:
- GRNsight should lay out a weighted network graph from Demo #2
- The Force Graph Parameter sliders should be disabled.
- The edge weight should always be visible.

### Test 23
Instructions:
- Load Graph - Demo Menu -> Demo #3
- Format Menu - Check "Lock Force Graph Parameters"
- Format Menu - Select "Always Show Edge Weights"

Results:
- GRNsight should lay out an unweighted network graph from Demo #3
- The Force Graph Parameter sliders should be disabled.
- The edge weight should always be visible.

### Test 24
Instructions:
- Load Graph - Demo Menu -> Demo #4
- Format Menu - Check "Lock Force Graph Parameters"
- Format Menu - Select "Always Show Edge Weights"

Results:
- GRNsight should lay out a weighted network graph from Demo #4
- The Force Graph Parameter sliders should be disabled.
- The edge weight should always be visible.

### Test 25
Instructions:
- Load Graph - None
- Format Menu - Uncheck "Lock Force Graph Parameters"
- Format Menu - Select "Always Show Edge Weights"

Results:
- GRNsight should have no graph in the viewport
- The Force Graph Parameter sliders should be enabled.
- The edge weight should always be visible.

### Test 26
Instructions:
- Load Graph - File Menu -> Open
- Format Menu - Uncheck "Lock Force Graph Parameters"
- Format Menu - Select "Always Show Edge Weights"

Results:
- GRNsight should lay out a network graph from the Excel workbook if there are no errors in the file
- The Force Graph Parameter sliders should be enabled.
- The edge weight should always be visible.

### Test 27
Instructions:
- Load Graph - File Menu -> Import SIF
- Format Menu - Uncheck "Lock Force Graph Parameters"
- Format Menu - Select "Always Show Edge Weights"

Results:
- GRNsight should lay out a network graph from the SIF file if there are no errors in the file
- The Force Graph Parameter sliders should be enabled.
- The edge weight should always be visible.

### Test 28
Instructions:
- Load Graph - File Menu -> Import GraphML
- Format Menu - Uncheck "Lock Force Graph Parameters"
- Format Menu - Select "Always Show Edge Weights"

Results:
- GRNsight should lay out a network graph from the GraphML file if there are no errors in the file
- The Force Graph Parameter sliders should be enabled.
- The edge weight should always be visible.

### Test 29
Instructions:
- Load Graph - Demo Menu -> Demo #1
- Format Menu - Uncheck "Lock Force Graph Parameters"
- Format Menu - Select "Always Show Edge Weights"

Results:
- GRNsight should lay out an unweighted network graph from Demo #1
- The Force Graph Parameter sliders should be enabled.
- The edge weight should always be visible.

### Test 30
Instructions:
- Load Graph - Demo Menu -> Demo #2
- Format Menu - Uncheck "Lock Force Graph Parameters"
- Format Menu - Select "Always Show Edge Weights"

Results:
- GRNsight should lay out a weighted network graph from Demo #2
- The Force Graph Parameter sliders should be enabled.
- The edge weight should always be visible.

### Test 31
Instructions:
- Load Graph - Demo Menu -> Demo #3
- Format Menu - Uncheck "Lock Force Graph Parameters"
- Format Menu - Select "Always Show Edge Weights"

Results:
- GRNsight should lay out an unweighted network graph from Demo #3
- The Force Graph Parameter sliders should be enabled.
- The edge weight should always be visible.

### Test 32
Instructions:
- Load Graph - Demo Menu -> Demo #4
- Format Menu - Uncheck "Lock Force Graph Parameters"
- Format Menu - Select "Always Show Edge Weights"

Results:
- GRNsight should lay out a weighted network graph from Demo #4
- The Force Graph Parameter sliders should be enabled.
- The edge weight should always be visible.

### Test 33
Instructions:
- Load Graph - None
- Format Menu - Check "Lock Force Graph Parameters"
- Format Menu - Select "Never Show Edge Weights"

Results:
- GRNsight should have no graph in the viewport
- The Force Graph Parameter sliders should be disabled.
- The edge weight should not be displayed.

### Test 34
Instructions:
- Load Graph - File Menu -> Open
- Format Menu - Check "Lock Force Graph Parameters"
- Format Menu - Select "Never Show Edge Weights"

Results:
- GRNsight should lay out a network graph from the Excel workbook if there are no errors in the file
- The Force Graph Parameter sliders should be disabled.
- The edge weight should not be displayed.

### Test 35
Instructions:
- Load Graph - File Menu -> Import SIF
- Format Menu - Check "Lock Force Graph Parameters"
- Format Menu - Select "Never Show Edge Weights"

Results:
- GRNsight should lay out a network graph from the SIF file if there are no errors in the file
- The Force Graph Parameter sliders should be disabled.
- The edge weight should not be displayed.

### Test 36
Instructions:
- Load Graph - File Menu -> Import GraphML
- Format Menu - Check "Lock Force Graph Parameters"
- Format Menu - Select "Never Show Edge Weights"

Results:
- GRNsight should lay out a network graph from the GraphML file if there are no errors in the file
- The Force Graph Parameter sliders should be disabled.
- The edge weight should not be displayed.

### Test 37
Instructions:
- Load Graph - Demo Menu -> Demo #1
- Format Menu - Check "Lock Force Graph Parameters"
- Format Menu - Select "Never Show Edge Weights"

Results:
- GRNsight should lay out an unweighted network graph from Demo #1
- The Force Graph Parameter sliders should be disabled.
- The edge weight should not be displayed.

### Test 38
Instructions:
- Load Graph - Demo Menu -> Demo #2
- Format Menu - Check "Lock Force Graph Parameters"
- Format Menu - Select "Never Show Edge Weights"

Results:
- GRNsight should lay out a weighted network graph from Demo #2
- The Force Graph Parameter sliders should be disabled.
- The edge weight should not be displayed.

### Test 39
Instructions:
- Load Graph - Demo Menu -> Demo #3
- Format Menu - Check "Lock Force Graph Parameters"
- Format Menu - Select "Never Show Edge Weights"

Results:
- GRNsight should lay out an unweighted network graph from Demo #3
- The Force Graph Parameter sliders should be disabled.
- The edge weight should not be displayed.

### Test 40
Instructions:
- Load Graph - Demo Menu -> Demo #4
- Format Menu - Check "Lock Force Graph Parameters"
- Format Menu - Select "Never Show Edge Weights"

Results:
- GRNsight should lay out a weighted network graph from Demo #4
- The Force Graph Parameter sliders should be disabled.
- The edge weight should not be displayed.

### Test 41
Instructions:
- Load Graph - None
- Format Menu - Uncheck "Lock Force Graph Parameters"
- Format Menu - Select "Never Show Edge Weights"

Results:
- GRNsight should have no graph in the viewport
- The Force Graph Parameter sliders should be enabled.
- The edge weight should not be displayed.

### Test 42
Instructions:
- Load Graph - File Menu -> Open
- Format Menu - Uncheck "Lock Force Graph Parameters"
- Format Menu - Select "Never Show Edge Weights"

Results:
- GRNsight should lay out a network graph from the Excel workbook if there are no errors in the file
- The Force Graph Parameter sliders should be enabled.
- The edge weight should not be displayed.

### Test 43
Instructions:
- Load Graph - File Menu -> Import SIF
- Format Menu - Uncheck "Lock Force Graph Parameters"
- Format Menu - Select "Never Show Edge Weights"

Results:
- GRNsight should lay out a network graph from the SIF file if there are no errors in the file
- The Force Graph Parameter sliders should be enabled.
- The edge weight should not be displayed.

### Test 44
Instructions:
- Load Graph - File Menu -> Import GraphML
- Format Menu - Uncheck "Lock Force Graph Parameters"
- Format Menu - Select "Never Show Edge Weights"

Results:
- GRNsight should lay out a network graph from the GraphML file if there are no errors in the file
- The Force Graph Parameter sliders should be enabled.
- The edge weight should not be displayed.

### Test 45
Instructions:
- Load Graph - Demo Menu -> Demo #1
- Format Menu - Uncheck "Lock Force Graph Parameters"
- Format Menu - Select "Never Show Edge Weights"

Results:
- GRNsight should lay out an unweighted network graph from Demo #1
- The Force Graph Parameter sliders should be enabled.
- The edge weight should not be displayed.

### Test 46
Instructions:
- Load Graph - Demo Menu -> Demo #2
- Format Menu - Uncheck "Lock Force Graph Parameters"
- Format Menu - Select "Never Show Edge Weights"

Results:
- GRNsight should lay out a weighted network graph from Demo #2
- The Force Graph Parameter sliders should be enabled.
- The edge weight should not be displayed.

### Test 47
Instructions:
- Load Graph - Demo Menu -> Demo #3
- Format Menu - Uncheck "Lock Force Graph Parameters"
- Format Menu - Select "Never Show Edge Weights"

Results:
- GRNsight should lay out an unweighted network graph from Demo #3
- The Force Graph Parameter sliders should be enabled.
- The edge weight should not be displayed.

### Test 48
Instructions:
- Load Graph - Demo Menu -> Demo #4
- Format Menu - Uncheck "Lock Force Graph Parameters"
- Format Menu - Select "Never Show Edge Weights"

Results:
- GRNsight should lay out a weighted network graph from Demo #4
- The Force Graph Parameter sliders should be enabled.
- The edge weight should not be displayed.

