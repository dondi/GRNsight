## GRNsight Client Side Testing Overview
Last Updated: 2018-04-20

| Included in Testing Protocol  | GRNsight Option |  User Action | Result | 
| --------------- | ------ | ------- | ------ | 
|NO | Load Graph|None | GRNsight should have no graph in the viewport|
|NO | Load Graph|File Menu -> Open | GRNsight should lay out a network graph from the Excel workbook if there are no errors in the file|
|NO | Load Graph|File Menu -> Import SIF | GRNsight should lay out a network graph from the SIF file if there are no errors in the file|
|NO | Load Graph|File Menu -> Import GraphML | GRNsight should lay out a network graph from the GraphML file if there are no errors in the file|
|NO | Load Graph|Demo Menu -> Demo #1 | GRNsight should lay out an unweighted network graph from Demo #1|
|NO | Load Graph|Demo Menu -> Demo #2 | GRNsight should lay out a weighted network graph from Demo #2|
|NO | Load Graph|Demo Menu -> Demo #3 | GRNsight should lay out an unweighted network graph from Demo #3|
|NO | Load Graph|Demo Menu -> Demo #4 | GRNsight should lay out a weighted network graph from Demo #4|
|NO | File Menu -> Reload|Select | The graph should center, zoom to 100%, and reapply the force graph parameters|
|NO | File Menu -> Export Data|Select "To Unweighted SIF" | GRNsight should export an unweighted SIF file from the graph currently loaded|
|NO | File Menu -> Export Data|Select "To Weighted SIF" | GRNsight should export a weighted SIF file from the graph currently loaded|
|NO | File Menu -> Export Data|Select "To Unweighted GraphML" | GRNsight should export an unweighted GraphML file from the graph currently loaded|
|NO | File Menu -> Export Data|Select "To Weighted GraphML" | GRNsight should export a weighted GraphML file from the graph currently loaded|
|NO | File Menu -> Print|Select | GRNsight should open the Print Dialogue Box|
|NO | Edit Menu -> Preferences|Select "Format edges based on optimized weight parameters" | GRNsight should format edges based on optimized weight parameters|
|NO | Edit Menu -> Preferences|Select "Default to black edges with regular arrowheads" | GRNsight should default to black edges with regular arrowheads|
|NO | Format Menu|Check "Lock Force Graph Parameters" | The Force Graph Parameter sliders should be disabled.|
|NO | Format Menu|Uncheck "Lock Force Graph Parameters" | The Force Graph Parameter sliders should be enabled.|
|NO | Format Menu|Select "Reset Force Graph Parameters" |  revert to the default values, if Lock Force Graph Parameters is unchecked|
|NO | Format Menu|Click "Undo Reset" | The Force Graph Parameter sliders should return to the values they had before the Undo Reset button (or menu item) was selected, if the Undo Reset button is enabled.|
|NO | Format Menu|Select "Show With Mouse Over" | The edge weight should display when user mouses over an edge.|
|NO | Format Menu|Select "Always Show Edge Weights" | The edge weight should always be visible.|
|NO | Format Menu|Select "Never Show Edge Weights" | The edge weight should not be displayed.|
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
|NO | D-Pad Control|Click Right Arrow | The graph should shift to the left, if "Restrict Graph to Viewport" is Unchecked.|
|NO | D-Pad Control|Click Left Arrow | The graph should shift to the right, if "Restrict Graph to Viewport" is Unchecked.|
|NO | D-Pad Control|Click Up Arrow | The graph should shift down, if "Restrict Graph to Viewport" is Unchecked.|
|NO | D-Pad Control|Click Down Arrow | The graph should shift up, if "Restrict Graph to Viewport" is Unchecked.|
|NO | D-Pad Control|Click Center Button | The graph should move to the center of the bounding box (note that it is not the same thing as the viewport, if "Restrict Graph to Viewport" is Unchecked.|
|NO | Zoom Slider|Increase Zoom Level | The graph should zoom in (get larger)|
|NO | Zoom Slider|Decrease Zoom Level | The graph should zoom out (get smaller)|
|YES | Node Coloring Menu - Top Dataset|Keep Default Selection | The top half of each node should be colored using data from the first expression dataset detected in the input workbook, if expression data sheets are present in input workbook|
|YES | Node Coloring Menu - Top Dataset|Select Top Dataset from Dropdown List | The top half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook|
|YES | Node Coloring Menu - Bottom Dataset|Keep Default Selection | The bottom half of each node should be colored using data from the same dataset as the top dataset, if expression data sheets are present in input workbook|
|YES | Node Coloring Menu - Bottom Dataset|Select Bottom Dataset from Dropdown List | The bottom half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook|
|YES | Node Coloring Menu - Log Fold Change Max Value|Keep Default Value | The node coloring visualization's color intensity should default to having a Log Fold Change Max Value of 3, if expression data sheets are present in input workbook|
|YES | Node Coloring Menu - Log Fold Change Max Value|Increase Log Fold Change Max Value | The node coloring visualization's color intensity should decrease, if expression data sheets are present in input workbook|
|YES | Node Coloring Menu - Log Fold Change Max Value|Decrease Log Fold Change Max Value | The node coloring visualization's color intensity should increase, if expression data sheets are present in input workbook|
|YES | Node Coloring Menu - Average Replicates Values (Top Dataset)|Check | GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook|
|YES | Node Coloring Menu - Average Replicates Values (Top Dataset)|Uncheck | GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook|
|YES | Node Coloring Menu - Average Replicates Values (Bottom Dataset)|Check | GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook|
|YES | Node Coloring Menu - Average Replicates Values (Bottom Dataset)|Uncheck | GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook|
|YES | Node Coloring Menu - Disable Node Coloring Button Toggle|Disable Node Coloring | GRNsight should not color nodes with expression data, if expression data sheets are present in input workbook|
|YES | Node Coloring Menu - Disable Node Coloring Button Toggle|Enable Node Coloring | GRNsight should color nodes with expression data, if expression data sheets are present in input workbook|

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
| Node Coloring Menu - Top Dataset - Keep Default Selection | NO | YES | YES | 
| Node Coloring Menu - Top Dataset - Select Top Dataset from Dropdown List | NO | YES | YES | 
| Node Coloring Menu - Bottom Dataset - Keep Default Selection | NO | YES | YES | 
| Node Coloring Menu - Bottom Dataset - Select Bottom Dataset from Dropdown List | NO | YES | YES | 
| Node Coloring Menu - Log Fold Change Max Value - Keep Default Value | NO | YES | YES | 
| Node Coloring Menu - Log Fold Change Max Value - Increase Log Fold Change Max Value | NO | YES | YES | 
| Node Coloring Menu - Log Fold Change Max Value - Decrease Log Fold Change Max Value | NO | YES | YES | 
| Node Coloring Menu - Average Replicates Values (Top Dataset) - Check | NO | YES | YES | 
| Node Coloring Menu - Average Replicates Values (Top Dataset) - Uncheck | NO | YES | YES | 
| Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Check | NO | YES | YES | 
| Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Uncheck | NO | YES | YES | 
| Node Coloring Menu - Disable Node Coloring Button Toggle - Disable Node Coloring | NO | YES | YES | 
| Node Coloring Menu - Disable Node Coloring Button Toggle - Enable Node Coloring | NO | YES | YES | 

## Client Side Tests
### Test 1
Instructions:
- Node Coloring Menu - Top Dataset - Keep Default Selection
- Node Coloring Menu - Bottom Dataset - Keep Default Selection
- Node Coloring Menu - Log Fold Change Max Value - Keep Default Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Check
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Check
- Node Coloring Menu - Disable Node Coloring Button Toggle - Disable Node Coloring

Results:
- The top half of each node should be colored using data from the first expression dataset detected in the input workbook, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the same dataset as the top dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should default to having a Log Fold Change Max Value of 3, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not color nodes with expression data, if expression data sheets are present in input workbook

### Test 2
Instructions:
- Node Coloring Menu - Top Dataset - Select Top Dataset from Dropdown List
- Node Coloring Menu - Bottom Dataset - Keep Default Selection
- Node Coloring Menu - Log Fold Change Max Value - Keep Default Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Check
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Check
- Node Coloring Menu - Disable Node Coloring Button Toggle - Disable Node Coloring

Results:
- The top half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the same dataset as the top dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should default to having a Log Fold Change Max Value of 3, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not color nodes with expression data, if expression data sheets are present in input workbook

### Test 3
Instructions:
- Node Coloring Menu - Top Dataset - Keep Default Selection
- Node Coloring Menu - Bottom Dataset - Select Bottom Dataset from Dropdown List
- Node Coloring Menu - Log Fold Change Max Value - Keep Default Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Check
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Check
- Node Coloring Menu - Disable Node Coloring Button Toggle - Disable Node Coloring

Results:
- The top half of each node should be colored using data from the first expression dataset detected in the input workbook, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should default to having a Log Fold Change Max Value of 3, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not color nodes with expression data, if expression data sheets are present in input workbook

### Test 4
Instructions:
- Node Coloring Menu - Top Dataset - Select Top Dataset from Dropdown List
- Node Coloring Menu - Bottom Dataset - Select Bottom Dataset from Dropdown List
- Node Coloring Menu - Log Fold Change Max Value - Keep Default Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Check
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Check
- Node Coloring Menu - Disable Node Coloring Button Toggle - Disable Node Coloring

Results:
- The top half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should default to having a Log Fold Change Max Value of 3, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not color nodes with expression data, if expression data sheets are present in input workbook

### Test 5
Instructions:
- Node Coloring Menu - Top Dataset - Keep Default Selection
- Node Coloring Menu - Bottom Dataset - Keep Default Selection
- Node Coloring Menu - Log Fold Change Max Value - Increase Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Check
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Check
- Node Coloring Menu - Disable Node Coloring Button Toggle - Disable Node Coloring

Results:
- The top half of each node should be colored using data from the first expression dataset detected in the input workbook, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the same dataset as the top dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should decrease, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not color nodes with expression data, if expression data sheets are present in input workbook

### Test 6
Instructions:
- Node Coloring Menu - Top Dataset - Select Top Dataset from Dropdown List
- Node Coloring Menu - Bottom Dataset - Keep Default Selection
- Node Coloring Menu - Log Fold Change Max Value - Increase Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Check
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Check
- Node Coloring Menu - Disable Node Coloring Button Toggle - Disable Node Coloring

Results:
- The top half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the same dataset as the top dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should decrease, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not color nodes with expression data, if expression data sheets are present in input workbook

### Test 7
Instructions:
- Node Coloring Menu - Top Dataset - Keep Default Selection
- Node Coloring Menu - Bottom Dataset - Select Bottom Dataset from Dropdown List
- Node Coloring Menu - Log Fold Change Max Value - Increase Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Check
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Check
- Node Coloring Menu - Disable Node Coloring Button Toggle - Disable Node Coloring

Results:
- The top half of each node should be colored using data from the first expression dataset detected in the input workbook, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should decrease, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not color nodes with expression data, if expression data sheets are present in input workbook

### Test 8
Instructions:
- Node Coloring Menu - Top Dataset - Select Top Dataset from Dropdown List
- Node Coloring Menu - Bottom Dataset - Select Bottom Dataset from Dropdown List
- Node Coloring Menu - Log Fold Change Max Value - Increase Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Check
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Check
- Node Coloring Menu - Disable Node Coloring Button Toggle - Disable Node Coloring

Results:
- The top half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should decrease, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not color nodes with expression data, if expression data sheets are present in input workbook

### Test 9
Instructions:
- Node Coloring Menu - Top Dataset - Keep Default Selection
- Node Coloring Menu - Bottom Dataset - Keep Default Selection
- Node Coloring Menu - Log Fold Change Max Value - Decrease Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Check
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Check
- Node Coloring Menu - Disable Node Coloring Button Toggle - Disable Node Coloring

Results:
- The top half of each node should be colored using data from the first expression dataset detected in the input workbook, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the same dataset as the top dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should increase, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not color nodes with expression data, if expression data sheets are present in input workbook

### Test 10
Instructions:
- Node Coloring Menu - Top Dataset - Select Top Dataset from Dropdown List
- Node Coloring Menu - Bottom Dataset - Keep Default Selection
- Node Coloring Menu - Log Fold Change Max Value - Decrease Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Check
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Check
- Node Coloring Menu - Disable Node Coloring Button Toggle - Disable Node Coloring

Results:
- The top half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the same dataset as the top dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should increase, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not color nodes with expression data, if expression data sheets are present in input workbook

### Test 11
Instructions:
- Node Coloring Menu - Top Dataset - Keep Default Selection
- Node Coloring Menu - Bottom Dataset - Select Bottom Dataset from Dropdown List
- Node Coloring Menu - Log Fold Change Max Value - Decrease Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Check
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Check
- Node Coloring Menu - Disable Node Coloring Button Toggle - Disable Node Coloring

Results:
- The top half of each node should be colored using data from the first expression dataset detected in the input workbook, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should increase, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not color nodes with expression data, if expression data sheets are present in input workbook

### Test 12
Instructions:
- Node Coloring Menu - Top Dataset - Select Top Dataset from Dropdown List
- Node Coloring Menu - Bottom Dataset - Select Bottom Dataset from Dropdown List
- Node Coloring Menu - Log Fold Change Max Value - Decrease Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Check
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Check
- Node Coloring Menu - Disable Node Coloring Button Toggle - Disable Node Coloring

Results:
- The top half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should increase, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not color nodes with expression data, if expression data sheets are present in input workbook

### Test 13
Instructions:
- Node Coloring Menu - Top Dataset - Keep Default Selection
- Node Coloring Menu - Bottom Dataset - Keep Default Selection
- Node Coloring Menu - Log Fold Change Max Value - Keep Default Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Uncheck
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Check
- Node Coloring Menu - Disable Node Coloring Button Toggle - Disable Node Coloring

Results:
- The top half of each node should be colored using data from the first expression dataset detected in the input workbook, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the same dataset as the top dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should default to having a Log Fold Change Max Value of 3, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not color nodes with expression data, if expression data sheets are present in input workbook

### Test 14
Instructions:
- Node Coloring Menu - Top Dataset - Select Top Dataset from Dropdown List
- Node Coloring Menu - Bottom Dataset - Keep Default Selection
- Node Coloring Menu - Log Fold Change Max Value - Keep Default Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Uncheck
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Check
- Node Coloring Menu - Disable Node Coloring Button Toggle - Disable Node Coloring

Results:
- The top half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the same dataset as the top dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should default to having a Log Fold Change Max Value of 3, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not color nodes with expression data, if expression data sheets are present in input workbook

### Test 15
Instructions:
- Node Coloring Menu - Top Dataset - Keep Default Selection
- Node Coloring Menu - Bottom Dataset - Select Bottom Dataset from Dropdown List
- Node Coloring Menu - Log Fold Change Max Value - Keep Default Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Uncheck
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Check
- Node Coloring Menu - Disable Node Coloring Button Toggle - Disable Node Coloring

Results:
- The top half of each node should be colored using data from the first expression dataset detected in the input workbook, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should default to having a Log Fold Change Max Value of 3, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not color nodes with expression data, if expression data sheets are present in input workbook

### Test 16
Instructions:
- Node Coloring Menu - Top Dataset - Select Top Dataset from Dropdown List
- Node Coloring Menu - Bottom Dataset - Select Bottom Dataset from Dropdown List
- Node Coloring Menu - Log Fold Change Max Value - Keep Default Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Uncheck
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Check
- Node Coloring Menu - Disable Node Coloring Button Toggle - Disable Node Coloring

Results:
- The top half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should default to having a Log Fold Change Max Value of 3, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not color nodes with expression data, if expression data sheets are present in input workbook

### Test 17
Instructions:
- Node Coloring Menu - Top Dataset - Keep Default Selection
- Node Coloring Menu - Bottom Dataset - Keep Default Selection
- Node Coloring Menu - Log Fold Change Max Value - Increase Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Uncheck
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Check
- Node Coloring Menu - Disable Node Coloring Button Toggle - Disable Node Coloring

Results:
- The top half of each node should be colored using data from the first expression dataset detected in the input workbook, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the same dataset as the top dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should decrease, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not color nodes with expression data, if expression data sheets are present in input workbook

### Test 18
Instructions:
- Node Coloring Menu - Top Dataset - Select Top Dataset from Dropdown List
- Node Coloring Menu - Bottom Dataset - Keep Default Selection
- Node Coloring Menu - Log Fold Change Max Value - Increase Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Uncheck
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Check
- Node Coloring Menu - Disable Node Coloring Button Toggle - Disable Node Coloring

Results:
- The top half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the same dataset as the top dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should decrease, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not color nodes with expression data, if expression data sheets are present in input workbook

### Test 19
Instructions:
- Node Coloring Menu - Top Dataset - Keep Default Selection
- Node Coloring Menu - Bottom Dataset - Select Bottom Dataset from Dropdown List
- Node Coloring Menu - Log Fold Change Max Value - Increase Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Uncheck
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Check
- Node Coloring Menu - Disable Node Coloring Button Toggle - Disable Node Coloring

Results:
- The top half of each node should be colored using data from the first expression dataset detected in the input workbook, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should decrease, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not color nodes with expression data, if expression data sheets are present in input workbook

### Test 20
Instructions:
- Node Coloring Menu - Top Dataset - Select Top Dataset from Dropdown List
- Node Coloring Menu - Bottom Dataset - Select Bottom Dataset from Dropdown List
- Node Coloring Menu - Log Fold Change Max Value - Increase Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Uncheck
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Check
- Node Coloring Menu - Disable Node Coloring Button Toggle - Disable Node Coloring

Results:
- The top half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should decrease, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not color nodes with expression data, if expression data sheets are present in input workbook

### Test 21
Instructions:
- Node Coloring Menu - Top Dataset - Keep Default Selection
- Node Coloring Menu - Bottom Dataset - Keep Default Selection
- Node Coloring Menu - Log Fold Change Max Value - Decrease Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Uncheck
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Check
- Node Coloring Menu - Disable Node Coloring Button Toggle - Disable Node Coloring

Results:
- The top half of each node should be colored using data from the first expression dataset detected in the input workbook, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the same dataset as the top dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should increase, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not color nodes with expression data, if expression data sheets are present in input workbook

### Test 22
Instructions:
- Node Coloring Menu - Top Dataset - Select Top Dataset from Dropdown List
- Node Coloring Menu - Bottom Dataset - Keep Default Selection
- Node Coloring Menu - Log Fold Change Max Value - Decrease Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Uncheck
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Check
- Node Coloring Menu - Disable Node Coloring Button Toggle - Disable Node Coloring

Results:
- The top half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the same dataset as the top dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should increase, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not color nodes with expression data, if expression data sheets are present in input workbook

### Test 23
Instructions:
- Node Coloring Menu - Top Dataset - Keep Default Selection
- Node Coloring Menu - Bottom Dataset - Select Bottom Dataset from Dropdown List
- Node Coloring Menu - Log Fold Change Max Value - Decrease Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Uncheck
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Check
- Node Coloring Menu - Disable Node Coloring Button Toggle - Disable Node Coloring

Results:
- The top half of each node should be colored using data from the first expression dataset detected in the input workbook, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should increase, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not color nodes with expression data, if expression data sheets are present in input workbook

### Test 24
Instructions:
- Node Coloring Menu - Top Dataset - Select Top Dataset from Dropdown List
- Node Coloring Menu - Bottom Dataset - Select Bottom Dataset from Dropdown List
- Node Coloring Menu - Log Fold Change Max Value - Decrease Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Uncheck
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Check
- Node Coloring Menu - Disable Node Coloring Button Toggle - Disable Node Coloring

Results:
- The top half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should increase, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not color nodes with expression data, if expression data sheets are present in input workbook

### Test 25
Instructions:
- Node Coloring Menu - Top Dataset - Keep Default Selection
- Node Coloring Menu - Bottom Dataset - Keep Default Selection
- Node Coloring Menu - Log Fold Change Max Value - Keep Default Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Check
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Uncheck
- Node Coloring Menu - Disable Node Coloring Button Toggle - Disable Node Coloring

Results:
- The top half of each node should be colored using data from the first expression dataset detected in the input workbook, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the same dataset as the top dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should default to having a Log Fold Change Max Value of 3, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not color nodes with expression data, if expression data sheets are present in input workbook

### Test 26
Instructions:
- Node Coloring Menu - Top Dataset - Select Top Dataset from Dropdown List
- Node Coloring Menu - Bottom Dataset - Keep Default Selection
- Node Coloring Menu - Log Fold Change Max Value - Keep Default Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Check
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Uncheck
- Node Coloring Menu - Disable Node Coloring Button Toggle - Disable Node Coloring

Results:
- The top half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the same dataset as the top dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should default to having a Log Fold Change Max Value of 3, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not color nodes with expression data, if expression data sheets are present in input workbook

### Test 27
Instructions:
- Node Coloring Menu - Top Dataset - Keep Default Selection
- Node Coloring Menu - Bottom Dataset - Select Bottom Dataset from Dropdown List
- Node Coloring Menu - Log Fold Change Max Value - Keep Default Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Check
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Uncheck
- Node Coloring Menu - Disable Node Coloring Button Toggle - Disable Node Coloring

Results:
- The top half of each node should be colored using data from the first expression dataset detected in the input workbook, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should default to having a Log Fold Change Max Value of 3, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not color nodes with expression data, if expression data sheets are present in input workbook

### Test 28
Instructions:
- Node Coloring Menu - Top Dataset - Select Top Dataset from Dropdown List
- Node Coloring Menu - Bottom Dataset - Select Bottom Dataset from Dropdown List
- Node Coloring Menu - Log Fold Change Max Value - Keep Default Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Check
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Uncheck
- Node Coloring Menu - Disable Node Coloring Button Toggle - Disable Node Coloring

Results:
- The top half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should default to having a Log Fold Change Max Value of 3, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not color nodes with expression data, if expression data sheets are present in input workbook

### Test 29
Instructions:
- Node Coloring Menu - Top Dataset - Keep Default Selection
- Node Coloring Menu - Bottom Dataset - Keep Default Selection
- Node Coloring Menu - Log Fold Change Max Value - Increase Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Check
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Uncheck
- Node Coloring Menu - Disable Node Coloring Button Toggle - Disable Node Coloring

Results:
- The top half of each node should be colored using data from the first expression dataset detected in the input workbook, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the same dataset as the top dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should decrease, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not color nodes with expression data, if expression data sheets are present in input workbook

### Test 30
Instructions:
- Node Coloring Menu - Top Dataset - Select Top Dataset from Dropdown List
- Node Coloring Menu - Bottom Dataset - Keep Default Selection
- Node Coloring Menu - Log Fold Change Max Value - Increase Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Check
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Uncheck
- Node Coloring Menu - Disable Node Coloring Button Toggle - Disable Node Coloring

Results:
- The top half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the same dataset as the top dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should decrease, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not color nodes with expression data, if expression data sheets are present in input workbook

### Test 31
Instructions:
- Node Coloring Menu - Top Dataset - Keep Default Selection
- Node Coloring Menu - Bottom Dataset - Select Bottom Dataset from Dropdown List
- Node Coloring Menu - Log Fold Change Max Value - Increase Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Check
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Uncheck
- Node Coloring Menu - Disable Node Coloring Button Toggle - Disable Node Coloring

Results:
- The top half of each node should be colored using data from the first expression dataset detected in the input workbook, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should decrease, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not color nodes with expression data, if expression data sheets are present in input workbook

### Test 32
Instructions:
- Node Coloring Menu - Top Dataset - Select Top Dataset from Dropdown List
- Node Coloring Menu - Bottom Dataset - Select Bottom Dataset from Dropdown List
- Node Coloring Menu - Log Fold Change Max Value - Increase Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Check
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Uncheck
- Node Coloring Menu - Disable Node Coloring Button Toggle - Disable Node Coloring

Results:
- The top half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should decrease, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not color nodes with expression data, if expression data sheets are present in input workbook

### Test 33
Instructions:
- Node Coloring Menu - Top Dataset - Keep Default Selection
- Node Coloring Menu - Bottom Dataset - Keep Default Selection
- Node Coloring Menu - Log Fold Change Max Value - Decrease Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Check
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Uncheck
- Node Coloring Menu - Disable Node Coloring Button Toggle - Disable Node Coloring

Results:
- The top half of each node should be colored using data from the first expression dataset detected in the input workbook, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the same dataset as the top dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should increase, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not color nodes with expression data, if expression data sheets are present in input workbook

### Test 34
Instructions:
- Node Coloring Menu - Top Dataset - Select Top Dataset from Dropdown List
- Node Coloring Menu - Bottom Dataset - Keep Default Selection
- Node Coloring Menu - Log Fold Change Max Value - Decrease Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Check
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Uncheck
- Node Coloring Menu - Disable Node Coloring Button Toggle - Disable Node Coloring

Results:
- The top half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the same dataset as the top dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should increase, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not color nodes with expression data, if expression data sheets are present in input workbook

### Test 35
Instructions:
- Node Coloring Menu - Top Dataset - Keep Default Selection
- Node Coloring Menu - Bottom Dataset - Select Bottom Dataset from Dropdown List
- Node Coloring Menu - Log Fold Change Max Value - Decrease Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Check
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Uncheck
- Node Coloring Menu - Disable Node Coloring Button Toggle - Disable Node Coloring

Results:
- The top half of each node should be colored using data from the first expression dataset detected in the input workbook, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should increase, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not color nodes with expression data, if expression data sheets are present in input workbook

### Test 36
Instructions:
- Node Coloring Menu - Top Dataset - Select Top Dataset from Dropdown List
- Node Coloring Menu - Bottom Dataset - Select Bottom Dataset from Dropdown List
- Node Coloring Menu - Log Fold Change Max Value - Decrease Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Check
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Uncheck
- Node Coloring Menu - Disable Node Coloring Button Toggle - Disable Node Coloring

Results:
- The top half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should increase, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not color nodes with expression data, if expression data sheets are present in input workbook

### Test 37
Instructions:
- Node Coloring Menu - Top Dataset - Keep Default Selection
- Node Coloring Menu - Bottom Dataset - Keep Default Selection
- Node Coloring Menu - Log Fold Change Max Value - Keep Default Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Uncheck
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Uncheck
- Node Coloring Menu - Disable Node Coloring Button Toggle - Disable Node Coloring

Results:
- The top half of each node should be colored using data from the first expression dataset detected in the input workbook, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the same dataset as the top dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should default to having a Log Fold Change Max Value of 3, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not color nodes with expression data, if expression data sheets are present in input workbook

### Test 38
Instructions:
- Node Coloring Menu - Top Dataset - Select Top Dataset from Dropdown List
- Node Coloring Menu - Bottom Dataset - Keep Default Selection
- Node Coloring Menu - Log Fold Change Max Value - Keep Default Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Uncheck
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Uncheck
- Node Coloring Menu - Disable Node Coloring Button Toggle - Disable Node Coloring

Results:
- The top half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the same dataset as the top dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should default to having a Log Fold Change Max Value of 3, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not color nodes with expression data, if expression data sheets are present in input workbook

### Test 39
Instructions:
- Node Coloring Menu - Top Dataset - Keep Default Selection
- Node Coloring Menu - Bottom Dataset - Select Bottom Dataset from Dropdown List
- Node Coloring Menu - Log Fold Change Max Value - Keep Default Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Uncheck
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Uncheck
- Node Coloring Menu - Disable Node Coloring Button Toggle - Disable Node Coloring

Results:
- The top half of each node should be colored using data from the first expression dataset detected in the input workbook, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should default to having a Log Fold Change Max Value of 3, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not color nodes with expression data, if expression data sheets are present in input workbook

### Test 40
Instructions:
- Node Coloring Menu - Top Dataset - Select Top Dataset from Dropdown List
- Node Coloring Menu - Bottom Dataset - Select Bottom Dataset from Dropdown List
- Node Coloring Menu - Log Fold Change Max Value - Keep Default Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Uncheck
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Uncheck
- Node Coloring Menu - Disable Node Coloring Button Toggle - Disable Node Coloring

Results:
- The top half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should default to having a Log Fold Change Max Value of 3, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not color nodes with expression data, if expression data sheets are present in input workbook

### Test 41
Instructions:
- Node Coloring Menu - Top Dataset - Keep Default Selection
- Node Coloring Menu - Bottom Dataset - Keep Default Selection
- Node Coloring Menu - Log Fold Change Max Value - Increase Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Uncheck
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Uncheck
- Node Coloring Menu - Disable Node Coloring Button Toggle - Disable Node Coloring

Results:
- The top half of each node should be colored using data from the first expression dataset detected in the input workbook, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the same dataset as the top dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should decrease, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not color nodes with expression data, if expression data sheets are present in input workbook

### Test 42
Instructions:
- Node Coloring Menu - Top Dataset - Select Top Dataset from Dropdown List
- Node Coloring Menu - Bottom Dataset - Keep Default Selection
- Node Coloring Menu - Log Fold Change Max Value - Increase Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Uncheck
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Uncheck
- Node Coloring Menu - Disable Node Coloring Button Toggle - Disable Node Coloring

Results:
- The top half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the same dataset as the top dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should decrease, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not color nodes with expression data, if expression data sheets are present in input workbook

### Test 43
Instructions:
- Node Coloring Menu - Top Dataset - Keep Default Selection
- Node Coloring Menu - Bottom Dataset - Select Bottom Dataset from Dropdown List
- Node Coloring Menu - Log Fold Change Max Value - Increase Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Uncheck
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Uncheck
- Node Coloring Menu - Disable Node Coloring Button Toggle - Disable Node Coloring

Results:
- The top half of each node should be colored using data from the first expression dataset detected in the input workbook, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should decrease, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not color nodes with expression data, if expression data sheets are present in input workbook

### Test 44
Instructions:
- Node Coloring Menu - Top Dataset - Select Top Dataset from Dropdown List
- Node Coloring Menu - Bottom Dataset - Select Bottom Dataset from Dropdown List
- Node Coloring Menu - Log Fold Change Max Value - Increase Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Uncheck
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Uncheck
- Node Coloring Menu - Disable Node Coloring Button Toggle - Disable Node Coloring

Results:
- The top half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should decrease, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not color nodes with expression data, if expression data sheets are present in input workbook

### Test 45
Instructions:
- Node Coloring Menu - Top Dataset - Keep Default Selection
- Node Coloring Menu - Bottom Dataset - Keep Default Selection
- Node Coloring Menu - Log Fold Change Max Value - Decrease Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Uncheck
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Uncheck
- Node Coloring Menu - Disable Node Coloring Button Toggle - Disable Node Coloring

Results:
- The top half of each node should be colored using data from the first expression dataset detected in the input workbook, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the same dataset as the top dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should increase, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not color nodes with expression data, if expression data sheets are present in input workbook

### Test 46
Instructions:
- Node Coloring Menu - Top Dataset - Select Top Dataset from Dropdown List
- Node Coloring Menu - Bottom Dataset - Keep Default Selection
- Node Coloring Menu - Log Fold Change Max Value - Decrease Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Uncheck
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Uncheck
- Node Coloring Menu - Disable Node Coloring Button Toggle - Disable Node Coloring

Results:
- The top half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the same dataset as the top dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should increase, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not color nodes with expression data, if expression data sheets are present in input workbook

### Test 47
Instructions:
- Node Coloring Menu - Top Dataset - Keep Default Selection
- Node Coloring Menu - Bottom Dataset - Select Bottom Dataset from Dropdown List
- Node Coloring Menu - Log Fold Change Max Value - Decrease Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Uncheck
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Uncheck
- Node Coloring Menu - Disable Node Coloring Button Toggle - Disable Node Coloring

Results:
- The top half of each node should be colored using data from the first expression dataset detected in the input workbook, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should increase, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not color nodes with expression data, if expression data sheets are present in input workbook

### Test 48
Instructions:
- Node Coloring Menu - Top Dataset - Select Top Dataset from Dropdown List
- Node Coloring Menu - Bottom Dataset - Select Bottom Dataset from Dropdown List
- Node Coloring Menu - Log Fold Change Max Value - Decrease Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Uncheck
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Uncheck
- Node Coloring Menu - Disable Node Coloring Button Toggle - Disable Node Coloring

Results:
- The top half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should increase, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not color nodes with expression data, if expression data sheets are present in input workbook

### Test 49
Instructions:
- Node Coloring Menu - Top Dataset - Keep Default Selection
- Node Coloring Menu - Bottom Dataset - Keep Default Selection
- Node Coloring Menu - Log Fold Change Max Value - Keep Default Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Check
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Check
- Node Coloring Menu - Disable Node Coloring Button Toggle - Enable Node Coloring

Results:
- The top half of each node should be colored using data from the first expression dataset detected in the input workbook, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the same dataset as the top dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should default to having a Log Fold Change Max Value of 3, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should color nodes with expression data, if expression data sheets are present in input workbook

### Test 50
Instructions:
- Node Coloring Menu - Top Dataset - Select Top Dataset from Dropdown List
- Node Coloring Menu - Bottom Dataset - Keep Default Selection
- Node Coloring Menu - Log Fold Change Max Value - Keep Default Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Check
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Check
- Node Coloring Menu - Disable Node Coloring Button Toggle - Enable Node Coloring

Results:
- The top half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the same dataset as the top dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should default to having a Log Fold Change Max Value of 3, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should color nodes with expression data, if expression data sheets are present in input workbook

### Test 51
Instructions:
- Node Coloring Menu - Top Dataset - Keep Default Selection
- Node Coloring Menu - Bottom Dataset - Select Bottom Dataset from Dropdown List
- Node Coloring Menu - Log Fold Change Max Value - Keep Default Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Check
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Check
- Node Coloring Menu - Disable Node Coloring Button Toggle - Enable Node Coloring

Results:
- The top half of each node should be colored using data from the first expression dataset detected in the input workbook, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should default to having a Log Fold Change Max Value of 3, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should color nodes with expression data, if expression data sheets are present in input workbook

### Test 52
Instructions:
- Node Coloring Menu - Top Dataset - Select Top Dataset from Dropdown List
- Node Coloring Menu - Bottom Dataset - Select Bottom Dataset from Dropdown List
- Node Coloring Menu - Log Fold Change Max Value - Keep Default Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Check
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Check
- Node Coloring Menu - Disable Node Coloring Button Toggle - Enable Node Coloring

Results:
- The top half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should default to having a Log Fold Change Max Value of 3, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should color nodes with expression data, if expression data sheets are present in input workbook

### Test 53
Instructions:
- Node Coloring Menu - Top Dataset - Keep Default Selection
- Node Coloring Menu - Bottom Dataset - Keep Default Selection
- Node Coloring Menu - Log Fold Change Max Value - Increase Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Check
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Check
- Node Coloring Menu - Disable Node Coloring Button Toggle - Enable Node Coloring

Results:
- The top half of each node should be colored using data from the first expression dataset detected in the input workbook, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the same dataset as the top dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should decrease, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should color nodes with expression data, if expression data sheets are present in input workbook

### Test 54
Instructions:
- Node Coloring Menu - Top Dataset - Select Top Dataset from Dropdown List
- Node Coloring Menu - Bottom Dataset - Keep Default Selection
- Node Coloring Menu - Log Fold Change Max Value - Increase Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Check
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Check
- Node Coloring Menu - Disable Node Coloring Button Toggle - Enable Node Coloring

Results:
- The top half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the same dataset as the top dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should decrease, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should color nodes with expression data, if expression data sheets are present in input workbook

### Test 55
Instructions:
- Node Coloring Menu - Top Dataset - Keep Default Selection
- Node Coloring Menu - Bottom Dataset - Select Bottom Dataset from Dropdown List
- Node Coloring Menu - Log Fold Change Max Value - Increase Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Check
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Check
- Node Coloring Menu - Disable Node Coloring Button Toggle - Enable Node Coloring

Results:
- The top half of each node should be colored using data from the first expression dataset detected in the input workbook, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should decrease, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should color nodes with expression data, if expression data sheets are present in input workbook

### Test 56
Instructions:
- Node Coloring Menu - Top Dataset - Select Top Dataset from Dropdown List
- Node Coloring Menu - Bottom Dataset - Select Bottom Dataset from Dropdown List
- Node Coloring Menu - Log Fold Change Max Value - Increase Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Check
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Check
- Node Coloring Menu - Disable Node Coloring Button Toggle - Enable Node Coloring

Results:
- The top half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should decrease, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should color nodes with expression data, if expression data sheets are present in input workbook

### Test 57
Instructions:
- Node Coloring Menu - Top Dataset - Keep Default Selection
- Node Coloring Menu - Bottom Dataset - Keep Default Selection
- Node Coloring Menu - Log Fold Change Max Value - Decrease Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Check
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Check
- Node Coloring Menu - Disable Node Coloring Button Toggle - Enable Node Coloring

Results:
- The top half of each node should be colored using data from the first expression dataset detected in the input workbook, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the same dataset as the top dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should increase, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should color nodes with expression data, if expression data sheets are present in input workbook

### Test 58
Instructions:
- Node Coloring Menu - Top Dataset - Select Top Dataset from Dropdown List
- Node Coloring Menu - Bottom Dataset - Keep Default Selection
- Node Coloring Menu - Log Fold Change Max Value - Decrease Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Check
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Check
- Node Coloring Menu - Disable Node Coloring Button Toggle - Enable Node Coloring

Results:
- The top half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the same dataset as the top dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should increase, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should color nodes with expression data, if expression data sheets are present in input workbook

### Test 59
Instructions:
- Node Coloring Menu - Top Dataset - Keep Default Selection
- Node Coloring Menu - Bottom Dataset - Select Bottom Dataset from Dropdown List
- Node Coloring Menu - Log Fold Change Max Value - Decrease Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Check
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Check
- Node Coloring Menu - Disable Node Coloring Button Toggle - Enable Node Coloring

Results:
- The top half of each node should be colored using data from the first expression dataset detected in the input workbook, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should increase, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should color nodes with expression data, if expression data sheets are present in input workbook

### Test 60
Instructions:
- Node Coloring Menu - Top Dataset - Select Top Dataset from Dropdown List
- Node Coloring Menu - Bottom Dataset - Select Bottom Dataset from Dropdown List
- Node Coloring Menu - Log Fold Change Max Value - Decrease Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Check
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Check
- Node Coloring Menu - Disable Node Coloring Button Toggle - Enable Node Coloring

Results:
- The top half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should increase, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should color nodes with expression data, if expression data sheets are present in input workbook

### Test 61
Instructions:
- Node Coloring Menu - Top Dataset - Keep Default Selection
- Node Coloring Menu - Bottom Dataset - Keep Default Selection
- Node Coloring Menu - Log Fold Change Max Value - Keep Default Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Uncheck
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Check
- Node Coloring Menu - Disable Node Coloring Button Toggle - Enable Node Coloring

Results:
- The top half of each node should be colored using data from the first expression dataset detected in the input workbook, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the same dataset as the top dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should default to having a Log Fold Change Max Value of 3, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should color nodes with expression data, if expression data sheets are present in input workbook

### Test 62
Instructions:
- Node Coloring Menu - Top Dataset - Select Top Dataset from Dropdown List
- Node Coloring Menu - Bottom Dataset - Keep Default Selection
- Node Coloring Menu - Log Fold Change Max Value - Keep Default Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Uncheck
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Check
- Node Coloring Menu - Disable Node Coloring Button Toggle - Enable Node Coloring

Results:
- The top half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the same dataset as the top dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should default to having a Log Fold Change Max Value of 3, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should color nodes with expression data, if expression data sheets are present in input workbook

### Test 63
Instructions:
- Node Coloring Menu - Top Dataset - Keep Default Selection
- Node Coloring Menu - Bottom Dataset - Select Bottom Dataset from Dropdown List
- Node Coloring Menu - Log Fold Change Max Value - Keep Default Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Uncheck
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Check
- Node Coloring Menu - Disable Node Coloring Button Toggle - Enable Node Coloring

Results:
- The top half of each node should be colored using data from the first expression dataset detected in the input workbook, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should default to having a Log Fold Change Max Value of 3, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should color nodes with expression data, if expression data sheets are present in input workbook

### Test 64
Instructions:
- Node Coloring Menu - Top Dataset - Select Top Dataset from Dropdown List
- Node Coloring Menu - Bottom Dataset - Select Bottom Dataset from Dropdown List
- Node Coloring Menu - Log Fold Change Max Value - Keep Default Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Uncheck
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Check
- Node Coloring Menu - Disable Node Coloring Button Toggle - Enable Node Coloring

Results:
- The top half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should default to having a Log Fold Change Max Value of 3, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should color nodes with expression data, if expression data sheets are present in input workbook

### Test 65
Instructions:
- Node Coloring Menu - Top Dataset - Keep Default Selection
- Node Coloring Menu - Bottom Dataset - Keep Default Selection
- Node Coloring Menu - Log Fold Change Max Value - Increase Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Uncheck
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Check
- Node Coloring Menu - Disable Node Coloring Button Toggle - Enable Node Coloring

Results:
- The top half of each node should be colored using data from the first expression dataset detected in the input workbook, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the same dataset as the top dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should decrease, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should color nodes with expression data, if expression data sheets are present in input workbook

### Test 66
Instructions:
- Node Coloring Menu - Top Dataset - Select Top Dataset from Dropdown List
- Node Coloring Menu - Bottom Dataset - Keep Default Selection
- Node Coloring Menu - Log Fold Change Max Value - Increase Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Uncheck
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Check
- Node Coloring Menu - Disable Node Coloring Button Toggle - Enable Node Coloring

Results:
- The top half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the same dataset as the top dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should decrease, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should color nodes with expression data, if expression data sheets are present in input workbook

### Test 67
Instructions:
- Node Coloring Menu - Top Dataset - Keep Default Selection
- Node Coloring Menu - Bottom Dataset - Select Bottom Dataset from Dropdown List
- Node Coloring Menu - Log Fold Change Max Value - Increase Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Uncheck
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Check
- Node Coloring Menu - Disable Node Coloring Button Toggle - Enable Node Coloring

Results:
- The top half of each node should be colored using data from the first expression dataset detected in the input workbook, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should decrease, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should color nodes with expression data, if expression data sheets are present in input workbook

### Test 68
Instructions:
- Node Coloring Menu - Top Dataset - Select Top Dataset from Dropdown List
- Node Coloring Menu - Bottom Dataset - Select Bottom Dataset from Dropdown List
- Node Coloring Menu - Log Fold Change Max Value - Increase Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Uncheck
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Check
- Node Coloring Menu - Disable Node Coloring Button Toggle - Enable Node Coloring

Results:
- The top half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should decrease, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should color nodes with expression data, if expression data sheets are present in input workbook

### Test 69
Instructions:
- Node Coloring Menu - Top Dataset - Keep Default Selection
- Node Coloring Menu - Bottom Dataset - Keep Default Selection
- Node Coloring Menu - Log Fold Change Max Value - Decrease Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Uncheck
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Check
- Node Coloring Menu - Disable Node Coloring Button Toggle - Enable Node Coloring

Results:
- The top half of each node should be colored using data from the first expression dataset detected in the input workbook, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the same dataset as the top dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should increase, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should color nodes with expression data, if expression data sheets are present in input workbook

### Test 70
Instructions:
- Node Coloring Menu - Top Dataset - Select Top Dataset from Dropdown List
- Node Coloring Menu - Bottom Dataset - Keep Default Selection
- Node Coloring Menu - Log Fold Change Max Value - Decrease Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Uncheck
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Check
- Node Coloring Menu - Disable Node Coloring Button Toggle - Enable Node Coloring

Results:
- The top half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the same dataset as the top dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should increase, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should color nodes with expression data, if expression data sheets are present in input workbook

### Test 71
Instructions:
- Node Coloring Menu - Top Dataset - Keep Default Selection
- Node Coloring Menu - Bottom Dataset - Select Bottom Dataset from Dropdown List
- Node Coloring Menu - Log Fold Change Max Value - Decrease Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Uncheck
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Check
- Node Coloring Menu - Disable Node Coloring Button Toggle - Enable Node Coloring

Results:
- The top half of each node should be colored using data from the first expression dataset detected in the input workbook, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should increase, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should color nodes with expression data, if expression data sheets are present in input workbook

### Test 72
Instructions:
- Node Coloring Menu - Top Dataset - Select Top Dataset from Dropdown List
- Node Coloring Menu - Bottom Dataset - Select Bottom Dataset from Dropdown List
- Node Coloring Menu - Log Fold Change Max Value - Decrease Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Uncheck
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Check
- Node Coloring Menu - Disable Node Coloring Button Toggle - Enable Node Coloring

Results:
- The top half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should increase, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should color nodes with expression data, if expression data sheets are present in input workbook

### Test 73
Instructions:
- Node Coloring Menu - Top Dataset - Keep Default Selection
- Node Coloring Menu - Bottom Dataset - Keep Default Selection
- Node Coloring Menu - Log Fold Change Max Value - Keep Default Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Check
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Uncheck
- Node Coloring Menu - Disable Node Coloring Button Toggle - Enable Node Coloring

Results:
- The top half of each node should be colored using data from the first expression dataset detected in the input workbook, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the same dataset as the top dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should default to having a Log Fold Change Max Value of 3, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should color nodes with expression data, if expression data sheets are present in input workbook

### Test 74
Instructions:
- Node Coloring Menu - Top Dataset - Select Top Dataset from Dropdown List
- Node Coloring Menu - Bottom Dataset - Keep Default Selection
- Node Coloring Menu - Log Fold Change Max Value - Keep Default Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Check
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Uncheck
- Node Coloring Menu - Disable Node Coloring Button Toggle - Enable Node Coloring

Results:
- The top half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the same dataset as the top dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should default to having a Log Fold Change Max Value of 3, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should color nodes with expression data, if expression data sheets are present in input workbook

### Test 75
Instructions:
- Node Coloring Menu - Top Dataset - Keep Default Selection
- Node Coloring Menu - Bottom Dataset - Select Bottom Dataset from Dropdown List
- Node Coloring Menu - Log Fold Change Max Value - Keep Default Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Check
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Uncheck
- Node Coloring Menu - Disable Node Coloring Button Toggle - Enable Node Coloring

Results:
- The top half of each node should be colored using data from the first expression dataset detected in the input workbook, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should default to having a Log Fold Change Max Value of 3, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should color nodes with expression data, if expression data sheets are present in input workbook

### Test 76
Instructions:
- Node Coloring Menu - Top Dataset - Select Top Dataset from Dropdown List
- Node Coloring Menu - Bottom Dataset - Select Bottom Dataset from Dropdown List
- Node Coloring Menu - Log Fold Change Max Value - Keep Default Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Check
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Uncheck
- Node Coloring Menu - Disable Node Coloring Button Toggle - Enable Node Coloring

Results:
- The top half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should default to having a Log Fold Change Max Value of 3, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should color nodes with expression data, if expression data sheets are present in input workbook

### Test 77
Instructions:
- Node Coloring Menu - Top Dataset - Keep Default Selection
- Node Coloring Menu - Bottom Dataset - Keep Default Selection
- Node Coloring Menu - Log Fold Change Max Value - Increase Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Check
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Uncheck
- Node Coloring Menu - Disable Node Coloring Button Toggle - Enable Node Coloring

Results:
- The top half of each node should be colored using data from the first expression dataset detected in the input workbook, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the same dataset as the top dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should decrease, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should color nodes with expression data, if expression data sheets are present in input workbook

### Test 78
Instructions:
- Node Coloring Menu - Top Dataset - Select Top Dataset from Dropdown List
- Node Coloring Menu - Bottom Dataset - Keep Default Selection
- Node Coloring Menu - Log Fold Change Max Value - Increase Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Check
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Uncheck
- Node Coloring Menu - Disable Node Coloring Button Toggle - Enable Node Coloring

Results:
- The top half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the same dataset as the top dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should decrease, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should color nodes with expression data, if expression data sheets are present in input workbook

### Test 79
Instructions:
- Node Coloring Menu - Top Dataset - Keep Default Selection
- Node Coloring Menu - Bottom Dataset - Select Bottom Dataset from Dropdown List
- Node Coloring Menu - Log Fold Change Max Value - Increase Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Check
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Uncheck
- Node Coloring Menu - Disable Node Coloring Button Toggle - Enable Node Coloring

Results:
- The top half of each node should be colored using data from the first expression dataset detected in the input workbook, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should decrease, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should color nodes with expression data, if expression data sheets are present in input workbook

### Test 80
Instructions:
- Node Coloring Menu - Top Dataset - Select Top Dataset from Dropdown List
- Node Coloring Menu - Bottom Dataset - Select Bottom Dataset from Dropdown List
- Node Coloring Menu - Log Fold Change Max Value - Increase Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Check
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Uncheck
- Node Coloring Menu - Disable Node Coloring Button Toggle - Enable Node Coloring

Results:
- The top half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should decrease, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should color nodes with expression data, if expression data sheets are present in input workbook

### Test 81
Instructions:
- Node Coloring Menu - Top Dataset - Keep Default Selection
- Node Coloring Menu - Bottom Dataset - Keep Default Selection
- Node Coloring Menu - Log Fold Change Max Value - Decrease Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Check
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Uncheck
- Node Coloring Menu - Disable Node Coloring Button Toggle - Enable Node Coloring

Results:
- The top half of each node should be colored using data from the first expression dataset detected in the input workbook, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the same dataset as the top dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should increase, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should color nodes with expression data, if expression data sheets are present in input workbook

### Test 82
Instructions:
- Node Coloring Menu - Top Dataset - Select Top Dataset from Dropdown List
- Node Coloring Menu - Bottom Dataset - Keep Default Selection
- Node Coloring Menu - Log Fold Change Max Value - Decrease Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Check
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Uncheck
- Node Coloring Menu - Disable Node Coloring Button Toggle - Enable Node Coloring

Results:
- The top half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the same dataset as the top dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should increase, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should color nodes with expression data, if expression data sheets are present in input workbook

### Test 83
Instructions:
- Node Coloring Menu - Top Dataset - Keep Default Selection
- Node Coloring Menu - Bottom Dataset - Select Bottom Dataset from Dropdown List
- Node Coloring Menu - Log Fold Change Max Value - Decrease Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Check
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Uncheck
- Node Coloring Menu - Disable Node Coloring Button Toggle - Enable Node Coloring

Results:
- The top half of each node should be colored using data from the first expression dataset detected in the input workbook, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should increase, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should color nodes with expression data, if expression data sheets are present in input workbook

### Test 84
Instructions:
- Node Coloring Menu - Top Dataset - Select Top Dataset from Dropdown List
- Node Coloring Menu - Bottom Dataset - Select Bottom Dataset from Dropdown List
- Node Coloring Menu - Log Fold Change Max Value - Decrease Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Check
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Uncheck
- Node Coloring Menu - Disable Node Coloring Button Toggle - Enable Node Coloring

Results:
- The top half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should increase, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should color nodes with expression data, if expression data sheets are present in input workbook

### Test 85
Instructions:
- Node Coloring Menu - Top Dataset - Keep Default Selection
- Node Coloring Menu - Bottom Dataset - Keep Default Selection
- Node Coloring Menu - Log Fold Change Max Value - Keep Default Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Uncheck
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Uncheck
- Node Coloring Menu - Disable Node Coloring Button Toggle - Enable Node Coloring

Results:
- The top half of each node should be colored using data from the first expression dataset detected in the input workbook, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the same dataset as the top dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should default to having a Log Fold Change Max Value of 3, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should color nodes with expression data, if expression data sheets are present in input workbook

### Test 86
Instructions:
- Node Coloring Menu - Top Dataset - Select Top Dataset from Dropdown List
- Node Coloring Menu - Bottom Dataset - Keep Default Selection
- Node Coloring Menu - Log Fold Change Max Value - Keep Default Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Uncheck
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Uncheck
- Node Coloring Menu - Disable Node Coloring Button Toggle - Enable Node Coloring

Results:
- The top half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the same dataset as the top dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should default to having a Log Fold Change Max Value of 3, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should color nodes with expression data, if expression data sheets are present in input workbook

### Test 87
Instructions:
- Node Coloring Menu - Top Dataset - Keep Default Selection
- Node Coloring Menu - Bottom Dataset - Select Bottom Dataset from Dropdown List
- Node Coloring Menu - Log Fold Change Max Value - Keep Default Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Uncheck
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Uncheck
- Node Coloring Menu - Disable Node Coloring Button Toggle - Enable Node Coloring

Results:
- The top half of each node should be colored using data from the first expression dataset detected in the input workbook, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should default to having a Log Fold Change Max Value of 3, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should color nodes with expression data, if expression data sheets are present in input workbook

### Test 88
Instructions:
- Node Coloring Menu - Top Dataset - Select Top Dataset from Dropdown List
- Node Coloring Menu - Bottom Dataset - Select Bottom Dataset from Dropdown List
- Node Coloring Menu - Log Fold Change Max Value - Keep Default Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Uncheck
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Uncheck
- Node Coloring Menu - Disable Node Coloring Button Toggle - Enable Node Coloring

Results:
- The top half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should default to having a Log Fold Change Max Value of 3, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should color nodes with expression data, if expression data sheets are present in input workbook

### Test 89
Instructions:
- Node Coloring Menu - Top Dataset - Keep Default Selection
- Node Coloring Menu - Bottom Dataset - Keep Default Selection
- Node Coloring Menu - Log Fold Change Max Value - Increase Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Uncheck
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Uncheck
- Node Coloring Menu - Disable Node Coloring Button Toggle - Enable Node Coloring

Results:
- The top half of each node should be colored using data from the first expression dataset detected in the input workbook, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the same dataset as the top dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should decrease, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should color nodes with expression data, if expression data sheets are present in input workbook

### Test 90
Instructions:
- Node Coloring Menu - Top Dataset - Select Top Dataset from Dropdown List
- Node Coloring Menu - Bottom Dataset - Keep Default Selection
- Node Coloring Menu - Log Fold Change Max Value - Increase Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Uncheck
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Uncheck
- Node Coloring Menu - Disable Node Coloring Button Toggle - Enable Node Coloring

Results:
- The top half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the same dataset as the top dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should decrease, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should color nodes with expression data, if expression data sheets are present in input workbook

### Test 91
Instructions:
- Node Coloring Menu - Top Dataset - Keep Default Selection
- Node Coloring Menu - Bottom Dataset - Select Bottom Dataset from Dropdown List
- Node Coloring Menu - Log Fold Change Max Value - Increase Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Uncheck
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Uncheck
- Node Coloring Menu - Disable Node Coloring Button Toggle - Enable Node Coloring

Results:
- The top half of each node should be colored using data from the first expression dataset detected in the input workbook, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should decrease, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should color nodes with expression data, if expression data sheets are present in input workbook

### Test 92
Instructions:
- Node Coloring Menu - Top Dataset - Select Top Dataset from Dropdown List
- Node Coloring Menu - Bottom Dataset - Select Bottom Dataset from Dropdown List
- Node Coloring Menu - Log Fold Change Max Value - Increase Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Uncheck
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Uncheck
- Node Coloring Menu - Disable Node Coloring Button Toggle - Enable Node Coloring

Results:
- The top half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should decrease, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should color nodes with expression data, if expression data sheets are present in input workbook

### Test 93
Instructions:
- Node Coloring Menu - Top Dataset - Keep Default Selection
- Node Coloring Menu - Bottom Dataset - Keep Default Selection
- Node Coloring Menu - Log Fold Change Max Value - Decrease Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Uncheck
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Uncheck
- Node Coloring Menu - Disable Node Coloring Button Toggle - Enable Node Coloring

Results:
- The top half of each node should be colored using data from the first expression dataset detected in the input workbook, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the same dataset as the top dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should increase, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should color nodes with expression data, if expression data sheets are present in input workbook

### Test 94
Instructions:
- Node Coloring Menu - Top Dataset - Select Top Dataset from Dropdown List
- Node Coloring Menu - Bottom Dataset - Keep Default Selection
- Node Coloring Menu - Log Fold Change Max Value - Decrease Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Uncheck
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Uncheck
- Node Coloring Menu - Disable Node Coloring Button Toggle - Enable Node Coloring

Results:
- The top half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the same dataset as the top dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should increase, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should color nodes with expression data, if expression data sheets are present in input workbook

### Test 95
Instructions:
- Node Coloring Menu - Top Dataset - Keep Default Selection
- Node Coloring Menu - Bottom Dataset - Select Bottom Dataset from Dropdown List
- Node Coloring Menu - Log Fold Change Max Value - Decrease Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Uncheck
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Uncheck
- Node Coloring Menu - Disable Node Coloring Button Toggle - Enable Node Coloring

Results:
- The top half of each node should be colored using data from the first expression dataset detected in the input workbook, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should increase, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should color nodes with expression data, if expression data sheets are present in input workbook

### Test 96
Instructions:
- Node Coloring Menu - Top Dataset - Select Top Dataset from Dropdown List
- Node Coloring Menu - Bottom Dataset - Select Bottom Dataset from Dropdown List
- Node Coloring Menu - Log Fold Change Max Value - Decrease Log Fold Change Max Value
- Node Coloring Menu - Average Replicates Values (Top Dataset) - Uncheck
- Node Coloring Menu - Average Replicates Values (Bottom Dataset) - Uncheck
- Node Coloring Menu - Disable Node Coloring Button Toggle - Enable Node Coloring

Results:
- The top half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The bottom half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook
- The node coloring visualization's color intensity should increase, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should color nodes with expression data, if expression data sheets are present in input workbook

