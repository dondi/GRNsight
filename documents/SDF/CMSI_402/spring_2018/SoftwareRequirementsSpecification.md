# 5.0 Software Requirements Specification

## 5.1 Introduction
GRNsight is a web application and service for visualizing gene regulatory networks. It consists of two parts: a web client and a server. The web client displays the web page that the user interacts with and allows the user to upload the data. Uploaded data is sent to the server, where it is formatted and processed before being returned to the web client. The web client then draws the data as a graph.

Section 5.2 contains the functional requirements GRNsight should be expected to have. Section 5.3 contains the performance requirements expected of GRNsight. Section 5.4 contains the environment requirements necessary for GRNsight to run.

## 5.2 Functional Requirements
GRNsight will be adding two new features: Node coloring and alternate graph layout.

### 5.2.1 Node Coloring

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
