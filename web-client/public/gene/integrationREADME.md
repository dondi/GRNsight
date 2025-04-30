**Blair Hamilton and Zach Van Ysseldyk’s README File**

# General Information

The Integration and Interaction team has implemented a right-click function thats purpose is to open a new tab and produce a gene page with data

brought in from multiple credible databases. The primary goal of our info.js, info.html and api.js files is to bring in the work of the gene database

API team, JASPAR team and the page design team, and produce a working demo of the GRNsight right click function.

# Right-Click Functionality

First, the right click function bridges the original GRNSight existing gene page with the new gene page. The GRNSight gene regulatory map depicts a

relationship between each gene. If a user would like to know more information on one of those genes depicted in the regulatory map, they may do so by

right clicking on that gene.

The following section will delve into the actual code:

-First, the graph.js file contains a function called “dbclick” which refers to the right click functionality.

-Next, the “\_ blank” syntax opens up into a new tab.

-Unfortunately, due to data security concerns, the syntax for opening up a link in a new tab has been taken down from the D3 help page. Because of this, the integration team had to circumnavigate this problem by adding a fake anchor.

-The fake anchor tag in the beginning of the function conceptually creates a fake, temporary landing page for the URL. Once the URL has landed on the anchor, the anchor is taken away via the tempLink.remove() function. Once the landing page has been taken away, the new link can now live on its own.

The link itself is broken up into two parts.

1.The first part is a template URL.

2.The parameter portion refers to the gene name being pulled from the selected right-click node.

# Variable Links

In collaboration with the Page-Design team a layout for specific data points was given to the Interaction team in order to put the correct variable

link with data point in divided tabs.

-For this portion a hreftemplate link was made in the info.js file for each of the five databases in which a generic gene page URL from the respective database can be called upon.

-Next variable links were made between the info.html page classes and api.js API calls in order to produce data on the gene page.
-This can be seen in the info.js file which contains comments representing the different tabs on the gene page.

-Four individual for-loops were created for the frequency matrix in order to account for the difference in data per gene.

    -For example, some yeast genes contain anywhere from 0-15 data points for the frequency matrix involving: A,T,G, and C dna points

-Lastly, the dnaSequence and Gene Map sections are currently empty due to API difficulties in the data retrieval, but currently have a placeholder for when the API call is working.

-All desired data points have received a variable link and a spot in the gene page template. If no data currently shows then it is left blank, but otherwise is functional.
