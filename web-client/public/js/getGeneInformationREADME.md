Our Team was tasked with designing the api framework for retrieving the information from the 5 databases through the getGeneInformation function.
This function takes in a gene symbol as a parameter, and returns a deferred jQuery object that ultimately resolves to an object containing the values found from the search. If there is an error in contacting the databases, the function alerts to the main page that an error occurred.

In the function, there were some pieces of data that were requested but ultimately unable to be retrieved through the API endpoints we were tasked with retrieving. These pieces of data are noted in the function with a comment: // Information unavailable via regular API.
