

| GRNsight Option | Status |  Action | Result | 
| --------------- | ------ | ------- | ------ | 
|Sliders|ENABLED | Keep at Default Values | The graph should configure according to its default values if there is a graph loaded.|
|Sliders|ENABLED | Link Distance Increase | The graph edges should visibly decrease in length if Lock Force Graph Parameters is unchecked and  if there is a graph loaded.|
|Sliders|ENABLED | Link Distance Decrease | The graph edges should visibly increase in length if Lock Force Graph Parameters is unchecked and  if there is a graph loaded.|
|Sliders|ENABLED | Charge Increase | The graph nodes should visibly increase attraction with each other if Lock Force Graph Parameters is unchecked and  if there is a graph loaded.|
|Sliders|ENABLED | Charge Decrease | The graph nodes should visibly decrease attraction with each other if Lock Force Graph Parameters is unchecked and  if there is a graph loaded.|
|Sliders|ENABLED | Charge Distance Increase | The graph nodes should visibly increase charge distance if Lock Force Graph Parameters is unchecked and  if there is a graph loaded.|
|Sliders|ENABLED | Charge Distance Decrease | The graph nodes should visibly decrease charge distance if Lock Force Graph Parameters is unchecked and  if there is a graph loaded.|
|Sliders|ENABLED | Gravity Increase | The graph response to gravity should visibly increase if Lock Force Graph Parameters is unchecked and  if there is a graph loaded.|
|Sliders|ENABLED | Gravity Decrease | The graph response to gravity should visibly decrease if Lock Force Graph Parameters is unchecked and  if there is a graph loaded.|
|File - Print|DISABLED | Click | GRNsight should open the Print Dialogue Box, if there is a graph loaded|
|Viewport Size|DISABLED | Detected | The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.|
|Viewport Size|DISABLED | Small | The viewport size should be set to small, unless this was the size automatically detected.|
|Viewport Size|DISABLED | Medium | The viewport size should be set to medium, unless this was the size automatically detected.|
|Viewport Size|DISABLED | Large | The viewport size should be set to large, unless this was the size automatically detected.|
|Lock Force Graph Parameters|ENABLED | Checked | The sliders should be disabled.|
|Lock Force Graph Parameters|ENABLED | Unchecked | The sliders should be enabled.|
|Load Graph|DISABLED | None | GRNsight should have no graph in the viewport|
|Load Graph|DISABLED | File Tab - Open Excel Workbook | GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.|
|Load Graph|DISABLED | File Tab - Import SIF | GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.|
|Load Graph|DISABLED | File Tab - Import GraphML | GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.|

## Test 1
Instructions:
- Load Graph - None
- Lock Force Graph Parameters - Checked
- Viewport Size - Detected
- Sliders - Keep at Default Values

Results:
- GRNsight should have no graph in the viewport
- The sliders should be disabled.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The graph should configure according to its default values if there is a graph loaded.

## Test 2
Instructions:
- Load Graph - None
- Lock Force Graph Parameters - Unchecked
- Viewport Size - Detected
- Sliders - Keep at Default Values

Results:
- GRNsight should have no graph in the viewport
- The sliders should be enabled.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The graph should configure according to its default values if there is a graph loaded.

## Test 3
Instructions:
- Load Graph - None
- Lock Force Graph Parameters - Checked
- Viewport Size - Detected
- Sliders - Link Distance Increase

Results:
- GRNsight should have no graph in the viewport
- The sliders should be disabled.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The graph edges should visibly decrease in length if Lock Force Graph Parameters is unchecked and  if there is a graph loaded.

## Test 4
Instructions:
- Load Graph - None
- Lock Force Graph Parameters - Unchecked
- Viewport Size - Detected
- Sliders - Link Distance Increase

Results:
- GRNsight should have no graph in the viewport
- The sliders should be enabled.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The graph edges should visibly decrease in length if Lock Force Graph Parameters is unchecked and  if there is a graph loaded.

## Test 5
Instructions:
- Load Graph - None
- Lock Force Graph Parameters - Checked
- Viewport Size - Detected
- Sliders - Link Distance Decrease

Results:
- GRNsight should have no graph in the viewport
- The sliders should be disabled.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The graph edges should visibly increase in length if Lock Force Graph Parameters is unchecked and  if there is a graph loaded.

## Test 6
Instructions:
- Load Graph - None
- Lock Force Graph Parameters - Unchecked
- Viewport Size - Detected
- Sliders - Link Distance Decrease

Results:
- GRNsight should have no graph in the viewport
- The sliders should be enabled.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The graph edges should visibly increase in length if Lock Force Graph Parameters is unchecked and  if there is a graph loaded.

## Test 7
Instructions:
- Load Graph - None
- Lock Force Graph Parameters - Checked
- Viewport Size - Detected
- Sliders - Charge Increase

Results:
- GRNsight should have no graph in the viewport
- The sliders should be disabled.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The graph nodes should visibly increase attraction with each other if Lock Force Graph Parameters is unchecked and  if there is a graph loaded.

## Test 8
Instructions:
- Load Graph - None
- Lock Force Graph Parameters - Unchecked
- Viewport Size - Detected
- Sliders - Charge Increase

Results:
- GRNsight should have no graph in the viewport
- The sliders should be enabled.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The graph nodes should visibly increase attraction with each other if Lock Force Graph Parameters is unchecked and  if there is a graph loaded.

## Test 9
Instructions:
- Load Graph - None
- Lock Force Graph Parameters - Checked
- Viewport Size - Detected
- Sliders - Charge Decrease

Results:
- GRNsight should have no graph in the viewport
- The sliders should be disabled.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The graph nodes should visibly decrease attraction with each other if Lock Force Graph Parameters is unchecked and  if there is a graph loaded.

## Test 10
Instructions:
- Load Graph - None
- Lock Force Graph Parameters - Unchecked
- Viewport Size - Detected
- Sliders - Charge Decrease

Results:
- GRNsight should have no graph in the viewport
- The sliders should be enabled.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The graph nodes should visibly decrease attraction with each other if Lock Force Graph Parameters is unchecked and  if there is a graph loaded.

## Test 11
Instructions:
- Load Graph - None
- Lock Force Graph Parameters - Checked
- Viewport Size - Detected
- Sliders - Charge Distance Increase

Results:
- GRNsight should have no graph in the viewport
- The sliders should be disabled.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The graph nodes should visibly increase charge distance if Lock Force Graph Parameters is unchecked and  if there is a graph loaded.

## Test 12
Instructions:
- Load Graph - None
- Lock Force Graph Parameters - Unchecked
- Viewport Size - Detected
- Sliders - Charge Distance Increase

Results:
- GRNsight should have no graph in the viewport
- The sliders should be enabled.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The graph nodes should visibly increase charge distance if Lock Force Graph Parameters is unchecked and  if there is a graph loaded.

## Test 13
Instructions:
- Load Graph - None
- Lock Force Graph Parameters - Checked
- Viewport Size - Detected
- Sliders - Charge Distance Decrease

Results:
- GRNsight should have no graph in the viewport
- The sliders should be disabled.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The graph nodes should visibly decrease charge distance if Lock Force Graph Parameters is unchecked and  if there is a graph loaded.

## Test 14
Instructions:
- Load Graph - None
- Lock Force Graph Parameters - Unchecked
- Viewport Size - Detected
- Sliders - Charge Distance Decrease

Results:
- GRNsight should have no graph in the viewport
- The sliders should be enabled.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The graph nodes should visibly decrease charge distance if Lock Force Graph Parameters is unchecked and  if there is a graph loaded.

## Test 15
Instructions:
- Load Graph - None
- Lock Force Graph Parameters - Checked
- Viewport Size - Detected
- Sliders - Gravity Increase

Results:
- GRNsight should have no graph in the viewport
- The sliders should be disabled.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The graph response to gravity should visibly increase if Lock Force Graph Parameters is unchecked and  if there is a graph loaded.

## Test 16
Instructions:
- Load Graph - None
- Lock Force Graph Parameters - Unchecked
- Viewport Size - Detected
- Sliders - Gravity Increase

Results:
- GRNsight should have no graph in the viewport
- The sliders should be enabled.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The graph response to gravity should visibly increase if Lock Force Graph Parameters is unchecked and  if there is a graph loaded.

## Test 17
Instructions:
- Load Graph - None
- Lock Force Graph Parameters - Checked
- Viewport Size - Detected
- Sliders - Gravity Decrease

Results:
- GRNsight should have no graph in the viewport
- The sliders should be disabled.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The graph response to gravity should visibly decrease if Lock Force Graph Parameters is unchecked and  if there is a graph loaded.

## Test 18
Instructions:
- Load Graph - None
- Lock Force Graph Parameters - Unchecked
- Viewport Size - Detected
- Sliders - Gravity Decrease

Results:
- GRNsight should have no graph in the viewport
- The sliders should be enabled.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The graph response to gravity should visibly decrease if Lock Force Graph Parameters is unchecked and  if there is a graph loaded.

