## GRNsight Client Side Testing Overview
Last Updated: 2021-09-09

| ID | Included in Testing Protocol  | GRNsight Option |  User Action | Result | 
| ---- |  --------------- | ------ | ------- | ------ | 
|e1|NO | Dropdown Menu: Edge -> Enable Edge Coloring Based on Weight Value|Check | GRNsight should enable edge coloring and set the sidebar menu 'Enable Edge Coloring' to checked|
|e1|NO | Dropdown Menu: Edge -> Enable Edge Coloring Based on Weight Value|Uncheck | GRNsight should disable edge coloring and set the sidebar menu 'Enable Edge Coloring' to unchecked|
|e2|NO | Sidebar Menu: Enable Edge Coloring|Check | GRNsight should enable edge coloring and set the dropdown menu 'Enable Edge Coloring Based on Weight Value' to checked|
|e2|NO | Sidebar Menu: Enable Edge Coloring|Uncheck | GRNsight should disable edge coloring and set the dropdown menu 'Enable Edge Coloring Based on Weight Value' to unchecked|
|e3|NO | Sidebar Menu: Hide/Show Edge Weights|Select "Show With Mouse Over" |  A single edge weight should display when user mouses over a single edge.|
|e3|NO | Sidebar Menu: Hide/Show Edge Weights|Select "Always Show Edge Weights" |  All edge weights should always be visible.|
|e3|NO | Sidebar Menu: Hide/Show Edge Weights|Select "Never Show Edge Weights" |  No edge weights should be visible.|
|e4|NO | Dropdown Menu: Edge -> Hide/Show Edge Weights|Check "Show With Mouse Over" |  A single edge weight should display when user mouses over a single edge.|
|e4|NO | Dropdown Menu: Edge -> Hide/Show Edge Weights|Check "Always Show Edge Weights" |  All edge weights should always be visible.|
|e4|NO | Dropdown Menu: Edge -> Hide/Show Edge Weights|Check "Never Show Edge Weights" |  No edge weights should be visible.|
|e5|NO | Sidebar Menu: Edge Weight Normalization Factor|Enter a Number in the Box and Click "Set Factor" button | The graph should reload with the new normalization factor applied to its edge weight thicknesses|
|e6|NO | Dropdown Menu: Edge -> Edge Weight Normalization Factor|Enter a Number in the Box and Press Enter | The graph should reload with the new normalization factor applied to its edge weight thicknesses|
|e7|NO | Sidebar Menu: Reset Factor Button|Click | The graph should reset to its default normalization factor and reload the graph|
|e8|NO | Dropdown Menu: Edge -> Reset Edge Weight Normalization|Click | The graph should reset to its default normalization factor and reload the graph|
|e9|NO | Sidebar Menu: Gray Threshold Slider|Change the Grey Threshold Value | The graph should reload, with edges that fall below the threshold value colored gray|
|e10|NO | Dropdown Menu: Edge -> Gray Threshold Input Box|Change the Grey Threshold Value and Press Enter | The graph should reload, with edges that fall below the threshold value colored gray|
|e11|NO | Sidebar Menu: Show Grey Edges as Dashed Checkbox|Uncheck | The graph should show gray lines as solid lines|
|e11|NO | Sidebar Menu: Show Grey Edges as Dashed Checkbox|Check | The graph should show gray lines as dashed lines|
|e12|NO | Dropdown Menu: Edge -> Show Grey Edges as Dashed|Uncheck | The graph should show gray lines as solid lines|
|e12|NO | Dropdown Menu: Edge -> Show Grey Edges as Dashed|Check | The graph should show gray lines as dashed lines|
|f1|NO | Dropdown Menu: Help|Select "Getting Started" | GRNsight should open the GRNsight documentation page|
|f1|NO | Dropdown Menu: Help|Select "GRNsight Wiki" | GRNsight should open the GRNsight wiki page|
|f1|NO | Dropdown Menu: Help|Select "About GRNsight" | GRNsight should open the About GRNsight page|
|f2|NO | Load Graph|None | GRNsight should have no graph in the viewport|
|f2|NO | Load Graph|Dropdown Menu: File -> Open File | GRNsight should lay out a network graph from the Excel, SIF, or GraphML network if there are no errors in the file|
|f2|NO | Load Graph|Dropdown Menu: Demo -> Demo #1 | GRNsight should lay out an unweighted network graph from Demo #1|
|f2|NO | Load Graph|Dropdown Menu: Demo -> Demo #2 | GRNsight should lay out a weighted network graph from Demo #2|
|f2|NO | Load Graph|Dropdown Menu: Demo -> Demo #3 | GRNsight should lay out an unweighted network graph from Demo #3|
|f2|NO | Load Graph|Dropdown Menu: Demo -> Demo #4 | GRNsight should lay out a weighted network graph from Demo #4|
|f3|NO | Dropdown Menu: File -> Reload|Select | The graph should center, zoom to 100%, and reapply the force graph parameters|
|f4|NO | Dropdown Menu: File -> Export Data|Select "To Unweighted SIF" | GRNsight should export an unweighted SIF file from the graph currently loaded|
|f4|NO | Dropdown Menu: File -> Export Data|Select "To Weighted SIF" | GRNsight should export a weighted SIF file from the graph currently loaded|
|f4|NO | Dropdown Menu: File -> Export Data|Select "To Unweighted GraphML" | GRNsight should export an unweighted GraphML file from the graph currently loaded|
|f4|NO | Dropdown Menu: File -> Export Data|Select "To Weighted GraphML" | GRNsight should export a weighted GraphML file from the graph currently loaded|
|f4|NO | Dropdown Menu: File -> Export Data|Select "To Unweighted Excel" | GRNsight should export an unweighted Excel file from the graph currently loaded|
|f4|NO | Dropdown Menu: File -> Export Data|Select "To Weighted Excel" | GRNsight should export a weighted Excel file from the graph currently loaded|
|f5|NO | Dropdown Menu: File -> Export Image|Select "To PNG" | GRNsight should export a PNG image from the graph currently loaded|
|f5|NO | Dropdown Menu: File -> Export Image|Select "To SVG" | GRNsight should export a SVG image from the graph currently loaded|
|f5|NO | Dropdown Menu: File -> Export Image|Select "To PDF" | GRNsight should export a PDF file from the graph currently loaded|
|f6|NO | Dropdown Menu: File -> Print|Select | GRNsight should open the Print Dialogue Box|
|l1|YES | Sidebar Menu: Grid Layout|Keep at Default | The graph should default to force graph layout|
|l1|YES | Sidebar Menu: Grid Layout|Click Grid Layout Button | The graph should change to grid layout|
|l1|YES | Sidebar Menu: Grid Layout|Click Force Graph Layout Button | The graph should change to force graph layout|
|l2|NO | Dropdown Menu: Layout -> Graph Options|Keep at Default | The graph should be in force graph layout by default|
|l2|NO | Dropdown Menu: Layout -> Graph Options|Grid Layout | The graph should apply grid layout|
|l2|NO | Dropdown Menu: Layout -> Graph Options|Force Graph | The graph should apply force graph layout|
|l3|NO | Dropdown Menu: Layout -> Lock Force Graph Parameters|Check "Lock Force Graph Parameters" | The Force Graph Parameter sliders should be disabled.|
|l3|NO | Dropdown Menu: Layout -> Lock Force Graph Parameters|Uncheck "Lock Force Graph Parameters" | The Force Graph Parameter sliders should be enabled.|
|l4|NO | Dropdown Menu: Layout -> Reset Force Graph Parameters|Click "Reset Force Graph Parameters" | The force graph parameters should revert to the default values, if Lock Force Graph Parameters is unchecked|
|l5|NO | Dropdown Menu: Layout -> Undo Reset|Click "Undo Reset" | The force graph parameters should return to the values they had before the Undo Reset button (or menu item) was selected, if Undo Reset is enabled.|
|l6|NO | Dropdown Menu: Layout -> Link Distance|Input Value, then Press Enter |  The graph's edges should visibly change in length to the value entered if Lock Force Graph Parameters is unchecked|
|l7|NO | Dropdown Menu: Layout -> Charge|Input Value, then Press Enter |  The graph's nodes should visibly change it's level of attraction to each other to the value entered if Lock Force Graph Parameters is unchecked|
|l8|NO | Sidebar Menu: Force Graph Parameter Sliders|Keep at Default Values |  The graph should be laid out according to the default values of the force graph parameter sliders|
|l8|NO | Sidebar Menu: Force Graph Parameter Sliders|Decrease Link Distance |  The graph's edges should visibly decrease in length if Lock Force Graph Parameters is unchecked|
|l8|NO | Sidebar Menu: Force Graph Parameter Sliders|Increase Link Distance |  The graph's edges should visibly increase in length if Lock Force Graph Parameters is unchecked|
|l8|NO | Sidebar Menu: Force Graph Parameter Sliders|Increase Charge |  The graph's nodes should visibly increase attraction to each other if Lock Force Graph Parameters is unchecked|
|l8|NO | Sidebar Menu: Force Graph Parameter Sliders|Decrease Charge |  The graph's nodes should visibly decrease attraction to each other if Lock Force Graph Parameters is unchecked|
|l9|NO | Sidebar Menu: Lock Force Graph Parameters Checkbox|Check | The Force Graph Parameter sliders should be disabled.|
|l9|NO | Sidebar Menu: Lock Force Graph Parameters Checkbox|Uncheck | The Force Graph Parameter sliders should be enabled.|
|l10|NO | Sidebar Menu: Reset Force Graph Parameters Button|Click | The Force Graph Parameter sliders should revert to the default values, if Lock Force Graph Parameters is unchecked.|
|l11|NO | Sidebar Menu: Undo Reset Button|Click | The Force Graph Parameter sliders should return to the values they had before the Undo Reset button (or menu item) was selected, if the Undo Reset button is enabled.|
|n1|NO | Sidebar Menu: Top Dataset|Keep Default Selection | The top half of each node should be colored using data from the first expression dataset detected in the input workbook, if expression data sheets are present in input workbook|
|n1|NO | Sidebar Menu: Top Dataset|Select Top Dataset from Dropdown List | The top half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook|
|n2|NO | Dropdown Menu: Node -> Select Top Dataset|Keep Default Selection | The top half of each node should be colored using data from the first expression dataset detected in the input workbook, if expression data sheets are present in input workbook|
|n2|NO | Dropdown Menu: Node -> Select Top Dataset|Check New Top Dataset from Dropdown List | The top half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook|
|n3|NO | Sidebar Menu: Bottom Dataset|Keep Default Selection | The bottom half of each node should be colored using data from the same dataset as the top dataset, if expression data sheets are present in input workbook|
|n3|NO | Sidebar Menu: Bottom Dataset|Select Bottom Dataset from Dropdown List | The bottom half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook|
|n4|NO | Dropdown Menu: Node -> Select Bottom Dataset|Keep Default Selection | The bottom half of each node should be colored using data from the same dataset as the top dataset, if expression data sheets are present in input workbook|
|n4|NO | Dropdown Menu: Node -> Select Bottom Dataset|Check New Bottom Dataset from Dropdown List | The bottom half of each node should be colored using data from the selected dataset, if expression data sheets are present in input workbook|
|n5|NO | Sidebar Menu: Log Fold Change Max Value|Keep Default Value | The node coloring visualization's color intensity should default to having a Log Fold Change Max Value of 3, if expression data sheets are present in input workbook|
|n5|NO | Sidebar Menu: Log Fold Change Max Value|Increase Log Fold Change Max Value | The node coloring visualization's color intensity should decrease, if expression data sheets are present in input workbook|
|n5|NO | Sidebar Menu: Log Fold Change Max Value|Decrease Log Fold Change Max Value | The node coloring visualization's color intensity should increase, if expression data sheets are present in input workbook|
|n6|NO | Dropdown Menu: Node -> Log Fold Change Max Value|Keep Default Value | The node coloring visualization's color intensity should default to having a Log Fold Change Max Value of 3, if expression data sheets are present in input workbook|
|n6|NO | Dropdown Menu: Node -> Log Fold Change Max Value|Increase Log Fold Change Max Value | The node coloring visualization's color intensity should decrease, if expression data sheets are present in input workbook|
|n6|NO | Dropdown Menu: Node -> Log Fold Change Max Value|Decrease Log Fold Change Max Value | The node coloring visualization's color intensity should increase, if expression data sheets are present in input workbook|
|n7|NO | Sidebar Menu: Average Replicates Values (Top Dataset)|Check | GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook|
|n7|NO | Sidebar Menu: Average Replicates Values (Top Dataset)|Uncheck | GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook|
|n8|NO | Dropdown Menu: Node -> Average Replicates Values (Top Dataset)|Check | GRNsight should average replicate values for top dataset, if expression data sheets are present in input workbook|
|n8|NO | Dropdown Menu: Node -> Average Replicates Values (Top Dataset)|Uncheck | GRNsight should not average replicate values for top dataset, if expression data sheets are present in input workbook|
|n9|NO | Sidebar Menu: Average Replicates Values (Bottom Dataset)|Check | GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook|
|n9|NO | Sidebar Menu: Average Replicates Values (Bottom Dataset)|Uncheck | GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook|
|n10|NO | Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset)|Check | GRNsight should average replicate values for bottom dataset, if expression data sheets are present in input workbook|
|n10|NO | Dropdown Menu: Node -> Average Replicates Values (Bottom Dataset)|Uncheck | GRNsight should not average replicate values for bottom dataset, if expression data sheets are present in input workbook|
|n11|NO | Sidebar Menu: Node Coloring Toggle Button|Click |  Node coloring should toggle between on and off, with default being on, if expression data sheets are present in input workbook|
|n12|YES | Dropdown Menu: Node -> Enable Node Coloring|Check |  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should toggle on, if expression data sheets are present in input workbook|
|n12|YES | Dropdown Menu: Node -> Enable Node Coloring|Uncheck |  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should toggle off, if expression data sheets are present in input workbook|
|s1|NO | Dropdown Menu: Species -> Current Species|Select a species |  Opening gene information pages will use information of the selected species.|
|s2|NO | Sidebar Menu: Species -> Current Species|Select a species from a dropdown list |  Opening gene information pages will use information of the selected species.|
|v1|NO | Sidebar Menu: Restrict Graph to Viewport Checkbox|Check | The graph bounding box should always be contained within the viewport.|
|v1|NO | Sidebar Menu: Restrict Graph to Viewport Checkbox|Uncheck | The graph bounding box should be allowed to extend past the viewport|
|v2|NO | Sidebar Menu: Viewport Size|Keep as Detected |  Upon loading or reloading the GRNsight webpage, the viewport size should be automatically detected and set to small, medium, or large, based on the size of the browser window.|
|v2|NO | Sidebar Menu: Viewport Size|Select "Small" |  The viewport size should be set to small|
|v2|NO | Sidebar Menu: Viewport Size|Select "Medium" |  The viewport size should be set to medium|
|v2|NO | Sidebar Menu: Viewport Size|Select "Large" |  The viewport size should be set to large|
|v2|NO | Sidebar Menu: Viewport Size|Select "Fit to Window" |  The viewport size should automatically be set to the size of the browser window|
|v3|YES | Dropdown Menu: View -> Viewport Size|Keep as Detected |  Upon loading or reloading the GRNsight webpage, the viewport size should be automatically detected and set to small, medium, or large, based on the size of the browser window.|
|v3|YES | Dropdown Menu: View -> Viewport Size|Check "Small" |  The viewport size should be set to small|
|v3|YES | Dropdown Menu: View -> Viewport Size|Check "Medium" |  The viewport size should be set to medium|
|v3|YES | Dropdown Menu: View -> Viewport Size|Check "Large" |  The viewport size should be set to large|
|v3|YES | Dropdown Menu: View -> Viewport Size|Check "Fit to Window" |  The viewport size should automatically be set to the size of the browser window|
|v4|YES | Dropdown Menu: View -> Restrict Graph to Viewport|Check | The graph should always be contained within the viewport.|
|v4|YES | Dropdown Menu: View -> Restrict Graph to Viewport|Uncheck | The graph should be allowed to extend past the viewport|
|v5|NO | Dropdown Menu: View -> Zoom|Enter Zoom Value, then Press Enter | The viewport should should zoom according to the value|
|vp1|NO | Viewport Menu: D-Pad Control|Click Right Arrow | The graph should shift to the right|
|vp1|NO | Viewport Menu: D-Pad Control|Click Left Arrow | The graph should shift to the left|
|vp1|NO | Viewport Menu: D-Pad Control|Click Up Arrow | The graph should shift down|
|vp1|NO | Viewport Menu: D-Pad Control|Click Down Arrow | The graph should shift up|
|vp1|NO | Viewport Menu: D-Pad Control|Click Center Button | The graph should move to the center of the bounding box (note that it is not the same thing as the viewport|
|vp2|NO | Viewport Menu: Zoom Slider|Increase Zoom Level | The graph should zoom in (get larger)|
|vp2|NO | Viewport Menu: Zoom Slider|Decrease Zoom Level | The graph should zoom out (get smaller)|
|vp3|NO | Viewport Menu: Node|No Click |  |
|vp3|NO | Viewport Menu: Node|Right Click |  Gene information page should appear in a new tab within the browser.|

## GRNsight Function Availability Table

| GRNsight Function | No Graph Loaded | Weighted Graph Loaded | Unweighted Graph Loaded  | 
|  ---------------- | --------------- | ----------------------- | ---------------------- | 
| Dropdown Menu: Edge -> Enable Edge Coloring Based on Weight Value - Check | YES | YES | YES | 
| Dropdown Menu: Edge -> Enable Edge Coloring Based on Weight Value - Uncheck | YES | YES | YES | 
| Sidebar Menu: Enable Edge Coloring - Check | YES | YES | YES | 
| Sidebar Menu: Enable Edge Coloring - Uncheck | YES | YES | YES | 
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
| Dropdown Menu: Help - Select "Getting Started" | YES | YES | YES | 
| Dropdown Menu: Help - Select "GRNsight Wiki" | YES | YES | YES | 
| Dropdown Menu: Help - Select "About GRNsight" | YES | YES | YES | 
| Load Graph - None | YES | YES | YES | 
| Load Graph - Dropdown Menu: File -> Open File | YES | YES | YES | 
| Load Graph - Dropdown Menu: Demo -> Demo #1 | YES | YES | YES | 
| Load Graph - Dropdown Menu: Demo -> Demo #2 | YES | YES | YES | 
| Load Graph - Dropdown Menu: Demo -> Demo #3 | YES | YES | YES | 
| Load Graph - Dropdown Menu: Demo -> Demo #4 | YES | YES | YES | 
| Dropdown Menu: File -> Reload - Select | NO | YES | YES | 
| Dropdown Menu: File -> Export Data - Select "To Unweighted SIF" | NO | YES | YES | 
| Dropdown Menu: File -> Export Data - Select "To Weighted SIF" | NO | YES | YES | 
| Dropdown Menu: File -> Export Data - Select "To Unweighted GraphML" | NO | YES | YES | 
| Dropdown Menu: File -> Export Data - Select "To Weighted GraphML" | NO | YES | YES | 
| Dropdown Menu: File -> Export Data - Select "To Unweighted Excel" | NO | YES | YES | 
| Dropdown Menu: File -> Export Data - Select "To Weighted Excel" | NO | YES | YES | 
| Dropdown Menu: File -> Export Image - Select "To PNG" | NO | YES | YES | 
| Dropdown Menu: File -> Export Image - Select "To SVG" | NO | YES | YES | 
| Dropdown Menu: File -> Export Image - Select "To PDF" | NO | YES | YES | 
| Dropdown Menu: File -> Print - Select | NO | YES | YES | 
| Sidebar Menu: Grid Layout - Keep at Default | YES | YES | YES | 
| Sidebar Menu: Grid Layout - Click Grid Layout Button | YES | YES | YES | 
| Sidebar Menu: Grid Layout - Click Force Graph Layout Button | YES | YES | YES | 
| Dropdown Menu: Layout -> Graph Options - Keep at Default | NO | YES | YES | 
| Dropdown Menu: Layout -> Graph Options - Grid Layout | NO | YES | YES | 
| Dropdown Menu: Layout -> Graph Options - Force Graph | NO | YES | YES | 
| Dropdown Menu: Layout -> Lock Force Graph Parameters - Check "Lock Force Graph Parameters" | NO | YES | YES | 
| Dropdown Menu: Layout -> Lock Force Graph Parameters - Uncheck "Lock Force Graph Parameters" | NO | YES | YES | 
| Dropdown Menu: Layout -> Reset Force Graph Parameters - Click "Reset Force Graph Parameters" | YES | YES | YES | 
| Dropdown Menu: Layout -> Undo Reset - Click "Undo Reset" | YES | YES | YES | 
| Dropdown Menu: Layout -> Link Distance - Input Value, then Press Enter | YES | YES | YES | 
| Dropdown Menu: Layout -> Charge - Input Value, then Press Enter | YES | YES | YES | 
| Sidebar Menu: Force Graph Parameter Sliders - Keep at Default Values | YES | YES | YES | 
| Sidebar Menu: Force Graph Parameter Sliders - Decrease Link Distance | YES | YES | YES | 
| Sidebar Menu: Force Graph Parameter Sliders - Increase Link Distance | YES | YES | YES | 
| Sidebar Menu: Force Graph Parameter Sliders - Increase Charge | YES | YES | YES | 
| Sidebar Menu: Force Graph Parameter Sliders - Decrease Charge | YES | YES | YES | 
| Sidebar Menu: Lock Force Graph Parameters Checkbox - Check | YES | YES | YES | 
| Sidebar Menu: Lock Force Graph Parameters Checkbox - Uncheck | YES | YES | YES | 
| Sidebar Menu: Reset Force Graph Parameters Button - Click | YES | YES | YES | 
| Sidebar Menu: Undo Reset Button - Click | YES | YES | YES | 
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
| Dropdown Menu: Node -> Enable Node Coloring - Check | NO | YES | YES | 
| Dropdown Menu: Node -> Enable Node Coloring - Uncheck | NO | YES | YES | 
| Dropdown Menu: Species -> Current Species - Select a species | YES | YES | YES | 
| Sidebar Menu: Species -> Current Species - Select a species from a dropdown list | YES | YES | YES | 
| Sidebar Menu: Restrict Graph to Viewport Checkbox - Check | YES | YES | YES | 
| Sidebar Menu: Restrict Graph to Viewport Checkbox - Uncheck | YES | YES | YES | 
| Sidebar Menu: Viewport Size - Keep as Detected | YES | YES | YES | 
| Sidebar Menu: Viewport Size - Select "Small" | YES | YES | YES | 
| Sidebar Menu: Viewport Size - Select "Medium" | YES | YES | YES | 
| Sidebar Menu: Viewport Size - Select "Large" | YES | YES | YES | 
| Sidebar Menu: Viewport Size - Select "Fit to Window" | YES | YES | YES | 
| Dropdown Menu: View -> Viewport Size - Keep as Detected | YES | YES | YES | 
| Dropdown Menu: View -> Viewport Size - Check "Small" | YES | YES | YES | 
| Dropdown Menu: View -> Viewport Size - Check "Medium" | YES | YES | YES | 
| Dropdown Menu: View -> Viewport Size - Check "Large" | YES | YES | YES | 
| Dropdown Menu: View -> Viewport Size - Check "Fit to Window" | YES | YES | YES | 
| Dropdown Menu: View -> Restrict Graph to Viewport - Check | YES | YES | YES | 
| Dropdown Menu: View -> Restrict Graph to Viewport - Uncheck | YES | YES | YES | 
| Dropdown Menu: View -> Zoom - Enter Zoom Value, then Press Enter | NO | YES | YES | 
| Viewport Menu: D-Pad Control - Click Right Arrow | NO | YES | YES | 
| Viewport Menu: D-Pad Control - Click Left Arrow | NO | YES | YES | 
| Viewport Menu: D-Pad Control - Click Up Arrow | NO | YES | YES | 
| Viewport Menu: D-Pad Control - Click Down Arrow | NO | YES | YES | 
| Viewport Menu: D-Pad Control - Click Center Button | NO | YES | YES | 
| Viewport Menu: Zoom Slider - Increase Zoom Level | NO | YES | YES | 
| Viewport Menu: Zoom Slider - Decrease Zoom Level | NO | YES | YES | 
| Viewport Menu: Node - No Click | NO | YES | YES | 
| Viewport Menu: Node - Right Click | NO | YES | YES | 

## Client Side Tests
### Test 1
Instructions:
- Sidebar Menu: Grid Layout - Keep at Default
- Dropdown Menu: Node -> Enable Node Coloring - Check
- Dropdown Menu: View -> Viewport Size - Keep as Detected
- Dropdown Menu: View -> Restrict Graph to Viewport - Check

Results:
- The graph should default to force graph layout
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should toggle on, if expression data sheets are present in input workbook
-  Upon loading or reloading the GRNsight webpage, the viewport size should be automatically detected and set to small, medium, or large, based on the size of the browser window.
- The graph should always be contained within the viewport.

### Test 2
Instructions:
- Sidebar Menu: Grid Layout - Click Grid Layout Button
- Dropdown Menu: Node -> Enable Node Coloring - Check
- Dropdown Menu: View -> Viewport Size - Keep as Detected
- Dropdown Menu: View -> Restrict Graph to Viewport - Check

Results:
- The graph should change to grid layout
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should toggle on, if expression data sheets are present in input workbook
-  Upon loading or reloading the GRNsight webpage, the viewport size should be automatically detected and set to small, medium, or large, based on the size of the browser window.
- The graph should always be contained within the viewport.

### Test 3
Instructions:
- Sidebar Menu: Grid Layout - Click Force Graph Layout Button
- Dropdown Menu: Node -> Enable Node Coloring - Check
- Dropdown Menu: View -> Viewport Size - Keep as Detected
- Dropdown Menu: View -> Restrict Graph to Viewport - Check

Results:
- The graph should change to force graph layout
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should toggle on, if expression data sheets are present in input workbook
-  Upon loading or reloading the GRNsight webpage, the viewport size should be automatically detected and set to small, medium, or large, based on the size of the browser window.
- The graph should always be contained within the viewport.

### Test 4
Instructions:
- Sidebar Menu: Grid Layout - Keep at Default
- Dropdown Menu: Node -> Enable Node Coloring - Uncheck
- Dropdown Menu: View -> Viewport Size - Keep as Detected
- Dropdown Menu: View -> Restrict Graph to Viewport - Check

Results:
- The graph should default to force graph layout
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should toggle off, if expression data sheets are present in input workbook
-  Upon loading or reloading the GRNsight webpage, the viewport size should be automatically detected and set to small, medium, or large, based on the size of the browser window.
- The graph should always be contained within the viewport.

### Test 5
Instructions:
- Sidebar Menu: Grid Layout - Click Grid Layout Button
- Dropdown Menu: Node -> Enable Node Coloring - Uncheck
- Dropdown Menu: View -> Viewport Size - Keep as Detected
- Dropdown Menu: View -> Restrict Graph to Viewport - Check

Results:
- The graph should change to grid layout
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should toggle off, if expression data sheets are present in input workbook
-  Upon loading or reloading the GRNsight webpage, the viewport size should be automatically detected and set to small, medium, or large, based on the size of the browser window.
- The graph should always be contained within the viewport.

### Test 6
Instructions:
- Sidebar Menu: Grid Layout - Click Force Graph Layout Button
- Dropdown Menu: Node -> Enable Node Coloring - Uncheck
- Dropdown Menu: View -> Viewport Size - Keep as Detected
- Dropdown Menu: View -> Restrict Graph to Viewport - Check

Results:
- The graph should change to force graph layout
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should toggle off, if expression data sheets are present in input workbook
-  Upon loading or reloading the GRNsight webpage, the viewport size should be automatically detected and set to small, medium, or large, based on the size of the browser window.
- The graph should always be contained within the viewport.

### Test 7
Instructions:
- Sidebar Menu: Grid Layout - Keep at Default
- Dropdown Menu: Node -> Enable Node Coloring - Check
- Dropdown Menu: View -> Viewport Size - Check "Small"
- Dropdown Menu: View -> Restrict Graph to Viewport - Check

Results:
- The graph should default to force graph layout
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should toggle on, if expression data sheets are present in input workbook
-  The viewport size should be set to small
- The graph should always be contained within the viewport.

### Test 8
Instructions:
- Sidebar Menu: Grid Layout - Click Grid Layout Button
- Dropdown Menu: Node -> Enable Node Coloring - Check
- Dropdown Menu: View -> Viewport Size - Check "Small"
- Dropdown Menu: View -> Restrict Graph to Viewport - Check

Results:
- The graph should change to grid layout
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should toggle on, if expression data sheets are present in input workbook
-  The viewport size should be set to small
- The graph should always be contained within the viewport.

### Test 9
Instructions:
- Sidebar Menu: Grid Layout - Click Force Graph Layout Button
- Dropdown Menu: Node -> Enable Node Coloring - Check
- Dropdown Menu: View -> Viewport Size - Check "Small"
- Dropdown Menu: View -> Restrict Graph to Viewport - Check

Results:
- The graph should change to force graph layout
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should toggle on, if expression data sheets are present in input workbook
-  The viewport size should be set to small
- The graph should always be contained within the viewport.

### Test 10
Instructions:
- Sidebar Menu: Grid Layout - Keep at Default
- Dropdown Menu: Node -> Enable Node Coloring - Uncheck
- Dropdown Menu: View -> Viewport Size - Check "Small"
- Dropdown Menu: View -> Restrict Graph to Viewport - Check

Results:
- The graph should default to force graph layout
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should toggle off, if expression data sheets are present in input workbook
-  The viewport size should be set to small
- The graph should always be contained within the viewport.

### Test 11
Instructions:
- Sidebar Menu: Grid Layout - Click Grid Layout Button
- Dropdown Menu: Node -> Enable Node Coloring - Uncheck
- Dropdown Menu: View -> Viewport Size - Check "Small"
- Dropdown Menu: View -> Restrict Graph to Viewport - Check

Results:
- The graph should change to grid layout
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should toggle off, if expression data sheets are present in input workbook
-  The viewport size should be set to small
- The graph should always be contained within the viewport.

### Test 12
Instructions:
- Sidebar Menu: Grid Layout - Click Force Graph Layout Button
- Dropdown Menu: Node -> Enable Node Coloring - Uncheck
- Dropdown Menu: View -> Viewport Size - Check "Small"
- Dropdown Menu: View -> Restrict Graph to Viewport - Check

Results:
- The graph should change to force graph layout
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should toggle off, if expression data sheets are present in input workbook
-  The viewport size should be set to small
- The graph should always be contained within the viewport.

### Test 13
Instructions:
- Sidebar Menu: Grid Layout - Keep at Default
- Dropdown Menu: Node -> Enable Node Coloring - Check
- Dropdown Menu: View -> Viewport Size - Check "Medium"
- Dropdown Menu: View -> Restrict Graph to Viewport - Check

Results:
- The graph should default to force graph layout
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should toggle on, if expression data sheets are present in input workbook
-  The viewport size should be set to medium
- The graph should always be contained within the viewport.

### Test 14
Instructions:
- Sidebar Menu: Grid Layout - Click Grid Layout Button
- Dropdown Menu: Node -> Enable Node Coloring - Check
- Dropdown Menu: View -> Viewport Size - Check "Medium"
- Dropdown Menu: View -> Restrict Graph to Viewport - Check

Results:
- The graph should change to grid layout
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should toggle on, if expression data sheets are present in input workbook
-  The viewport size should be set to medium
- The graph should always be contained within the viewport.

### Test 15
Instructions:
- Sidebar Menu: Grid Layout - Click Force Graph Layout Button
- Dropdown Menu: Node -> Enable Node Coloring - Check
- Dropdown Menu: View -> Viewport Size - Check "Medium"
- Dropdown Menu: View -> Restrict Graph to Viewport - Check

Results:
- The graph should change to force graph layout
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should toggle on, if expression data sheets are present in input workbook
-  The viewport size should be set to medium
- The graph should always be contained within the viewport.

### Test 16
Instructions:
- Sidebar Menu: Grid Layout - Keep at Default
- Dropdown Menu: Node -> Enable Node Coloring - Uncheck
- Dropdown Menu: View -> Viewport Size - Check "Medium"
- Dropdown Menu: View -> Restrict Graph to Viewport - Check

Results:
- The graph should default to force graph layout
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should toggle off, if expression data sheets are present in input workbook
-  The viewport size should be set to medium
- The graph should always be contained within the viewport.

### Test 17
Instructions:
- Sidebar Menu: Grid Layout - Click Grid Layout Button
- Dropdown Menu: Node -> Enable Node Coloring - Uncheck
- Dropdown Menu: View -> Viewport Size - Check "Medium"
- Dropdown Menu: View -> Restrict Graph to Viewport - Check

Results:
- The graph should change to grid layout
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should toggle off, if expression data sheets are present in input workbook
-  The viewport size should be set to medium
- The graph should always be contained within the viewport.

### Test 18
Instructions:
- Sidebar Menu: Grid Layout - Click Force Graph Layout Button
- Dropdown Menu: Node -> Enable Node Coloring - Uncheck
- Dropdown Menu: View -> Viewport Size - Check "Medium"
- Dropdown Menu: View -> Restrict Graph to Viewport - Check

Results:
- The graph should change to force graph layout
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should toggle off, if expression data sheets are present in input workbook
-  The viewport size should be set to medium
- The graph should always be contained within the viewport.

### Test 19
Instructions:
- Sidebar Menu: Grid Layout - Keep at Default
- Dropdown Menu: Node -> Enable Node Coloring - Check
- Dropdown Menu: View -> Viewport Size - Check "Large"
- Dropdown Menu: View -> Restrict Graph to Viewport - Check

Results:
- The graph should default to force graph layout
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should toggle on, if expression data sheets are present in input workbook
-  The viewport size should be set to large
- The graph should always be contained within the viewport.

### Test 20
Instructions:
- Sidebar Menu: Grid Layout - Click Grid Layout Button
- Dropdown Menu: Node -> Enable Node Coloring - Check
- Dropdown Menu: View -> Viewport Size - Check "Large"
- Dropdown Menu: View -> Restrict Graph to Viewport - Check

Results:
- The graph should change to grid layout
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should toggle on, if expression data sheets are present in input workbook
-  The viewport size should be set to large
- The graph should always be contained within the viewport.

### Test 21
Instructions:
- Sidebar Menu: Grid Layout - Click Force Graph Layout Button
- Dropdown Menu: Node -> Enable Node Coloring - Check
- Dropdown Menu: View -> Viewport Size - Check "Large"
- Dropdown Menu: View -> Restrict Graph to Viewport - Check

Results:
- The graph should change to force graph layout
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should toggle on, if expression data sheets are present in input workbook
-  The viewport size should be set to large
- The graph should always be contained within the viewport.

### Test 22
Instructions:
- Sidebar Menu: Grid Layout - Keep at Default
- Dropdown Menu: Node -> Enable Node Coloring - Uncheck
- Dropdown Menu: View -> Viewport Size - Check "Large"
- Dropdown Menu: View -> Restrict Graph to Viewport - Check

Results:
- The graph should default to force graph layout
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should toggle off, if expression data sheets are present in input workbook
-  The viewport size should be set to large
- The graph should always be contained within the viewport.

### Test 23
Instructions:
- Sidebar Menu: Grid Layout - Click Grid Layout Button
- Dropdown Menu: Node -> Enable Node Coloring - Uncheck
- Dropdown Menu: View -> Viewport Size - Check "Large"
- Dropdown Menu: View -> Restrict Graph to Viewport - Check

Results:
- The graph should change to grid layout
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should toggle off, if expression data sheets are present in input workbook
-  The viewport size should be set to large
- The graph should always be contained within the viewport.

### Test 24
Instructions:
- Sidebar Menu: Grid Layout - Click Force Graph Layout Button
- Dropdown Menu: Node -> Enable Node Coloring - Uncheck
- Dropdown Menu: View -> Viewport Size - Check "Large"
- Dropdown Menu: View -> Restrict Graph to Viewport - Check

Results:
- The graph should change to force graph layout
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should toggle off, if expression data sheets are present in input workbook
-  The viewport size should be set to large
- The graph should always be contained within the viewport.

### Test 25
Instructions:
- Sidebar Menu: Grid Layout - Keep at Default
- Dropdown Menu: Node -> Enable Node Coloring - Check
- Dropdown Menu: View -> Viewport Size - Check "Fit to Window"
- Dropdown Menu: View -> Restrict Graph to Viewport - Check

Results:
- The graph should default to force graph layout
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should toggle on, if expression data sheets are present in input workbook
-  The viewport size should automatically be set to the size of the browser window
- The graph should always be contained within the viewport.

### Test 26
Instructions:
- Sidebar Menu: Grid Layout - Click Grid Layout Button
- Dropdown Menu: Node -> Enable Node Coloring - Check
- Dropdown Menu: View -> Viewport Size - Check "Fit to Window"
- Dropdown Menu: View -> Restrict Graph to Viewport - Check

Results:
- The graph should change to grid layout
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should toggle on, if expression data sheets are present in input workbook
-  The viewport size should automatically be set to the size of the browser window
- The graph should always be contained within the viewport.

### Test 27
Instructions:
- Sidebar Menu: Grid Layout - Click Force Graph Layout Button
- Dropdown Menu: Node -> Enable Node Coloring - Check
- Dropdown Menu: View -> Viewport Size - Check "Fit to Window"
- Dropdown Menu: View -> Restrict Graph to Viewport - Check

Results:
- The graph should change to force graph layout
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should toggle on, if expression data sheets are present in input workbook
-  The viewport size should automatically be set to the size of the browser window
- The graph should always be contained within the viewport.

### Test 28
Instructions:
- Sidebar Menu: Grid Layout - Keep at Default
- Dropdown Menu: Node -> Enable Node Coloring - Uncheck
- Dropdown Menu: View -> Viewport Size - Check "Fit to Window"
- Dropdown Menu: View -> Restrict Graph to Viewport - Check

Results:
- The graph should default to force graph layout
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should toggle off, if expression data sheets are present in input workbook
-  The viewport size should automatically be set to the size of the browser window
- The graph should always be contained within the viewport.

### Test 29
Instructions:
- Sidebar Menu: Grid Layout - Click Grid Layout Button
- Dropdown Menu: Node -> Enable Node Coloring - Uncheck
- Dropdown Menu: View -> Viewport Size - Check "Fit to Window"
- Dropdown Menu: View -> Restrict Graph to Viewport - Check

Results:
- The graph should change to grid layout
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should toggle off, if expression data sheets are present in input workbook
-  The viewport size should automatically be set to the size of the browser window
- The graph should always be contained within the viewport.

### Test 30
Instructions:
- Sidebar Menu: Grid Layout - Click Force Graph Layout Button
- Dropdown Menu: Node -> Enable Node Coloring - Uncheck
- Dropdown Menu: View -> Viewport Size - Check "Fit to Window"
- Dropdown Menu: View -> Restrict Graph to Viewport - Check

Results:
- The graph should change to force graph layout
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should toggle off, if expression data sheets are present in input workbook
-  The viewport size should automatically be set to the size of the browser window
- The graph should always be contained within the viewport.

### Test 31
Instructions:
- Sidebar Menu: Grid Layout - Keep at Default
- Dropdown Menu: Node -> Enable Node Coloring - Check
- Dropdown Menu: View -> Viewport Size - Keep as Detected
- Dropdown Menu: View -> Restrict Graph to Viewport - Uncheck

Results:
- The graph should default to force graph layout
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should toggle on, if expression data sheets are present in input workbook
-  Upon loading or reloading the GRNsight webpage, the viewport size should be automatically detected and set to small, medium, or large, based on the size of the browser window.
- The graph should be allowed to extend past the viewport

### Test 32
Instructions:
- Sidebar Menu: Grid Layout - Click Grid Layout Button
- Dropdown Menu: Node -> Enable Node Coloring - Check
- Dropdown Menu: View -> Viewport Size - Keep as Detected
- Dropdown Menu: View -> Restrict Graph to Viewport - Uncheck

Results:
- The graph should change to grid layout
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should toggle on, if expression data sheets are present in input workbook
-  Upon loading or reloading the GRNsight webpage, the viewport size should be automatically detected and set to small, medium, or large, based on the size of the browser window.
- The graph should be allowed to extend past the viewport

### Test 33
Instructions:
- Sidebar Menu: Grid Layout - Click Force Graph Layout Button
- Dropdown Menu: Node -> Enable Node Coloring - Check
- Dropdown Menu: View -> Viewport Size - Keep as Detected
- Dropdown Menu: View -> Restrict Graph to Viewport - Uncheck

Results:
- The graph should change to force graph layout
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should toggle on, if expression data sheets are present in input workbook
-  Upon loading or reloading the GRNsight webpage, the viewport size should be automatically detected and set to small, medium, or large, based on the size of the browser window.
- The graph should be allowed to extend past the viewport

### Test 34
Instructions:
- Sidebar Menu: Grid Layout - Keep at Default
- Dropdown Menu: Node -> Enable Node Coloring - Uncheck
- Dropdown Menu: View -> Viewport Size - Keep as Detected
- Dropdown Menu: View -> Restrict Graph to Viewport - Uncheck

Results:
- The graph should default to force graph layout
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should toggle off, if expression data sheets are present in input workbook
-  Upon loading or reloading the GRNsight webpage, the viewport size should be automatically detected and set to small, medium, or large, based on the size of the browser window.
- The graph should be allowed to extend past the viewport

### Test 35
Instructions:
- Sidebar Menu: Grid Layout - Click Grid Layout Button
- Dropdown Menu: Node -> Enable Node Coloring - Uncheck
- Dropdown Menu: View -> Viewport Size - Keep as Detected
- Dropdown Menu: View -> Restrict Graph to Viewport - Uncheck

Results:
- The graph should change to grid layout
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should toggle off, if expression data sheets are present in input workbook
-  Upon loading or reloading the GRNsight webpage, the viewport size should be automatically detected and set to small, medium, or large, based on the size of the browser window.
- The graph should be allowed to extend past the viewport

### Test 36
Instructions:
- Sidebar Menu: Grid Layout - Click Force Graph Layout Button
- Dropdown Menu: Node -> Enable Node Coloring - Uncheck
- Dropdown Menu: View -> Viewport Size - Keep as Detected
- Dropdown Menu: View -> Restrict Graph to Viewport - Uncheck

Results:
- The graph should change to force graph layout
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should toggle off, if expression data sheets are present in input workbook
-  Upon loading or reloading the GRNsight webpage, the viewport size should be automatically detected and set to small, medium, or large, based on the size of the browser window.
- The graph should be allowed to extend past the viewport

### Test 37
Instructions:
- Sidebar Menu: Grid Layout - Keep at Default
- Dropdown Menu: Node -> Enable Node Coloring - Check
- Dropdown Menu: View -> Viewport Size - Check "Small"
- Dropdown Menu: View -> Restrict Graph to Viewport - Uncheck

Results:
- The graph should default to force graph layout
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should toggle on, if expression data sheets are present in input workbook
-  The viewport size should be set to small
- The graph should be allowed to extend past the viewport

### Test 38
Instructions:
- Sidebar Menu: Grid Layout - Click Grid Layout Button
- Dropdown Menu: Node -> Enable Node Coloring - Check
- Dropdown Menu: View -> Viewport Size - Check "Small"
- Dropdown Menu: View -> Restrict Graph to Viewport - Uncheck

Results:
- The graph should change to grid layout
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should toggle on, if expression data sheets are present in input workbook
-  The viewport size should be set to small
- The graph should be allowed to extend past the viewport

### Test 39
Instructions:
- Sidebar Menu: Grid Layout - Click Force Graph Layout Button
- Dropdown Menu: Node -> Enable Node Coloring - Check
- Dropdown Menu: View -> Viewport Size - Check "Small"
- Dropdown Menu: View -> Restrict Graph to Viewport - Uncheck

Results:
- The graph should change to force graph layout
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should toggle on, if expression data sheets are present in input workbook
-  The viewport size should be set to small
- The graph should be allowed to extend past the viewport

### Test 40
Instructions:
- Sidebar Menu: Grid Layout - Keep at Default
- Dropdown Menu: Node -> Enable Node Coloring - Uncheck
- Dropdown Menu: View -> Viewport Size - Check "Small"
- Dropdown Menu: View -> Restrict Graph to Viewport - Uncheck

Results:
- The graph should default to force graph layout
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should toggle off, if expression data sheets are present in input workbook
-  The viewport size should be set to small
- The graph should be allowed to extend past the viewport

### Test 41
Instructions:
- Sidebar Menu: Grid Layout - Click Grid Layout Button
- Dropdown Menu: Node -> Enable Node Coloring - Uncheck
- Dropdown Menu: View -> Viewport Size - Check "Small"
- Dropdown Menu: View -> Restrict Graph to Viewport - Uncheck

Results:
- The graph should change to grid layout
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should toggle off, if expression data sheets are present in input workbook
-  The viewport size should be set to small
- The graph should be allowed to extend past the viewport

### Test 42
Instructions:
- Sidebar Menu: Grid Layout - Click Force Graph Layout Button
- Dropdown Menu: Node -> Enable Node Coloring - Uncheck
- Dropdown Menu: View -> Viewport Size - Check "Small"
- Dropdown Menu: View -> Restrict Graph to Viewport - Uncheck

Results:
- The graph should change to force graph layout
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should toggle off, if expression data sheets are present in input workbook
-  The viewport size should be set to small
- The graph should be allowed to extend past the viewport

### Test 43
Instructions:
- Sidebar Menu: Grid Layout - Keep at Default
- Dropdown Menu: Node -> Enable Node Coloring - Check
- Dropdown Menu: View -> Viewport Size - Check "Medium"
- Dropdown Menu: View -> Restrict Graph to Viewport - Uncheck

Results:
- The graph should default to force graph layout
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should toggle on, if expression data sheets are present in input workbook
-  The viewport size should be set to medium
- The graph should be allowed to extend past the viewport

### Test 44
Instructions:
- Sidebar Menu: Grid Layout - Click Grid Layout Button
- Dropdown Menu: Node -> Enable Node Coloring - Check
- Dropdown Menu: View -> Viewport Size - Check "Medium"
- Dropdown Menu: View -> Restrict Graph to Viewport - Uncheck

Results:
- The graph should change to grid layout
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should toggle on, if expression data sheets are present in input workbook
-  The viewport size should be set to medium
- The graph should be allowed to extend past the viewport

### Test 45
Instructions:
- Sidebar Menu: Grid Layout - Click Force Graph Layout Button
- Dropdown Menu: Node -> Enable Node Coloring - Check
- Dropdown Menu: View -> Viewport Size - Check "Medium"
- Dropdown Menu: View -> Restrict Graph to Viewport - Uncheck

Results:
- The graph should change to force graph layout
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should toggle on, if expression data sheets are present in input workbook
-  The viewport size should be set to medium
- The graph should be allowed to extend past the viewport

### Test 46
Instructions:
- Sidebar Menu: Grid Layout - Keep at Default
- Dropdown Menu: Node -> Enable Node Coloring - Uncheck
- Dropdown Menu: View -> Viewport Size - Check "Medium"
- Dropdown Menu: View -> Restrict Graph to Viewport - Uncheck

Results:
- The graph should default to force graph layout
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should toggle off, if expression data sheets are present in input workbook
-  The viewport size should be set to medium
- The graph should be allowed to extend past the viewport

### Test 47
Instructions:
- Sidebar Menu: Grid Layout - Click Grid Layout Button
- Dropdown Menu: Node -> Enable Node Coloring - Uncheck
- Dropdown Menu: View -> Viewport Size - Check "Medium"
- Dropdown Menu: View -> Restrict Graph to Viewport - Uncheck

Results:
- The graph should change to grid layout
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should toggle off, if expression data sheets are present in input workbook
-  The viewport size should be set to medium
- The graph should be allowed to extend past the viewport

### Test 48
Instructions:
- Sidebar Menu: Grid Layout - Click Force Graph Layout Button
- Dropdown Menu: Node -> Enable Node Coloring - Uncheck
- Dropdown Menu: View -> Viewport Size - Check "Medium"
- Dropdown Menu: View -> Restrict Graph to Viewport - Uncheck

Results:
- The graph should change to force graph layout
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should toggle off, if expression data sheets are present in input workbook
-  The viewport size should be set to medium
- The graph should be allowed to extend past the viewport

### Test 49
Instructions:
- Sidebar Menu: Grid Layout - Keep at Default
- Dropdown Menu: Node -> Enable Node Coloring - Check
- Dropdown Menu: View -> Viewport Size - Check "Large"
- Dropdown Menu: View -> Restrict Graph to Viewport - Uncheck

Results:
- The graph should default to force graph layout
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should toggle on, if expression data sheets are present in input workbook
-  The viewport size should be set to large
- The graph should be allowed to extend past the viewport

### Test 50
Instructions:
- Sidebar Menu: Grid Layout - Click Grid Layout Button
- Dropdown Menu: Node -> Enable Node Coloring - Check
- Dropdown Menu: View -> Viewport Size - Check "Large"
- Dropdown Menu: View -> Restrict Graph to Viewport - Uncheck

Results:
- The graph should change to grid layout
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should toggle on, if expression data sheets are present in input workbook
-  The viewport size should be set to large
- The graph should be allowed to extend past the viewport

### Test 51
Instructions:
- Sidebar Menu: Grid Layout - Click Force Graph Layout Button
- Dropdown Menu: Node -> Enable Node Coloring - Check
- Dropdown Menu: View -> Viewport Size - Check "Large"
- Dropdown Menu: View -> Restrict Graph to Viewport - Uncheck

Results:
- The graph should change to force graph layout
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should toggle on, if expression data sheets are present in input workbook
-  The viewport size should be set to large
- The graph should be allowed to extend past the viewport

### Test 52
Instructions:
- Sidebar Menu: Grid Layout - Keep at Default
- Dropdown Menu: Node -> Enable Node Coloring - Uncheck
- Dropdown Menu: View -> Viewport Size - Check "Large"
- Dropdown Menu: View -> Restrict Graph to Viewport - Uncheck

Results:
- The graph should default to force graph layout
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should toggle off, if expression data sheets are present in input workbook
-  The viewport size should be set to large
- The graph should be allowed to extend past the viewport

### Test 53
Instructions:
- Sidebar Menu: Grid Layout - Click Grid Layout Button
- Dropdown Menu: Node -> Enable Node Coloring - Uncheck
- Dropdown Menu: View -> Viewport Size - Check "Large"
- Dropdown Menu: View -> Restrict Graph to Viewport - Uncheck

Results:
- The graph should change to grid layout
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should toggle off, if expression data sheets are present in input workbook
-  The viewport size should be set to large
- The graph should be allowed to extend past the viewport

### Test 54
Instructions:
- Sidebar Menu: Grid Layout - Click Force Graph Layout Button
- Dropdown Menu: Node -> Enable Node Coloring - Uncheck
- Dropdown Menu: View -> Viewport Size - Check "Large"
- Dropdown Menu: View -> Restrict Graph to Viewport - Uncheck

Results:
- The graph should change to force graph layout
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should toggle off, if expression data sheets are present in input workbook
-  The viewport size should be set to large
- The graph should be allowed to extend past the viewport

### Test 55
Instructions:
- Sidebar Menu: Grid Layout - Keep at Default
- Dropdown Menu: Node -> Enable Node Coloring - Check
- Dropdown Menu: View -> Viewport Size - Check "Fit to Window"
- Dropdown Menu: View -> Restrict Graph to Viewport - Uncheck

Results:
- The graph should default to force graph layout
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should toggle on, if expression data sheets are present in input workbook
-  The viewport size should automatically be set to the size of the browser window
- The graph should be allowed to extend past the viewport

### Test 56
Instructions:
- Sidebar Menu: Grid Layout - Click Grid Layout Button
- Dropdown Menu: Node -> Enable Node Coloring - Check
- Dropdown Menu: View -> Viewport Size - Check "Fit to Window"
- Dropdown Menu: View -> Restrict Graph to Viewport - Uncheck

Results:
- The graph should change to grid layout
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should toggle on, if expression data sheets are present in input workbook
-  The viewport size should automatically be set to the size of the browser window
- The graph should be allowed to extend past the viewport

### Test 57
Instructions:
- Sidebar Menu: Grid Layout - Click Force Graph Layout Button
- Dropdown Menu: Node -> Enable Node Coloring - Check
- Dropdown Menu: View -> Viewport Size - Check "Fit to Window"
- Dropdown Menu: View -> Restrict Graph to Viewport - Uncheck

Results:
- The graph should change to force graph layout
-  Node coloring should become enabled, and Node Coloring Toggle Button text in sidebar menu should toggle on, if expression data sheets are present in input workbook
-  The viewport size should automatically be set to the size of the browser window
- The graph should be allowed to extend past the viewport

### Test 58
Instructions:
- Sidebar Menu: Grid Layout - Keep at Default
- Dropdown Menu: Node -> Enable Node Coloring - Uncheck
- Dropdown Menu: View -> Viewport Size - Check "Fit to Window"
- Dropdown Menu: View -> Restrict Graph to Viewport - Uncheck

Results:
- The graph should default to force graph layout
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should toggle off, if expression data sheets are present in input workbook
-  The viewport size should automatically be set to the size of the browser window
- The graph should be allowed to extend past the viewport

### Test 59
Instructions:
- Sidebar Menu: Grid Layout - Click Grid Layout Button
- Dropdown Menu: Node -> Enable Node Coloring - Uncheck
- Dropdown Menu: View -> Viewport Size - Check "Fit to Window"
- Dropdown Menu: View -> Restrict Graph to Viewport - Uncheck

Results:
- The graph should change to grid layout
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should toggle off, if expression data sheets are present in input workbook
-  The viewport size should automatically be set to the size of the browser window
- The graph should be allowed to extend past the viewport

### Test 60
Instructions:
- Sidebar Menu: Grid Layout - Click Force Graph Layout Button
- Dropdown Menu: Node -> Enable Node Coloring - Uncheck
- Dropdown Menu: View -> Viewport Size - Check "Fit to Window"
- Dropdown Menu: View -> Restrict Graph to Viewport - Uncheck

Results:
- The graph should change to force graph layout
-  Node coloring should become disabled, and Node Coloring Toggle Button text in sidebar menu should toggle off, if expression data sheets are present in input workbook
-  The viewport size should automatically be set to the size of the browser window
- The graph should be allowed to extend past the viewport

