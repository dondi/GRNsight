# Project Proposal
- Eileen Choe & Jen Shin
- January 22, 2018

## Description
GRNsight is a web application and service for visualizing small- to medium-scale gene regulatory networks (GRNs). A GRN consists of genes, transcription factors, and the regulatory connections between them which govern the level of expression of mRNA and protein from genes. GRNsight produces weighted or unweighted network graphs by representing genes as nodes and regulatory connections as edges, with colors, end markers, and thicknesses corresponding to the sign and magnitude of activation or repression.

We will develop two major features for our 402 project: node coloring and block layout.

### Node Coloring
GRNsight was originally designed to accept Excel workbooks seamlessly from GRNmap, a MATLAB GRN modeling program, and lay out the network graph specified by an adjacency matrix contained within a worksheet named “network” or “network_optimized_weights.” However, the GRNmap output contains additional worksheets, which include temporal gene expression data and the results of the GRNmap forward simulation. In GRNsight v3, the Excel spreadsheet importer will be redesigned to read and store data from the entire GRNmap output workbook as a first step towards extending the visualization capabilities of GRNsight. Using the extended capabilities of the importer, a framework will be developed to visualize the gene expression over time, through coloring the nodes in the network graph. The node coloring feature provides a more complete visual representation of the GRN, allowing GRNsight users to better derive insights from the data that model these networks.

### Block layout
In addition, GRNsight v3 will allow the users to display the graph in block layout. Currently GRNsight does not have any options to organize the genes. Users have to manually move the nodes one by one which costs time and effort. There is no way of saving the current position or the layout that the users created manually. This requires the users to repeatedly do the same action even for the same datasheet that they already manually created a layout for. The block layout functionality will lay the nodes in alphabetical order, left to right first, then top to bottom and better display the genes in organized manner. Users can toggle the block layout option by using the menu item on the left. The nodes will be laid out in a grid pattern with even spaces between them. There will be no forces applied, but the nodes can be moved in the normal way afterward. 

GRNsight has been in active development since 2016, and is an ongoing undergraduate research project advised by Dr. Kam Dahlquist (Biology) and Dr. John Dionisio (Computer Science). The end users of GRNsight are biologists seeeking insight into their GRN data.
The GRNsight application http://dondi.github.io/GRNsight/ and code https://github.com/dondi/GRNsight are available under the open source BSD license.

## Justification
We have both been working on GRNsight as undergraduate researchers for over a year, and this project gives us an opportunity to fully develop two major features for GRNsight that will enhance the feature set and user experience of the application. This project will allow us to apply the knowledge we've gained from courses in the LMU Computer Science curriculum such as Interaction Design, Programming Languages, Data Structures, and Computer Graphics. We believe that the scope of the two features we will develop are appropriate for the duration of the semester, and will be challenging as well as interesting.

Block layout is a good feature to develop because it solves the problem that the users are currently having. It helps the users to test and analyze the graph more easily. If the functionality is finished before the semester, other layouts such as hierarchical layout, will be implemented in addition.
