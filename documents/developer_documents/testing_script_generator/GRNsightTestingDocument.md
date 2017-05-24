

| GRNsight Option | Status |  Action | Result | 
| --------------- | ------ | ------- | ------ | 
|File - Print|DISABLED | Click | GRNsight should open the Print Dialogue Box, if there is a graph loaded|
|File - Export Data|DISABLED | To Unweighted SIF | GRNsight should export an unweighted SIF file from the graph currently loaded, if there is a graph loaded|
|File - Export Data|DISABLED | To Weighted SIF | GRNsight should export an weighted SIF file from the graph currently loaded, if there is a graph loaded|
|File - Export Data|DISABLED | To Unweighted GraphML | GRNsight should export an unweighted GraphML file from the graph currently loaded, if there is a graph loaded|
|File - Export Data|DISABLED | To Weighted GraphML | GRNsight should export an weighted GraphML file from the graph currently loaded, if there is a graph loaded|
|File - Reload|DISABLED | Click | The graph should center, zoom to 100%, and reapply the force graph parameters, if there is a graph loaded|
|Side Bar - Hide/Show Edge Weights|ENABLED | Show With Mouse Over | The edge weight should display when user mouses over an edge.|
|Side Bar - Hide/Show Edge Weights|ENABLED | Always Show Edge Weights | The edge weight should always be visible.|
|Side Bar - Hide/Show Edge Weights|ENABLED | Never Show Edge Weights | The edge weight should not be displayed.|
|Viewport Size|ENABLED | Detected | The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.|
|Viewport Size|ENABLED | Small | The viewport size should be set to small, unless this was the size automatically detected.|
|Viewport Size|ENABLED | Medium | The viewport size should be set to medium, unless this was the size automatically detected.|
|Viewport Size|ENABLED | Large | The viewport size should be set to large, unless this was the size automatically detected.|
|Restrict Graph to Viewport|ENABLED | Checked | The bounding box should always be within the viewport.|
|Restrict Graph to Viewport|ENABLED | Unchecked | The bounding box should be allowed to be past the viewport|
|Undo Reset|ENABLED | Click | The sliders should undo the effects of the reset, if the Undo Reset button is enabled.|
|Reset|ENABLED | Click | The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.|
|Lock Force Graph Parameters|ENABLED | Checked | The sliders should be disabled.|
|Lock Force Graph Parameters|ENABLED | Unchecked | The sliders should be enabled.|
|Sliders|DISABLED | Keep at Default Values | The graph should configure according to its default values if there is a graph loaded.|
|Sliders|DISABLED | Link Distance Increase | The graph edges should visibly decrease in length if Lock Force Graph Parameters is unchecked and  if there is a graph loaded.|
|Sliders|DISABLED | Link Distance Decrease | The graph edges should visibly increase in length if Lock Force Graph Parameters is unchecked and  if there is a graph loaded.|
|Sliders|DISABLED | Charge Increase | The graph nodes should visibly increase attraction with each other if Lock Force Graph Parameters is unchecked and  if there is a graph loaded.|
|Sliders|DISABLED | Charge Decrease | The graph nodes should visibly decrease attraction with each other if Lock Force Graph Parameters is unchecked and  if there is a graph loaded.|
|Sliders|DISABLED | Charge Distance Increase | The graph nodes should visibly increase charge distance if Lock Force Graph Parameters is unchecked and  if there is a graph loaded.|
|Sliders|DISABLED | Charge Distance Decrease | The graph nodes should visibly decrease charge distance if Lock Force Graph Parameters is unchecked and  if there is a graph loaded.|
|Sliders|DISABLED | Gravity Increase | The graph response to gravity should visibly increase if Lock Force Graph Parameters is unchecked and  if there is a graph loaded.|
|Sliders|DISABLED | Gravity Decrease | The graph response to gravity should visibly decrease if Lock Force Graph Parameters is unchecked and  if there is a graph loaded.|
|Load Graph|ENABLED | None | GRNsight should have no graph in the viewport|
|Load Graph|ENABLED | File Tab - Open Excel Workbook | GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.|
|Load Graph|ENABLED | File Tab - Import SIF | GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.|
|Load Graph|ENABLED | File Tab - Import GraphML | GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.|

## Test 1
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 2
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 3
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 4
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 5
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 6
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 7
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 8
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 9
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 10
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 11
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 12
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 13
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 14
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 15
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 16
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 17
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 18
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 19
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 20
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 21
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 22
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 23
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 24
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 25
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 26
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 27
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 28
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 29
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 30
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 31
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 32
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 33
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 34
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 35
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 36
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 37
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 38
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 39
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 40
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 41
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 42
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 43
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 44
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 45
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 46
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 47
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 48
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 49
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 50
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 51
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 52
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 53
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 54
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 55
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 56
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 57
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 58
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 59
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 60
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 61
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 62
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 63
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 64
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should display when user mouses over an edge.

## Test 65
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 66
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 67
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 68
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 69
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 70
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 71
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 72
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 73
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 74
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 75
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 76
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 77
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 78
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 79
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 80
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 81
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 82
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 83
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 84
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 85
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 86
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 87
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 88
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 89
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 90
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 91
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 92
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 93
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 94
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 95
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 96
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 97
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 98
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 99
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 100
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 101
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 102
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 103
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 104
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 105
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 106
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 107
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 108
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 109
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 110
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 111
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 112
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 113
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 114
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 115
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 116
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 117
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 118
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 119
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 120
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 121
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 122
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 123
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 124
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 125
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 126
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 127
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 128
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 129
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 130
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 131
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 132
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 133
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 134
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 135
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 136
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 137
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 138
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 139
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 140
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 141
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 142
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 143
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 144
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 145
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 146
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 147
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 148
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 149
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 150
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 151
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 152
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 153
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 154
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 155
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 156
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 157
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 158
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 159
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 160
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 161
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 162
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 163
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 164
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 165
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 166
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 167
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 168
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 169
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 170
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 171
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 172
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 173
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 174
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 175
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 176
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 177
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 178
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 179
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 180
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 181
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 182
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 183
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 184
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 185
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 186
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 187
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 188
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 189
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 190
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 191
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 192
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 193
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 194
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 195
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 196
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 197
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 198
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 199
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 200
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 201
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 202
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 203
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 204
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 205
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 206
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 207
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 208
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 209
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 210
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 211
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 212
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 213
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 214
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 215
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 216
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 217
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 218
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 219
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 220
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 221
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 222
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 223
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 224
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 225
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 226
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 227
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 228
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 229
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 230
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 231
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 232
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 233
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 234
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 235
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 236
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 237
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 238
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 239
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 240
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 241
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 242
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 243
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 244
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 245
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 246
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 247
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 248
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 249
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 250
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 251
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 252
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 253
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 254
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 255
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 256
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Show With Mouse Over

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should display when user mouses over an edge.

## Test 257
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 258
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 259
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 260
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 261
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 262
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 263
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 264
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 265
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 266
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 267
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 268
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 269
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 270
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 271
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 272
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 273
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 274
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 275
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 276
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 277
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 278
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 279
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 280
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 281
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 282
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 283
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 284
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 285
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 286
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 287
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 288
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 289
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 290
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 291
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 292
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 293
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 294
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 295
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 296
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 297
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 298
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 299
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 300
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 301
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 302
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 303
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 304
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 305
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 306
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 307
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 308
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 309
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 310
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 311
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 312
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 313
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 314
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 315
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 316
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 317
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 318
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 319
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 320
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should always be visible.

## Test 321
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 322
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 323
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 324
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 325
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 326
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 327
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 328
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 329
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 330
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 331
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 332
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 333
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 334
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 335
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 336
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 337
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 338
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 339
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 340
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 341
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 342
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 343
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 344
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 345
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 346
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 347
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 348
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 349
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 350
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 351
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 352
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 353
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 354
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 355
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 356
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 357
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 358
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 359
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 360
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 361
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 362
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 363
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 364
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 365
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 366
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 367
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 368
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 369
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 370
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 371
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 372
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 373
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 374
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 375
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 376
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 377
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 378
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 379
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 380
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 381
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 382
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 383
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 384
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 385
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 386
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 387
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 388
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 389
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 390
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 391
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 392
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 393
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 394
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 395
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 396
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 397
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 398
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 399
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 400
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 401
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 402
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 403
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 404
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 405
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 406
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 407
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 408
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 409
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 410
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 411
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 412
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 413
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 414
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 415
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 416
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 417
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 418
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 419
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 420
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 421
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 422
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 423
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 424
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 425
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 426
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 427
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 428
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 429
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 430
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 431
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 432
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 433
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 434
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 435
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 436
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 437
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 438
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 439
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 440
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 441
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 442
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 443
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 444
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 445
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 446
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 447
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 448
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 449
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 450
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 451
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 452
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 453
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 454
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 455
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 456
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 457
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 458
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 459
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 460
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 461
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 462
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 463
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 464
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 465
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 466
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 467
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 468
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 469
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 470
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 471
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 472
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 473
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 474
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 475
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 476
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 477
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 478
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 479
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 480
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 481
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 482
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 483
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 484
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 485
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 486
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 487
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 488
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 489
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 490
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 491
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 492
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 493
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 494
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 495
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 496
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 497
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 498
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 499
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 500
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 501
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 502
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 503
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 504
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 505
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 506
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 507
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 508
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 509
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 510
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 511
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 512
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Always Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should always be visible.

## Test 513
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 514
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 515
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 516
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 517
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 518
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 519
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 520
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 521
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 522
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 523
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 524
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 525
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 526
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 527
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 528
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 529
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 530
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 531
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 532
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 533
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 534
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 535
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 536
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 537
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 538
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 539
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 540
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 541
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 542
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 543
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 544
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Checked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should always be within the viewport.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 545
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 546
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 547
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 548
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 549
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 550
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 551
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 552
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 553
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 554
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 555
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 556
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 557
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 558
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 559
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 560
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 561
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 562
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 563
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 564
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 565
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 566
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 567
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 568
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 569
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 570
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 571
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 572
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 573
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 574
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 575
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 576
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Detected
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The edge weight should not be displayed.

## Test 577
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 578
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 579
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 580
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 581
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 582
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 583
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 584
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 585
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 586
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 587
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 588
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 589
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 590
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 591
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 592
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 593
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 594
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 595
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 596
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 597
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 598
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 599
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 600
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 601
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 602
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 603
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 604
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 605
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 606
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 607
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 608
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Checked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 609
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 610
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 611
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 612
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 613
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 614
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 615
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 616
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 617
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 618
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 619
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 620
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 621
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 622
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 623
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 624
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 625
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 626
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 627
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 628
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 629
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 630
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 631
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 632
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 633
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 634
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 635
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 636
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 637
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 638
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 639
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 640
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Small
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to small, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 641
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 642
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 643
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 644
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 645
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 646
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 647
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 648
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 649
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 650
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 651
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 652
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 653
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 654
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 655
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 656
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 657
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 658
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 659
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 660
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 661
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 662
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 663
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 664
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 665
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 666
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 667
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 668
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 669
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 670
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 671
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 672
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Checked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 673
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 674
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 675
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 676
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 677
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 678
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 679
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 680
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 681
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 682
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 683
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 684
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 685
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 686
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 687
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 688
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 689
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 690
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 691
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 692
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 693
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 694
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 695
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 696
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 697
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 698
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 699
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 700
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 701
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 702
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 703
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 704
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Medium
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to medium, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 705
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 706
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 707
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 708
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 709
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 710
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 711
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 712
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 713
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 714
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 715
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 716
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 717
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 718
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 719
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 720
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 721
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 722
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 723
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 724
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 725
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 726
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 727
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 728
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 729
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 730
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 731
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 732
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 733
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 734
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 735
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 736
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Checked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should always be within the viewport.
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 737
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 738
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 739
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 740
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 741
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 742
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 743
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 744
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 745
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 746
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 747
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 748
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 749
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 750
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 751
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 752
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Undo Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should undo the effects of the reset, if the Undo Reset button is enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 753
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 754
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 755
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 756
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 757
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 758
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 759
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 760
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Reset - Click
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The sliders should revert to its original configuration, if Lock Force Graph Parameters is unchecked.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 761
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 762
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 763
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 764
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Checked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be disabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 765
Instructions:
- Load Graph - None
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should have no graph in the viewport
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 766
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 767
Instructions:
- Load Graph - File Tab - Import SIF
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

## Test 768
Instructions:
- Load Graph - File Tab - Import GraphML
- Sliders - Keep at Default Values
- Lock Force Graph Parameters - Unchecked
- Restrict Graph to Viewport - Unchecked
- Viewport Size - Large
- Side Bar - Hide/Show Edge Weights - Never Show Edge Weights

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The graph should configure according to its default values
- The sliders should be enabled.
- The bounding box should be allowed to be past the viewport
- The viewport size should be set to large, unless this was the size automatically detected.
- The edge weight should not be displayed.

