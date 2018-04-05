# 5.0 Software Requirements Specification

## 5.1 Introduction
GRNsight is a web application and service for visualizing gene regulatory networks. It consists of two parts: a web client and a server. The web client displays the web page that the user interacts with and allows the user to upload the data. Uploaded data is sent to the server, where it is formatted and processed before being returned to the web client. The web client then draws the data as a graph.

Section 5.2 contains the functional requirements GRNsight should be expected to have. Section 5.3 contains the performance requirements expected of GRNsight. Section 5.4 contains the environment requirements necessary for GRNsight to run.

## 5.2 Functional Requirements
Two new features will be added to GRNsight: Node coloring and alternate graph layout.

### 5.2.1 Node Coloring
As a first step towards node coloring, the Excel spreadsheet importer will be redesigned to parse and store data from the entire GRNmap output workbook in a standardized JavaScript Object Notation (JSON) data structure. The complete data extraction from the GRNsight output includes experimental and simulated temporal expression data for each gene in the network. A node coloring framework will be developed to visualize this expression data in the form of a stacked heat map overlay which compares the experimental and simulated gene expression levels over time. 

5.2.1.1 GRNsight Data Structure Redesign.

  - 5.2.1.1.1 The GRNsight Excel spreadsheet parser shall perform a JSON extraction of all sheets detected in the Microsoft Excel workbook.
  - 5.2.1.1.2 The GRNsight Excel spreadsheet parser shall inform the user if syntactic errors are detected.
  - 5.2.1.1.3 The GRNsight Excel spreadsheet parser shall inform the user if semantic errors are detected.
  
5.2.1.2 Node Coloring
  - 5.2.1.2.1 Nodes shall be colored in the network graph in the heatmap style if expression data sheets are detected in the input.
  - 5.2.1.2.2 Node coloring slices shall be subdivided based on the number of experimental timepoints detected.
  - 5.2.1.2.3 Expression data shall be averaged, if multiple data points exist for a gene at a given timepoint.
  - 5.2.1.2.4 The user shall have the option to subdivide the node coloring visualization to display optimized expression data.
  - 5.2.1.2.5 The GRNsight user interface shall provide a node coloring legend to explain the color encoding.

### 5.2.2 Alternate Graph Layout
The alternate graph layout provides the users an option to organize the nodes on the graph, thus making it easier and faster for the users to examen and analyze the data. Snap to grid would be an additional feature if time allows. Hierarcharl Layout will also be implemented if block layout is finished by time.

5.2.2.1 Block Layout
  - 5.2.2.1.1 Block layout shall allow the users to toggle between the force graph and block layouts with an option in the left menu bar.
  - 5.2.2.1.2 Nodes shall be laid out in a grid pattern.
  - 5.2.2.1.3 Nodes shall be equally distribute the nodes with even space to fill the area of the viewport.
  - 5.2.2.1.4 Nodes shall not float or move like with the force graph layout once laid out.
  - 5.2.2.1.5 Nodes shall be laid out in alphabetical order, left to right first, then top to bottom.
  - 5.2.2.1.6 Toggling back and forth shall trigger a graph reload.
  - 5.2.2.1.7 Nodes shall be able to move in the normal way afterward.
  
5.2.2.2 Hieararchal Layout
  - 5.2.2.2.1 Hierararchal layout shall display a structured graph once triggered.


## 5.3 Performance Requirements
### 5.3.1 Processing Return Time

5.3.1.1 The server controller shall take no more than 10 seconds to return processed data.

5.3.1.2 The web client shall take no more than 10 seconds to draw the processed data.

5.3.1.3 The alternate graph layouts shall take no more than 0.5 seconds to rearrange the graph.

## 5.4 Environment Requirements
### 5.4.1 Development

The following chart shows the hardware requirements for GRNsight during development.

|Category|Requirement|
|--------|-----------|
|Processor|Intel Pentium 4 Processor or Later|
|RAM|1 GB|
|Hard Drive Space|2 GB|
|Display|Any|

The following chart shows the software requirements for GRNsight during development.

|Category|Requirement|
|--------|-----------|
|Browser| Chrome 56.0.2924.87 (64-bit) or later; Mozilla Firefox 51.0 (64-bit) or later |
|Operating System|Windows 7 or later; Mac OSX 10.8 or later|
|IDE|Atom, Sublime|

### 5.4.2 Deployment
The following chart shows the hardware requirements for GRNsight during deployment.

|Category|Requirement|
|--------|-----------|
|Processor|Intel Pentium 4 Processor or Later|
|RAM|1 GB|
|Hard Drive Space|2 GB|
|Display|Any|

The following chart shows the software requirements for GRNsight during deployment.

|Category|Requirement|
|--------|-----------|
|Browser| Chrome 56.0.2924.87 (64-bit) or later; Mozilla Firefox 51.0 (64-bit) or later |
|Operating System|Windows 7 or later; Mac OSX 10.8 or later|
|Server Operating System|Ubuntu 14.0.4|
