

| GRNsight Option | Status |  Action | Result | 
| --------------- | ------ | ------- | ------ | 
|Sliders|DISABLED | Keep at Default Values | The graph should configure according to its default values if there is a graph loaded.|
|Sliders|DISABLED | Link Distance Increase | The graph edges should visibly decrease in length if Lock Force Graph Parameters is unchecked and  if there is a graph loaded.|
|Sliders|DISABLED | Link Distance Decrease | The graph edges should visibly increase in length if Lock Force Graph Parameters is unchecked and  if there is a graph loaded.|
|Sliders|DISABLED | Charge Increase | The graph nodes should visibly increase attraction with each other if Lock Force Graph Parameters is unchecked and  if there is a graph loaded.|
|Sliders|DISABLED | Charge Decrease | The graph nodes should visibly decrease attraction with each other if Lock Force Graph Parameters is unchecked and  if there is a graph loaded.|
|Sliders|DISABLED | Charge Distance Increase | The graph nodes should visibly increase charge distance if Lock Force Graph Parameters is unchecked and  if there is a graph loaded.|
|Sliders|DISABLED | Charge Distance Decrease | The graph nodes should visibly decrease charge distance if Lock Force Graph Parameters is unchecked and  if there is a graph loaded.|
|Sliders|DISABLED | Gravity Increase | The graph response to gravity should visibly increase if Lock Force Graph Parameters is unchecked and  if there is a graph loaded.|
|Sliders|DISABLED | Gravity Decrease | The graph response to gravity should visibly decrease if Lock Force Graph Parameters is unchecked and  if there is a graph loaded.|
|File - Print|DISABLED | Click | GRNsight should open the Print Dialogue Box, if there is a graph loaded|
|File - Print|DISABLED | NULL | GRNsight should do nothing|
|Viewport Size|DISABLED | Detected | The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.|
|Viewport Size|DISABLED | Small | The viewport size should be set to small, unless this was the size automatically detected.|
|Viewport Size|DISABLED | Medium | The viewport size should be set to medium, unless this was the size automatically detected.|
|Viewport Size|DISABLED | Large | The viewport size should be set to large, unless this was the size automatically detected.|
|Lock Force Graph Parameters|ENABLED | Checked | The sliders should be disabled.|
|Lock Force Graph Parameters|ENABLED | Unchecked | The sliders should be enabled.|
|Load Graph|ENABLED | None | GRNsight should have no graph in the viewport|
|Load Graph|ENABLED | File Tab - Open Excel Workbook | GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.|
|Load Graph|ENABLED | File Tab - Import SIF | GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.|
|Load Graph|ENABLED | File Tab - Import GraphML | GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.|

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
- The graph should configure according to its default values

## Test 2
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Lock Force Graph Parameters - Checked
- Viewport Size - Detected
- Sliders - Keep at Default Values

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The sliders should be disabled.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The graph should configure according to its default values

## Test 3
Instructions:
- Load Graph - File Tab - Import SIF
- Lock Force Graph Parameters - Checked
- Viewport Size - Detected
- Sliders - Keep at Default Values

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The sliders should be disabled.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The graph should configure according to its default values

## Test 4
Instructions:
- Load Graph - File Tab - Import GraphML
- Lock Force Graph Parameters - Checked
- Viewport Size - Detected
- Sliders - Keep at Default Values

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The sliders should be disabled.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The graph should configure according to its default values

## Test 5
Instructions:
- Load Graph - None
- Lock Force Graph Parameters - Unchecked
- Viewport Size - Detected
- Sliders - Keep at Default Values

Results:
- GRNsight should have no graph in the viewport
- The sliders should be enabled.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The graph should configure according to its default values

## Test 6
Instructions:
- Load Graph - File Tab - Open Excel Workbook
- Lock Force Graph Parameters - Unchecked
- Viewport Size - Detected
- Sliders - Keep at Default Values

Results:
- GRNsight should generate a network graph from the Excel workbook given no warnings or errors are generated.
- The sliders should be enabled.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The graph should configure according to its default values

## Test 7
Instructions:
- Load Graph - File Tab - Import SIF
- Lock Force Graph Parameters - Unchecked
- Viewport Size - Detected
- Sliders - Keep at Default Values

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The sliders should be enabled.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The graph should configure according to its default values

## Test 8
Instructions:
- Load Graph - File Tab - Import GraphML
- Lock Force Graph Parameters - Unchecked
- Viewport Size - Detected
- Sliders - Keep at Default Values

Results:
- GRNsight should generate a network graph from the SIF file given no warnings or errors are generated.
- The sliders should be enabled.
- The viewport size should be automatically detected and set to small, medium, or large, based on the browser window.
- The graph should configure according to its default values

