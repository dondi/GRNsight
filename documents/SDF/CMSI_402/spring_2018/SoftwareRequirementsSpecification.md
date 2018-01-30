# 5.0 Software Requirements Specification

## 5.1 Introduction
GRNsight is a web application and service for visualizing gene regulatory networks. It consists of two parts: a web client and a server. The web client displays the web page that the user interacts with and allows the user to upload the data. Uploaded data is sent to the server, where it is formatted and processed before being returned to the web client. The web client then draws the data as a graph.

Section 5.2 contains the functional requirements GRNsight should be expected to have. Section 5.3 contains the performance requirements expected of GRNsight. Section 5.4 contains the environment requirements necessary for GRNsight to run.

## 5.2 Functional Requirements
### 5.2.1 Node Coloring

### 5.2.2 Alternate Graph Layout

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
