## 2.0 Software Development Plan

## Table of Contents
2.1 Introduction  

2.1.1 Project Deliverables  

2.2 Project Resources  

2.2.1 Hardware Resources  

2.2.2 Software Resources  

2.3 Project Organization  

2.4 Schedule  

2.4.1 Gantt Chart  

## 2.1 Introduction
This Software Development Plan provides the details of the planned development for the GRNsight application developed as an LMU Senior Project.This application provides a web service which will allow users to generate visualizations of gene regulatory networks derived from uploaded spreadsheets.This application will serve as an update of sorts to the XMLPipeDB program used by the LMU Biological Databases classes in addition to providing an accessible and dynamic visualization tool to general users. In addition to the time spent researching and coding, the development process will include meetings with both the Senior Project class and the professors that requested the application. Additionally, the application will be presented at both the 2014 LMU Undergraduate Research Symposium and during the final presentations for the Senior Project Laboratory.

Major Milestones include:
* 2014-01-21 Project Proposal Due
* 2014-02-11 Requirements Due
* 2014-03-11 Software Development Plan Due
* 2014-03-29 Undergraduate Research Symposium
* 2014-04-15 Final Software Design Description Due
* 2014-05-06 Final Presentations and Demonstrations

### 2.1.1 Project Deliverables
* **Project Proposal**: A general overview of the project goals and justifications. Delivered as an oral presentation and a written summary on 2014-01-21.
* **Requirements Document**: A detailed description of the functionality required by the application. Separated into three sections: the Web Client Requirements, the Server Requirements, and the Visualizer Requirements. Uploaded to the project GitHub wiki on 2014-02-11.
* **Software Development Plan**: This document, detailing the planned development for the project. Includes descriptions of the project organization and scheduling. Uploaded to the project GitHub wiki on 2014-03-11.
* **Final Software Development Plan**: An updated version of the original Software Development Plan revised to reflect the actual development progress of the project. Will be uploaded to the project GitHub page on 2014-04-15
* **Final Presentation**: An oral presentation and demonstration of the finished product. Will contain a Q&A section at the end. Will be delivered the week of 2014-05-06.

## 2.2 Project Resources
This section will detail the various elements used to aid in the completion of the project.

### 2.2.1 Hardware Resources
* A computer for development
* A server to host the application
* A network connection to access the application's website
* A projector for the presentation

### 2.2.2 Software Resources
* A code editor such as Text Wrangler
* A web browser such as Chrome
* D3 for the graph creation
* Node.js for the server framework
* Express to handle HTTP requests
* Node-XLSX to parse spreadsheets
* Cors to handle cross-origin requests
* Multiparty to handle file uploads
* Mocha and Supertest for testing
* Jade to write the web pages
* Stylus to style the web pages
* Git for version controll
* GitHub to host the code repository

## 2.3 Project Organization
This project is divided into three major subsections: a server, a web client, and a visualizer. Early work will focus almost exclusively on the server and the web client. Work on the server and web client will be relatively concurrent as the functionality of both are fairly intertwined.

Once the server and web client are developed, work will shift to the file upload system and then finally to the visualizer and the web pages that will host it. The refinement of the visualization will compose the bulk of the remaining development time, with some time devoted to designing and styling the web pages.

## 2.4 Schedule
This section provides schedule information for the GRNsight project

### 2.4.1 Gantt Chart
![Gantt Chart](http://i.imgur.com/8L53Zch.png)
