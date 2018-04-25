## GRNsight Client Side Testing Overview
Last Updated: 2018-04-25

| Included in Testing Protocol  | GRNsight Option |  User Action | Result | 
| --------------- | ------ | ------- | ------ | 
|NO | Load Graph|None | GRNsight should have no graph in the viewport|
|NO | Load Graph|Dropdown Menu: File -> Open | GRNsight should lay out a network graph from the Excel workbook if there are no errors in the file|
|NO | Load Graph|Dropdown Menu: File -> Import SIF | GRNsight should lay out a network graph from the SIF file if there are no errors in the file|
|NO | Load Graph|Dropdown Menu: File -> Import GraphML | GRNsight should lay out a network graph from the GraphML file if there are no errors in the file|
|NO | Load Graph|Dropdown Menu: Demo -> Demo #1 | GRNsight should lay out an unweighted network graph from Demo #1|
|NO | Load Graph|Dropdown Menu: Demo -> Demo #2 | GRNsight should lay out a weighted network graph from Demo #2|
|NO | Load Graph|Dropdown Menu: Demo -> Demo #3 | GRNsight should lay out an unweighted network graph from Demo #3|
|NO | Load Graph|Dropdown Menu: Demo -> Demo #4 | GRNsight should lay out a weighted network graph from Demo #4|
|NO | Dropdown Menu: File -> Reload|Select | The graph should center, zoom to 100%, and reapply the force graph parameters|
|NO | Dropdown Menu: File -> Export Data|Select "To Unweighted SIF" | GRNsight should export an unweighted SIF file from the graph currently loaded|
|NO | Dropdown Menu: File -> Export Data|Select "To Weighted SIF" | GRNsight should export a weighted SIF file from the graph currently loaded|
|NO | Dropdown Menu: File -> Export Data|Select "To Unweighted GraphML" | GRNsight should export an unweighted GraphML file from the graph currently loaded|
|NO | Dropdown Menu: File -> Export Data|Select "To Weighted GraphML" | GRNsight should export a weighted GraphML file from the graph currently loaded|
|NO | Dropdown Menu: File -> Print|Select | GRNsight should open the Print Dialogue Box|
|NO | Dropdown Menu: Help|Select "Getting Started" | GRNsight should open the GRNsight documentation page|
|NO | Dropdown Menu: Help|Select "GRNsight Wiki" | GRNsight should open the GRNsight wiki page|
|NO | Dropdown Menu: Help|Select "About GRNsight" | GRNsight should open the About GRNsight page|
|NO | Sidebar Menu: Force Graph Parameter Sliders|Keep at Default Values |  The graph should be laid out according to the default values of the force graph parameter sliders|
|NO | Sidebar Menu: Force Graph Parameter Sliders|Decrease Link Distance |  The graph's edges should visibly decrease in length if Lock Force Graph Parameters is unchecked|
|NO | Sidebar Menu: Force Graph Parameter Sliders|Increase Link Distance |  The graph's edges should visibly increase in length if Lock Force Graph Parameters is unchecked|
|NO | Sidebar Menu: Force Graph Parameter Sliders|Increase Charge |  The graph's nodes should visibly increase attraction to each other if Lock Force Graph Parameters is unchecked|
|NO | Sidebar Menu: Force Graph Parameter Sliders|Decrease Charge |  The graph's nodes should visibly decrease attraction to each other if Lock Force Graph Parameters is unchecked|
|NO | Sidebar Menu: Lock Force Graph Parameters Checkbox|Check | The Force Graph Parameter sliders should be disabled.|
|NO | Sidebar Menu: Lock Force Graph Parameters Checkbox|Uncheck | The Force Graph Parameter sliders should be enabled.|
|NO | Sidebar Menu: Reset Force Graph Parameters Button|Click | The Force Graph Parameter sliders should revert to the default values, if Lock Force Graph Parameters is unchecked.|
|NO | Sidebar Menu: Undo Reset Button|Click | The Force Graph Parameter sliders should return to the values they had before the Undo Reset button (or menu item) was selected, if the Undo Reset button is enabled.|
|NO | Sidebar Menu: Restrict Graph to Viewport Checkbox|Check | The graph bounding box should always be contained within the viewport.|
|NO | Sidebar Menu: Restrict Graph to Viewport Checkbox|Uncheck | The graph bounding box should be allowed to extend past the viewport|
|NO | Sidebar Menu: Viewport Size|Keep as Detected |  Upon loading or reloading the GRNsight webpage, the viewport size should be automatically detected and set to small, medium, or large, based on the size of the browser window.|
|NO | Sidebar Menu: Viewport Size|Select "Small" |  The viewport size should be set to small|
|NO | Sidebar Menu: Viewport Size|Select "Medium" |  The viewport size should be set to medium|
|NO | Sidebar Menu: Viewport Size|Select "Large" |  The viewport size should be set to large|
|NO | Sidebar Menu: Viewport Size|Select "Fit to Window" |  The viewport size should automatically be set to the size of the browser window|
|NO | Dropdown Menu: Edge|Select "Format edges based on optimized weight parameters" | GRNsight should format edges based on optimized weight parameters|
|NO | Dropdown Menu: Edge|Select "Default to black edges with regular arrowheads" | GRNsight should default to black edges with regular arrowheads|
|NO | Sidebar Menu: Hide/Show Edge Weights|Select "Show With Mouse Over" |  A single edge weight should display when user mouses over a single edge.|
|NO | Sidebar Menu: Hide/Show Edge Weights|Select "Always Show Edge Weights" |  All edge weights should always be visible.|
|NO | Sidebar Menu: Hide/Show Edge Weights|Select "Never Show Edge Weights" |  No edge weights should be visible.|
|NO | Dropdown Menu: Edge -> Hide/Show Edge Weights|Check "Show With Mouse Over" |  A single edge weight should display when user mouses over a single edge.|
|NO | Dropdown Menu: Edge -> Hide/Show Edge Weights|Check "Always Show Edge Weights" |  All edge weights should always be visible.|
|NO | Dropdown Menu: Edge -> Hide/Show Edge Weights|Check "Never Show Edge Weights" |  No edge weights should be visible.|
|NO | Sidebar Menu: Edge Weight Normalization Factor|Enter a Number in the Box and Click "Set Factor" button | The graph should reload with the new normalization factor applied to its edge weight thicknesses|
|NO | Dropdown Menu: Edge -> Edge Weight Normalization Factor|Enter a Number in the Box and Press Enter | The graph should reload with the new normalization factor applied to its edge weight thicknesses|
|NO | Sidebar Menu: Reset Factor Button|Click | The graph should reset to its default normalization factor and reload the graph|
|NO | Dropdown Menu: Edge -> Reset Edge Weight Normalization|Click | The graph should reset to its default normalization factor and reload the graph|
|NO | Sidebar Menu: Gray Threshold Slider|Change the Grey Threshold Value | The graph should reload, with edges that fall below the threshold value colored gray|
|NO | Dropdown Menu: Edge -> Gray Threshold Input Box|Change the Grey Threshold Value and Press Enter | The graph should reload, with edges that fall below the threshold value colored gray|
|NO | Sidebar Menu: Show Grey Edges as Dashed Checkbox|Uncheck | The graph should show gray lines as solid lines|
|NO | Sidebar Menu: Show Grey Edges as Dashed Checkbox|Check | The graph should show gray lines as dashed lines|
|NO | Dropdown Menu: Edge -> Show Grey Edges as Dashed|Uncheck | The graph should show gray lines as solid lines|
|NO | Dropdown Menu: Edge -> Show Grey Edges as Dashed|Check | The graph should show gray lines as dashed lines|
|NO | Viewport Menu: D-Pad Control|Click Right Arrow | The graph should shift to the left, if "Restrict Graph to Viewport" is Unchecked.|
|NO | Viewport Menu: D-Pad Control|Click Left Arrow | The graph should shift to the right, if "Restrict Graph to Viewport" is Unchecked.|
|NO | Viewport Menu: D-Pad Control|Click Up Arrow | The graph should shift down, if "Restrict Graph to Viewport" is Unchecked.|
|NO | Viewport Menu: D-Pad Control|Click Down Arrow | The graph should shift up, if "Restrict Graph to Viewport" is Unchecked.|
|NO | Viewport Menu: D-Pad Control|Click Center Button | The graph should move to the center of the bounding box (note that it is not the same thing as the viewport, if "Restrict Graph to Viewport" is Unchecked.|
|NO | Viewport Menu: Zoom Slider|Increase Zoom Level | The graph should zoom in (get larger)|
|NO | Viewport Menu: Zoom Slider|Decrease Zoom Level | The graph should zoom out (get smaller)|
|NO | Sidebar Menu: Top Dataset|Keep Default Selection | The top half of each node should be colored using data from the first expression dataset detected in the input workbook, if expression data sheets are present in input workbook|
|NO | Sidebar Menu: Top Dataset|Select Top Dataset from Dropdown List | The top half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook|
|NO | Dropdown Menu: Node -> Select Top Dataset|Keep Default Selection | The top half of each node should be colored using data from the first expression dataset detected in the input workbook, if expression data sheets are present in input workbook|
|NO | Dropdown Menu: Node -> Select Top Dataset|Check New Top Dataset from Dropdown List | The top half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook|
|NO | Sidebar Menu: Bottom Dataset|Keep Default Selection | The bottom half of each node should be colored using data from the same dataset as the top dataset, if expression data sheets are present in input workbook|
|NO | Sidebar Menu: Bottom Dataset|Select Bottom Dataset from Dropdown List | The bottom half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook|
|NO | Dropdown Menu: Node -> Select Bottom Dataset|Keep Default Selection | The bottom half of each node should be colored using data from the same dataset as the top dataset, if expression data sheets are present in input workbook|
|NO | Dropdown Menu: Node -> Select Bottom Dataset|Check New Bottom Dataset from Dropdown List | The bottom half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook|
|NO | Sidebar Menu: Log Fold Change Max Value|Keep Default Value | The node coloring visualization's color intensity should default to having a Log Fold Change Max Value of 3, if expression data sheets are present in input workbook|
|NO | Sidebar Menu: Log Fold Change Max Value|Increase Log Fold Change Max Value | The node coloring visualization's color intensity should decrease, if expression data sheets are present in input workbook|
|NO | Sidebar Menu: Log Fold Change Max Value|Decrease Log Fold Change Max Value | The node coloring visualization's color intensity should increase, if expression data sheets are present in input workbook|
|NO | Dropdown Menu: Node -> Log Fold Change Max Value|Keep Default Value | The node coloring visualization's color intensity should default to having a Log Fold Change Max Value of 3, if expression data sheets are present in input workbook|
|NO | Dropdown Menu: Node -> Log Fold Change Max Value|Increase Log Fold Change Max Value | The node coloring visualization's color intensity should decrease, if expression data sheets are present in input workbook|
|NO | Dropdown Menu: Node -> Log Fold Change Max Value|Decrease Log Fold Change Max Value | The node coloring visualization's color intensity should increase, if expression data sheets are present in input workbook|
|YES | Sidebar Menu: Average Replicates Values (Top Dataset)|Check | GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook|
|YES | Sidebar Menu: Average Replicates Values (Top Dataset)|Uncheck | GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook|
|YES | Dropdown Menu: Node -> Average Replicates Values (Top Dataset)|Check | GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook|
|YES | Dropdown Menu: Node -> Average Replicates Values (Top Dataset)|Uncheck | GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook|
|YES | Sidebar Menu: Average Replicates Values (Bottom Dataset)|Check | GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook|
|YES | Sidebar Menu: Average Replicates Values (Bottom Dataset)|Uncheck | GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook|
|YES | Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset)|Check | GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook|
|YES | Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset)|Uncheck | GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook|
|YES | Sidebar Menu: Node Coloring Toggle Button|Click |  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook|
|YES | Dropdown Menu: Node -> Disable Node Coloring|Check |  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should read 'Enable Node Coloring', if expression data sheets are present in input workbook|
|YES | Dropdown Menu: Node -> Disable Node Coloring|Uncheck |  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should read 'Disable Node Coloring', if expression data sheets are present in input workbook|
|YES | Grid Layout|NULL | The graph should default to force graph layout|
|YES | Grid Layout|Click Grid Layout Button | The graph should change to grid layout|
|YES | Grid Layout|Click Force Graph Layout Button | The graph should change back to force graph layout|
|NO | Dropdown Menu - View: Viewport Size|NULL | The viewport should be medium size|
|NO | Dropdown Menu - View: Viewport Size|Click Small | The viewport should be set to small viewport size|
|NO | Dropdown Menu - View: Viewport Size|Click Medium | The viewport should be set to medium viewport size|
|NO | Dropdown Menu - View: Viewport Size|Click Large | The viewport should be set to large viewport size|
|NO | Dropdown Menu - View: Viewport Size|Click Fit To Window | The viewport should be set to size that fit to window|
|NO | Dropdown Menu - View: Restrict Graph to Viewport|NULL | The viewport should not restrict graph to viewport|
|NO | Dropdown Menu - View: Restrict Graph to Viewport|Click | The viewport should restrict graph to viewport|
|NO | Dropdown Menu - View: Zoom|Input Value | The viewport should should zoom according to the value|
|NO | Dropdown Menu - Layout: Graph Options|NULL | The graph should be in force graph layout by default|
|NO | Dropdown Menu - Layout: Graph Options|Grid Layout | The graph should apply grid layout|
|NO | Dropdown Menu - Layout: Graph Options|Force Graph | The graph should apply force graph layout|
|NO | Dropdown Menu - Layout: Lock Force Graph Parameters|Check "Lock Force Graph Parameters" | The Force Graph Parameter sliders should be disabled.|
|NO | Dropdown Menu - Layout: Lock Force Graph Parameters|Uncheck "Lock Force Graph Parameters" | The Force Graph Parameter sliders should be enabled.|
|NO | Dropdown Menu - Layout: Reset Force Graph Parameters|Select "Reset Force Graph Parameters" | The Reset Force Graph Parameters should revert to the default values, if Lock Force Graph Parameters is unchecked|
|NO | Dropdown Menu - Layout: Undo Reset|Click "Undo Reset" | The Undo Reset should return to the values they had before the Undo Reset button (or menu item) was selected, if the Undo Reset button is enabled.|
|NO | Dropdown Menu - Layout: Link Distance|Input Value | The Link Distance should change the link distance value for the slider accordingly and apply it to the force simulation of the graph|
|NO | Dropdown Menu - Layout: Charge|Input Value | The Charge should change the charge value for the slider accordingly and apply it to the force simulation of the graph|

## GRNsight Function Availability Table

| GRNsight Function | No Graph Loaded | Weighted Graph Loaded | Unweighted Graph Loaded  | 
|  ---------------- | --------------- | ----------------------- | ---------------------- | 
| Load Graph - None | YES | YES | YES | 
| Load Graph - Dropdown Menu: File -> Open | YES | YES | YES | 
| Load Graph - Dropdown Menu: File -> Import SIF | YES | YES | YES | 
| Load Graph - Dropdown Menu: File -> Import GraphML | YES | YES | YES | 
| Load Graph - Dropdown Menu: Demo -> Demo #1 | YES | YES | YES | 
| Load Graph - Dropdown Menu: Demo -> Demo #2 | YES | YES | YES | 
| Load Graph - Dropdown Menu: Demo -> Demo #3 | YES | YES | YES | 
| Load Graph - Dropdown Menu: Demo -> Demo #4 | YES | YES | YES | 
| Dropdown Menu: File -> Reload - Select | NO | YES | YES | 
| Dropdown Menu: File -> Export Data - Select "To Unweighted SIF" | NO | YES | YES | 
| Dropdown Menu: File -> Export Data - Select "To Weighted SIF" | NO | YES | YES | 
| Dropdown Menu: File -> Export Data - Select "To Unweighted GraphML" | NO | YES | YES | 
| Dropdown Menu: File -> Export Data - Select "To Weighted GraphML" | NO | YES | YES | 
| Dropdown Menu: File -> Print - Select | NO | YES | YES | 
| Dropdown Menu: Help - Select "Getting Started" | YES | YES | YES | 
| Dropdown Menu: Help - Select "GRNsight Wiki" | YES | YES | YES | 
| Dropdown Menu: Help - Select "About GRNsight" | YES | YES | YES | 
| Sidebar Menu: Force Graph Parameter Sliders - Keep at Default Values | YES | YES | YES | 
| Sidebar Menu: Force Graph Parameter Sliders - Decrease Link Distance | YES | YES | YES | 
| Sidebar Menu: Force Graph Parameter Sliders - Increase Link Distance | YES | YES | YES | 
| Sidebar Menu: Force Graph Parameter Sliders - Increase Charge | YES | YES | YES | 
| Sidebar Menu: Force Graph Parameter Sliders - Decrease Charge | YES | YES | YES | 
| Sidebar Menu: Lock Force Graph Parameters Checkbox - Check | YES | YES | YES | 
| Sidebar Menu: Lock Force Graph Parameters Checkbox - Uncheck | YES | YES | YES | 
| Sidebar Menu: Reset Force Graph Parameters Button - Click | YES | YES | YES | 
| Sidebar Menu: Undo Reset Button - Click | YES | YES | YES | 
| Sidebar Menu: Restrict Graph to Viewport Checkbox - Check | YES | YES | YES | 
| Sidebar Menu: Restrict Graph to Viewport Checkbox - Uncheck | YES | YES | YES | 
| Sidebar Menu: Viewport Size - Keep as Detected | YES | YES | YES | 
| Sidebar Menu: Viewport Size - Select "Small" | YES | YES | YES | 
| Sidebar Menu: Viewport Size - Select "Medium" | YES | YES | YES | 
| Sidebar Menu: Viewport Size - Select "Large" | YES | YES | YES | 
| Sidebar Menu: Viewport Size - Select "Fit to Window" | YES | YES | YES | 
| Dropdown Menu: Edge - Select "Format edges based on optimized weight parameters" | YES | YES | YES | 
| Dropdown Menu: Edge - Select "Default to black edges with regular arrowheads" | YES | YES | YES | 
| Sidebar Menu: Hide/Show Edge Weights - Select "Show With Mouse Over" | NO | YES | NO | 
| Sidebar Menu: Hide/Show Edge Weights - Select "Always Show Edge Weights" | NO | YES | NO | 
| Sidebar Menu: Hide/Show Edge Weights - Select "Never Show Edge Weights" | NO | YES | NO | 
| Dropdown Menu: Edge -> Hide/Show Edge Weights - Check "Show With Mouse Over" | NO | YES | NO | 
| Dropdown Menu: Edge -> Hide/Show Edge Weights - Check "Always Show Edge Weights" | NO | YES | NO | 
| Dropdown Menu: Edge -> Hide/Show Edge Weights - Check "Never Show Edge Weights" | NO | YES | NO | 
| Sidebar Menu: Edge Weight Normalization Factor - Enter a Number in the Box and Click "Set Factor" button | NO | YES | NO | 
| Dropdown Menu: Edge -> Edge Weight Normalization Factor - Enter a Number in the Box and Press Enter | NO | YES | NO | 
| Sidebar Menu: Reset Factor Button - Click | NO | YES | NO | 
| Dropdown Menu: Edge -> Reset Edge Weight Normalization - Click | NO | YES | NO | 
| Sidebar Menu: Gray Threshold Slider - Change the Grey Threshold Value | NO | YES | NO | 
| Dropdown Menu: Edge -> Gray Threshold Input Box - Change the Grey Threshold Value and Press Enter | NO | YES | NO | 
| Sidebar Menu: Show Grey Edges as Dashed Checkbox - Uncheck | NO | YES | NO | 
| Sidebar Menu: Show Grey Edges as Dashed Checkbox - Check | NO | YES | NO | 
| Dropdown Menu: Edge -> Show Grey Edges as Dashed - Uncheck | NO | YES | NO | 
| Dropdown Menu: Edge -> Show Grey Edges as Dashed - Check | NO | YES | NO | 
| Viewport Menu: D-Pad Control - Click Right Arrow | NO | YES | YES | 
| Viewport Menu: D-Pad Control - Click Left Arrow | NO | YES | YES | 
| Viewport Menu: D-Pad Control - Click Up Arrow | NO | YES | YES | 
| Viewport Menu: D-Pad Control - Click Down Arrow | NO | YES | YES | 
| Viewport Menu: D-Pad Control - Click Center Button | NO | YES | YES | 
| Viewport Menu: Zoom Slider - Increase Zoom Level | NO | YES | YES | 
| Viewport Menu: Zoom Slider - Decrease Zoom Level | NO | YES | YES | 
| Sidebar Menu: Top Dataset - Keep Default Selection | NO | YES | YES | 
| Sidebar Menu: Top Dataset - Select Top Dataset from Dropdown List | NO | YES | YES | 
| Dropdown Menu: Node -> Select Top Dataset - Keep Default Selection | NO | YES | YES | 
| Dropdown Menu: Node -> Select Top Dataset - Check New Top Dataset from Dropdown List | NO | YES | YES | 
| Sidebar Menu: Bottom Dataset - Keep Default Selection | NO | YES | YES | 
| Sidebar Menu: Bottom Dataset - Select Bottom Dataset from Dropdown List | NO | YES | YES | 
| Dropdown Menu: Node -> Select Bottom Dataset - Keep Default Selection | NO | YES | YES | 
| Dropdown Menu: Node -> Select Bottom Dataset - Check New Bottom Dataset from Dropdown List | NO | YES | YES | 
| Sidebar Menu: Log Fold Change Max Value - Keep Default Value | NO | YES | YES | 
| Sidebar Menu: Log Fold Change Max Value - Increase Log Fold Change Max Value | NO | YES | YES | 
| Sidebar Menu: Log Fold Change Max Value - Decrease Log Fold Change Max Value | NO | YES | YES | 
| Dropdown Menu: Node -> Log Fold Change Max Value - Keep Default Value | NO | YES | YES | 
| Dropdown Menu: Node -> Log Fold Change Max Value - Increase Log Fold Change Max Value | NO | YES | YES | 
| Dropdown Menu: Node -> Log Fold Change Max Value - Decrease Log Fold Change Max Value | NO | YES | YES | 
| Sidebar Menu: Average Replicates Values (Top Dataset) - Check | NO | YES | YES | 
| Sidebar Menu: Average Replicates Values (Top Dataset) - Uncheck | NO | YES | YES | 
| Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Check | NO | YES | YES | 
| Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Uncheck | NO | YES | YES | 
| Sidebar Menu: Average Replicates Values (Bottom Dataset) - Check | NO | YES | YES | 
| Sidebar Menu: Average Replicates Values (Bottom Dataset) - Uncheck | NO | YES | YES | 
| Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Check | NO | YES | YES | 
| Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Uncheck | NO | YES | YES | 
| Sidebar Menu: Node Coloring Toggle Button - Click | NO | YES | YES | 
| Dropdown Menu: Node -> Disable Node Coloring - Check | NO | YES | YES | 
| Dropdown Menu: Node -> Disable Node Coloring - Uncheck | NO | YES | YES | 
| Grid Layout - NULL | YES | YES | YES | 
| Grid Layout - Click Grid Layout Button | YES | YES | YES | 
| Grid Layout - Click Force Graph Layout Button | YES | YES | YES | 
| Dropdown Menu - View: Viewport Size - NULL | YES | YES | YES | 
| Dropdown Menu - View: Viewport Size - Click Small | YES | YES | YES | 
| Dropdown Menu - View: Viewport Size - Click Medium | YES | YES | YES | 
| Dropdown Menu - View: Viewport Size - Click Large | YES | YES | YES | 
| Dropdown Menu - View: Viewport Size - Click Fit To Window | YES | YES | YES | 
| Dropdown Menu - View: Restrict Graph to Viewport - NULL | YES | YES | YES | 
| Dropdown Menu - View: Restrict Graph to Viewport - Click | YES | YES | YES | 
| Dropdown Menu - View: Zoom - Input Value | NO | YES | YES | 
| Dropdown Menu - Layout: Graph Options - NULL | NO | YES | YES | 
| Dropdown Menu - Layout: Graph Options - Grid Layout | NO | YES | YES | 
| Dropdown Menu - Layout: Graph Options - Force Graph | NO | YES | YES | 
| Dropdown Menu - Layout: Lock Force Graph Parameters - Check "Lock Force Graph Parameters" | NO | YES | YES | 
| Dropdown Menu - Layout: Lock Force Graph Parameters - Uncheck "Lock Force Graph Parameters" | NO | YES | YES | 
| Dropdown Menu - Layout: Reset Force Graph Parameters - Select "Reset Force Graph Parameters" | YES | YES | YES | 
| Dropdown Menu - Layout: Undo Reset - Click "Undo Reset" | YES | YES | YES | 
| Dropdown Menu - Layout: Link Distance - Input Value | YES | YES | YES | 
| Dropdown Menu - Layout: Charge - Input Value | YES | YES | YES | 

## Client Side Tests
### Test 1
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Check
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Check
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Check

Results:
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should read 'Enable Node Coloring', if expression data sheets are present in input workbook

### Test 2
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Check
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Check
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Check

Results:
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should read 'Enable Node Coloring', if expression data sheets are present in input workbook

### Test 3
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Uncheck
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Check
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Check

Results:
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should read 'Enable Node Coloring', if expression data sheets are present in input workbook

### Test 4
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Uncheck
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Check
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Check

Results:
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should read 'Enable Node Coloring', if expression data sheets are present in input workbook

### Test 5
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Check
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Check
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Check

Results:
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should read 'Enable Node Coloring', if expression data sheets are present in input workbook

### Test 6
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Check
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Check
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Check

Results:
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should read 'Enable Node Coloring', if expression data sheets are present in input workbook

### Test 7
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Uncheck
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Check
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Check

Results:
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should read 'Enable Node Coloring', if expression data sheets are present in input workbook

### Test 8
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Uncheck
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Check
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Check

Results:
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should read 'Enable Node Coloring', if expression data sheets are present in input workbook

### Test 9
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Check
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Uncheck
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Check

Results:
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should read 'Enable Node Coloring', if expression data sheets are present in input workbook

### Test 10
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Check
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Uncheck
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Check

Results:
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should read 'Enable Node Coloring', if expression data sheets are present in input workbook

### Test 11
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Uncheck
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Uncheck
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Check

Results:
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should read 'Enable Node Coloring', if expression data sheets are present in input workbook

### Test 12
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Uncheck
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Uncheck
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Check

Results:
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should read 'Enable Node Coloring', if expression data sheets are present in input workbook

### Test 13
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Check
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Uncheck
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Check

Results:
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should read 'Enable Node Coloring', if expression data sheets are present in input workbook

### Test 14
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Check
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Uncheck
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Check

Results:
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should read 'Enable Node Coloring', if expression data sheets are present in input workbook

### Test 15
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Uncheck
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Uncheck
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Check

Results:
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should read 'Enable Node Coloring', if expression data sheets are present in input workbook

### Test 16
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Uncheck
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Uncheck
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Check

Results:
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should read 'Enable Node Coloring', if expression data sheets are present in input workbook

### Test 17
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Check
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Check
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Uncheck

Results:
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should read 'Disable Node Coloring', if expression data sheets are present in input workbook

### Test 18
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Check
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Check
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Uncheck

Results:
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should read 'Disable Node Coloring', if expression data sheets are present in input workbook

### Test 19
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Uncheck
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Check
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Uncheck

Results:
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should read 'Disable Node Coloring', if expression data sheets are present in input workbook

### Test 20
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Uncheck
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Check
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Uncheck

Results:
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should read 'Disable Node Coloring', if expression data sheets are present in input workbook

### Test 21
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Check
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Check
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Uncheck

Results:
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should read 'Disable Node Coloring', if expression data sheets are present in input workbook

### Test 22
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Check
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Check
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Uncheck

Results:
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should read 'Disable Node Coloring', if expression data sheets are present in input workbook

### Test 23
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Uncheck
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Check
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Uncheck

Results:
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should read 'Disable Node Coloring', if expression data sheets are present in input workbook

### Test 24
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Uncheck
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Check
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Uncheck

Results:
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should read 'Disable Node Coloring', if expression data sheets are present in input workbook

### Test 25
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Check
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Uncheck
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Uncheck

Results:
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should read 'Disable Node Coloring', if expression data sheets are present in input workbook

### Test 26
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Check
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Uncheck
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Uncheck

Results:
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should read 'Disable Node Coloring', if expression data sheets are present in input workbook

### Test 27
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Uncheck
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Uncheck
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Uncheck

Results:
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should read 'Disable Node Coloring', if expression data sheets are present in input workbook

### Test 28
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Uncheck
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Uncheck
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Uncheck

Results:
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should read 'Disable Node Coloring', if expression data sheets are present in input workbook

### Test 29
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Check
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Uncheck
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Uncheck

Results:
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should read 'Disable Node Coloring', if expression data sheets are present in input workbook

### Test 30
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Check
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Uncheck
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Uncheck

Results:
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should read 'Disable Node Coloring', if expression data sheets are present in input workbook

### Test 31
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Uncheck
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Uncheck
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Uncheck

Results:
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should read 'Disable Node Coloring', if expression data sheets are present in input workbook

### Test 32
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Uncheck
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Uncheck
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Uncheck

Results:
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should read 'Disable Node Coloring', if expression data sheets are present in input workbook

### Test 33
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Check
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Check
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Check
- Grid Layout - Click Grid Layout Button

Results:
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should read 'Enable Node Coloring', if expression data sheets are present in input workbook
- The graph should change to grid layout

### Test 34
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Check
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Check
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Check
- Grid Layout - Click Grid Layout Button

Results:
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should read 'Enable Node Coloring', if expression data sheets are present in input workbook
- The graph should change to grid layout

### Test 35
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Uncheck
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Check
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Check
- Grid Layout - Click Grid Layout Button

Results:
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should read 'Enable Node Coloring', if expression data sheets are present in input workbook
- The graph should change to grid layout

### Test 36
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Uncheck
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Check
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Check
- Grid Layout - Click Grid Layout Button

Results:
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should read 'Enable Node Coloring', if expression data sheets are present in input workbook
- The graph should change to grid layout

### Test 37
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Check
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Check
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Check
- Grid Layout - Click Grid Layout Button

Results:
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should read 'Enable Node Coloring', if expression data sheets are present in input workbook
- The graph should change to grid layout

### Test 38
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Check
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Check
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Check
- Grid Layout - Click Grid Layout Button

Results:
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should read 'Enable Node Coloring', if expression data sheets are present in input workbook
- The graph should change to grid layout

### Test 39
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Uncheck
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Check
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Check
- Grid Layout - Click Grid Layout Button

Results:
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should read 'Enable Node Coloring', if expression data sheets are present in input workbook
- The graph should change to grid layout

### Test 40
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Uncheck
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Check
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Check
- Grid Layout - Click Grid Layout Button

Results:
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should read 'Enable Node Coloring', if expression data sheets are present in input workbook
- The graph should change to grid layout

### Test 41
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Check
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Uncheck
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Check
- Grid Layout - Click Grid Layout Button

Results:
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should read 'Enable Node Coloring', if expression data sheets are present in input workbook
- The graph should change to grid layout

### Test 42
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Check
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Uncheck
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Check
- Grid Layout - Click Grid Layout Button

Results:
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should read 'Enable Node Coloring', if expression data sheets are present in input workbook
- The graph should change to grid layout

### Test 43
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Uncheck
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Uncheck
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Check
- Grid Layout - Click Grid Layout Button

Results:
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should read 'Enable Node Coloring', if expression data sheets are present in input workbook
- The graph should change to grid layout

### Test 44
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Uncheck
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Uncheck
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Check
- Grid Layout - Click Grid Layout Button

Results:
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should read 'Enable Node Coloring', if expression data sheets are present in input workbook
- The graph should change to grid layout

### Test 45
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Check
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Uncheck
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Check
- Grid Layout - Click Grid Layout Button

Results:
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should read 'Enable Node Coloring', if expression data sheets are present in input workbook
- The graph should change to grid layout

### Test 46
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Check
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Uncheck
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Check
- Grid Layout - Click Grid Layout Button

Results:
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should read 'Enable Node Coloring', if expression data sheets are present in input workbook
- The graph should change to grid layout

### Test 47
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Uncheck
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Uncheck
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Check
- Grid Layout - Click Grid Layout Button

Results:
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should read 'Enable Node Coloring', if expression data sheets are present in input workbook
- The graph should change to grid layout

### Test 48
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Uncheck
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Uncheck
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Check
- Grid Layout - Click Grid Layout Button

Results:
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should read 'Enable Node Coloring', if expression data sheets are present in input workbook
- The graph should change to grid layout

### Test 49
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Check
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Check
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Uncheck
- Grid Layout - Click Grid Layout Button

Results:
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should read 'Disable Node Coloring', if expression data sheets are present in input workbook
- The graph should change to grid layout

### Test 50
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Check
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Check
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Uncheck
- Grid Layout - Click Grid Layout Button

Results:
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should read 'Disable Node Coloring', if expression data sheets are present in input workbook
- The graph should change to grid layout

### Test 51
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Uncheck
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Check
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Uncheck
- Grid Layout - Click Grid Layout Button

Results:
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should read 'Disable Node Coloring', if expression data sheets are present in input workbook
- The graph should change to grid layout

### Test 52
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Uncheck
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Check
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Uncheck
- Grid Layout - Click Grid Layout Button

Results:
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should read 'Disable Node Coloring', if expression data sheets are present in input workbook
- The graph should change to grid layout

### Test 53
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Check
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Check
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Uncheck
- Grid Layout - Click Grid Layout Button

Results:
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should read 'Disable Node Coloring', if expression data sheets are present in input workbook
- The graph should change to grid layout

### Test 54
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Check
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Check
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Uncheck
- Grid Layout - Click Grid Layout Button

Results:
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should read 'Disable Node Coloring', if expression data sheets are present in input workbook
- The graph should change to grid layout

### Test 55
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Uncheck
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Check
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Uncheck
- Grid Layout - Click Grid Layout Button

Results:
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should read 'Disable Node Coloring', if expression data sheets are present in input workbook
- The graph should change to grid layout

### Test 56
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Uncheck
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Check
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Uncheck
- Grid Layout - Click Grid Layout Button

Results:
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should read 'Disable Node Coloring', if expression data sheets are present in input workbook
- The graph should change to grid layout

### Test 57
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Check
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Uncheck
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Uncheck
- Grid Layout - Click Grid Layout Button

Results:
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should read 'Disable Node Coloring', if expression data sheets are present in input workbook
- The graph should change to grid layout

### Test 58
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Check
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Uncheck
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Uncheck
- Grid Layout - Click Grid Layout Button

Results:
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should read 'Disable Node Coloring', if expression data sheets are present in input workbook
- The graph should change to grid layout

### Test 59
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Uncheck
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Uncheck
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Uncheck
- Grid Layout - Click Grid Layout Button

Results:
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should read 'Disable Node Coloring', if expression data sheets are present in input workbook
- The graph should change to grid layout

### Test 60
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Uncheck
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Uncheck
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Uncheck
- Grid Layout - Click Grid Layout Button

Results:
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should read 'Disable Node Coloring', if expression data sheets are present in input workbook
- The graph should change to grid layout

### Test 61
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Check
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Uncheck
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Uncheck
- Grid Layout - Click Grid Layout Button

Results:
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should read 'Disable Node Coloring', if expression data sheets are present in input workbook
- The graph should change to grid layout

### Test 62
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Check
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Uncheck
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Uncheck
- Grid Layout - Click Grid Layout Button

Results:
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should read 'Disable Node Coloring', if expression data sheets are present in input workbook
- The graph should change to grid layout

### Test 63
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Uncheck
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Uncheck
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Uncheck
- Grid Layout - Click Grid Layout Button

Results:
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should read 'Disable Node Coloring', if expression data sheets are present in input workbook
- The graph should change to grid layout

### Test 64
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Uncheck
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Uncheck
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Uncheck
- Grid Layout - Click Grid Layout Button

Results:
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should read 'Disable Node Coloring', if expression data sheets are present in input workbook
- The graph should change to grid layout

### Test 65
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Check
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Check
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Check
- Grid Layout - Click Force Graph Layout Button

Results:
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should read 'Enable Node Coloring', if expression data sheets are present in input workbook
- The graph should change back to force graph layout

### Test 66
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Check
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Check
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Check
- Grid Layout - Click Force Graph Layout Button

Results:
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should read 'Enable Node Coloring', if expression data sheets are present in input workbook
- The graph should change back to force graph layout

### Test 67
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Uncheck
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Check
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Check
- Grid Layout - Click Force Graph Layout Button

Results:
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should read 'Enable Node Coloring', if expression data sheets are present in input workbook
- The graph should change back to force graph layout

### Test 68
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Uncheck
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Check
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Check
- Grid Layout - Click Force Graph Layout Button

Results:
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should read 'Enable Node Coloring', if expression data sheets are present in input workbook
- The graph should change back to force graph layout

### Test 69
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Check
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Check
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Check
- Grid Layout - Click Force Graph Layout Button

Results:
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should read 'Enable Node Coloring', if expression data sheets are present in input workbook
- The graph should change back to force graph layout

### Test 70
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Check
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Check
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Check
- Grid Layout - Click Force Graph Layout Button

Results:
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should read 'Enable Node Coloring', if expression data sheets are present in input workbook
- The graph should change back to force graph layout

### Test 71
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Uncheck
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Check
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Check
- Grid Layout - Click Force Graph Layout Button

Results:
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should read 'Enable Node Coloring', if expression data sheets are present in input workbook
- The graph should change back to force graph layout

### Test 72
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Uncheck
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Check
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Check
- Grid Layout - Click Force Graph Layout Button

Results:
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should read 'Enable Node Coloring', if expression data sheets are present in input workbook
- The graph should change back to force graph layout

### Test 73
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Check
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Uncheck
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Check
- Grid Layout - Click Force Graph Layout Button

Results:
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should read 'Enable Node Coloring', if expression data sheets are present in input workbook
- The graph should change back to force graph layout

### Test 74
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Check
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Uncheck
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Check
- Grid Layout - Click Force Graph Layout Button

Results:
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should read 'Enable Node Coloring', if expression data sheets are present in input workbook
- The graph should change back to force graph layout

### Test 75
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Uncheck
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Uncheck
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Check
- Grid Layout - Click Force Graph Layout Button

Results:
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should read 'Enable Node Coloring', if expression data sheets are present in input workbook
- The graph should change back to force graph layout

### Test 76
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Uncheck
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Uncheck
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Check
- Grid Layout - Click Force Graph Layout Button

Results:
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should read 'Enable Node Coloring', if expression data sheets are present in input workbook
- The graph should change back to force graph layout

### Test 77
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Check
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Uncheck
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Check
- Grid Layout - Click Force Graph Layout Button

Results:
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should read 'Enable Node Coloring', if expression data sheets are present in input workbook
- The graph should change back to force graph layout

### Test 78
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Check
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Uncheck
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Check
- Grid Layout - Click Force Graph Layout Button

Results:
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should read 'Enable Node Coloring', if expression data sheets are present in input workbook
- The graph should change back to force graph layout

### Test 79
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Uncheck
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Uncheck
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Check
- Grid Layout - Click Force Graph Layout Button

Results:
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should read 'Enable Node Coloring', if expression data sheets are present in input workbook
- The graph should change back to force graph layout

### Test 80
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Uncheck
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Uncheck
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Check
- Grid Layout - Click Force Graph Layout Button

Results:
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should read 'Enable Node Coloring', if expression data sheets are present in input workbook
- The graph should change back to force graph layout

### Test 81
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Check
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Check
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Uncheck
- Grid Layout - Click Force Graph Layout Button

Results:
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should read 'Disable Node Coloring', if expression data sheets are present in input workbook
- The graph should change back to force graph layout

### Test 82
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Check
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Check
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Uncheck
- Grid Layout - Click Force Graph Layout Button

Results:
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should read 'Disable Node Coloring', if expression data sheets are present in input workbook
- The graph should change back to force graph layout

### Test 83
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Uncheck
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Check
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Uncheck
- Grid Layout - Click Force Graph Layout Button

Results:
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should read 'Disable Node Coloring', if expression data sheets are present in input workbook
- The graph should change back to force graph layout

### Test 84
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Uncheck
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Check
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Uncheck
- Grid Layout - Click Force Graph Layout Button

Results:
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should read 'Disable Node Coloring', if expression data sheets are present in input workbook
- The graph should change back to force graph layout

### Test 85
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Check
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Check
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Uncheck
- Grid Layout - Click Force Graph Layout Button

Results:
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should read 'Disable Node Coloring', if expression data sheets are present in input workbook
- The graph should change back to force graph layout

### Test 86
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Check
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Check
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Uncheck
- Grid Layout - Click Force Graph Layout Button

Results:
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should read 'Disable Node Coloring', if expression data sheets are present in input workbook
- The graph should change back to force graph layout

### Test 87
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Uncheck
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Check
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Uncheck
- Grid Layout - Click Force Graph Layout Button

Results:
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should read 'Disable Node Coloring', if expression data sheets are present in input workbook
- The graph should change back to force graph layout

### Test 88
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Uncheck
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Check
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Uncheck
- Grid Layout - Click Force Graph Layout Button

Results:
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should read 'Disable Node Coloring', if expression data sheets are present in input workbook
- The graph should change back to force graph layout

### Test 89
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Check
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Uncheck
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Uncheck
- Grid Layout - Click Force Graph Layout Button

Results:
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should read 'Disable Node Coloring', if expression data sheets are present in input workbook
- The graph should change back to force graph layout

### Test 90
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Check
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Uncheck
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Uncheck
- Grid Layout - Click Force Graph Layout Button

Results:
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should read 'Disable Node Coloring', if expression data sheets are present in input workbook
- The graph should change back to force graph layout

### Test 91
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Uncheck
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Uncheck
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Uncheck
- Grid Layout - Click Force Graph Layout Button

Results:
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should read 'Disable Node Coloring', if expression data sheets are present in input workbook
- The graph should change back to force graph layout

### Test 92
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Uncheck
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Uncheck
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Uncheck
- Grid Layout - Click Force Graph Layout Button

Results:
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should read 'Disable Node Coloring', if expression data sheets are present in input workbook
- The graph should change back to force graph layout

### Test 93
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Check
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Uncheck
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Uncheck
- Grid Layout - Click Force Graph Layout Button

Results:
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should read 'Disable Node Coloring', if expression data sheets are present in input workbook
- The graph should change back to force graph layout

### Test 94
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Check
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Uncheck
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Uncheck
- Grid Layout - Click Force Graph Layout Button

Results:
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should read 'Disable Node Coloring', if expression data sheets are present in input workbook
- The graph should change back to force graph layout

### Test 95
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Check
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Uncheck
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Uncheck
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Uncheck
- Grid Layout - Click Force Graph Layout Button

Results:
- GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should read 'Disable Node Coloring', if expression data sheets are present in input workbook
- The graph should change back to force graph layout

### Test 96
Instructions:
- Sidebar Menu: Average Replicates Values (Top Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Top Dataset) - Uncheck
- Sidebar Menu: Average Replicates Values (Bottom Dataset) - Uncheck
- Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset) - Uncheck
- Sidebar Menu: Node Coloring Toggle Button - Click
- Dropdown Menu: Node -> Disable Node Coloring - Uncheck
- Grid Layout - Click Force Graph Layout Button

Results:
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
- GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook
-  Node coloring should toggle between on and off, with default being on and button text should toggle between 'Enable Node Coloring' and 'Disable Node Coloring', if expression data sheets are present in input workbook
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should read 'Disable Node Coloring', if expression data sheets are present in input workbook
- The graph should change back to force graph layout

