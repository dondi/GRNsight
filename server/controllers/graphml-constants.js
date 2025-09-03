var graphmlErrors = {
    GRAPHML_GENERAL_SYNTAX_ERROR: function (error) {
        return {
            errorCode: "GRAPHML_GENERAL_SYNTAX_ERROR",
            possibleCause:
                "There are a number of things that could've triggered this error, but the general gist" +
                " is that there is something syntactically wrong with your file. The parcer we are using" +
                ' has associated your syntax error with this message: <b>"' +
                error.error +
                '"</b>.<br><br>',
            suggestedFix:
                "Please check the format of your file and make sure that it is in line with our" +
                " Documentation page. Some common errors to check for are <em>missing start/end tags, missing" +
                " quotation marks, and proper spelling of all attribute names</em>.",
        };
    },
    GRAPHML_INVALID_ATTRIBUTE_NAME: function (error) {
        return {
            errorCode: "GRAPHML_INVALID_ATTRIBUTE_NAME",
            possibleCause:
                "With the help of <em>XML2JS</em>, GRNsight has detected that one or more of your " +
                "attribute names is either missing or has an unexpected symbol.<br><br>",
            suggestedFix:
                "Check on <b>line " +
                error.line +
                "</b> at <b>column " +
                error.column +
                "</b>. " +
                'It is possible this error was caused by the following character: "<b>' +
                error.char +
                '</b>". ' +
                "If there doesn't seem to be any syntactic errors here, be sure to check the few surrounding lines " +
                "to make sure that everything is in line with our " +
                '<a href="http:\/\/dondi.github.io/GRNsight/documentation.html" target="_blank">documentation page</a>.',
        };
    },
    GRAPHML_UNMATCHED_CLOSE_TAG: function (error) {
        return {
            errorCode: "GRAPHML_UNMATCHED_CLOSE_TAG",
            possibleCause:
                "With the help of <em>XML2JS</em>, GRNsight has detected that either one or more of your " +
                "opening tags are missing, or you have too many close tags at the end of one of your lines.<br><br>",
            suggestedFix:
                "Check on <b>line " +
                error.line +
                "</b> at <b>column " +
                error.column +
                "</b>. " +
                'It is possible this error was caused by the following character: "<b>' +
                error.char +
                '</b>". ' +
                "If there doesn't seem to be any syntactic errors here, first be sure to check the corresponding opening " +
                "tag for this close tag and then make sure to check the few surrounding lines to make sure that " +
                "everything is in line with our " +
                '<a href="http:\/\/dondi.github.io/GRNsight/documentation.html" target="_blank">documentation page</a>.',
        };
    },
    GRAPHML_MISSING_CLOSE_TAG_AFTER_FORWARD_SLASH: function (error) {
        return {
            errorCode: "GRAPHML_MISSING_CLOSE_TAG_AFTER_FORWARD_SLASH",
            possibleCause:
                "With the help of <em>XML2JS</em>, GRNsight has detected that one or more of your closing " +
                "tags are missing after a forward slash, it is likely that this is corresponding with a node tag.<br><br>",
            suggestedFix:
                "Check on <b>line " +
                error.line +
                "</b> at <b>column " +
                error.column +
                "</b>. " +
                "If there doesn't seem to be any syntactic errors here, check the few surrounding lines to make sure " +
                "that everything is in line with our " +
                '<a href="http:\/\/dondi.github.io/GRNsight/documentation.html" target="_blank">documentation page</a>.',
        };
    },
    GRAPHML_UNFINISHED_CLOSING_TAG: function (error) {
        return {
            errorCode: "GRAPHML_UNFINISHED_CLOSING_TAG",
            possibleCause:
                "With the help of <em>XML2JS</em>, GRNsight has detected that your graph closing " +
                "tag is either misspelled or missing.<br><br>",
            suggestedFix:
                "Check on <b>line " +
                error.line +
                "</b> at <b>column " +
                error.column +
                "</b>. " +
                'It is possible this error was caused by the following character: "<b>' +
                error.char +
                '</b>". ' +
                "The location of this error seems to be sporadic, if there doesn't seem to be any syntactic errors " +
                "here, be sure to check the few surrounding lines to make sure that everything is in line with our " +
                '<a href="http:\/\/dondi.github.io/GRNsight/documentation.html" target="_blank">documentation page</a>.',
        };
    },
    GRAPHML_MISSING_GRAPHML_CLOSE_TAG: function (error) {
        return {
            errorCode: "GRAPHML_MISSING_GRAPHML_CLOSE_TAG",
            possibleCause:
                "With the help of <em>XML2JS</em>, GRNsight has detected that your graphml closing " +
                "tag is either misspelled or missing.<br><br>",
            suggestedFix:
                "Check on <b>line " + error.line + "</b> at <b>column " + error.column + "</b>. ",
        };
    },
    GRAPHML_UNPAIRED_QUOTE: function (error) {
        return {
            errorCode: "GRAPHML_UNPAIRED_QUOTE",
            possibleCause:
                "With the help of <em>XML2JS</em>, GRNsight has detected that one or more of your " +
                "attribute values are missing a closing quote.<br><br>",
            suggestedFix:
                "Check on <b>line " +
                error.line +
                "</b> at <b>column " +
                error.column +
                "</b>. " +
                'It is possible this error was caused by the following character: "<b>' +
                error.char +
                '</b>". ' +
                "If there doesn't seem to be any syntactic errors here, be sure to check the few surrounding lines " +
                "to make sure that everything is in line with our " +
                '<a href="http:\/\/dondi.github.io/GRNsight/documentation.html" target="_blank">documentation page</a>.',
        };
    },
    GRAPHML_INVALID_CHARACTER_IN_NAME: function (error) {
        return {
            errorCode: "GRAPHML_INVALID_CHARACTER_IN_NAME",
            possibleCause:
                "With the help of <em>XML2JS</em>, GRNsight has detected that one or more of your " +
                "tags have an invalid symbol in the name value.<br><br>",
            suggestedFix:
                "Check on <b>line " +
                error.line +
                "</b> at <b>column " +
                error.column +
                "</b>. " +
                'It is possible this error was caused by the following character: "<b>' +
                error.char +
                '</b>". ' +
                "If there doesn't seem to be any syntactic errors here, be sure to check the few surrounding lines " +
                "to make sure that everything is in line with our " +
                '<a href="http:\/\/dondi.github.io/GRNsight/documentation.html" target="_blank">documentation page</a>.',
        };
    },
    GRAPHML_UNENCODED_TAG: function (error) {
        return {
            errorCode: "GRAPHML_UNENCODED_TAG",
            possibleCause:
                "With the help of <em>XML2JS</em>, GRNsight has detected that there are one or more " +
                "extra tags floating somewhere in your file.<br><br>",
            suggestedFix:
                "Check on <b>line " +
                error.line +
                "</b> at <b>column " +
                error.column +
                "</b>. " +
                'It is possible this error was caused by the following character: "<b>' +
                error.char +
                '</b>". ' +
                "If there doesn't seem to be any syntactic errors here, be sure to check the few surrounding lines " +
                "to make sure that everything is in line with our " +
                '<a href="http:\/\/dondi.github.io/GRNsight/documentation.html" target="_blank">documentation page</a>.',
        };
    },
    GRAPHML_INCOMPLETE_CLOSING_TAG: function (error) {
        return {
            errorCode: "GRAPHML_INCOMPLETE_CLOSING_TAG",
            possibleCause:
                "With the help of <em>XML2JS</em>, GRNsight has detected that one or more " +
                "of the closing tags in your file are incomplete. More specifically, it is most likely an " +
                "error with a closing tag formatted as such: " +
                '"&#60;/edge>".<br><br>',
            suggestedFix:
                "Check on <b>line " +
                error.line +
                "</b> at <b>column " +
                error.column +
                "</b>. " +
                'It is possible this error was caused by the following character: "<b>' +
                error.char +
                '</b>". ' +
                "If there doesn't seem to be any syntactic errors here, be sure to check the few surrounding lines " +
                "to make sure that everything is in line with our " +
                '<a href="http:\/\/dondi.github.io/GRNsight/documentation.html" target="_blank">documentation page</a>.',
        };
    },
    GRAPHML_MISSING_OPEN_QUOTE: function (error) {
        return {
            errorCode: "GRAPHML_MISSING_OPEN_QUOTE",
            possibleCause:
                "With the help of <em>XML2JS</em>, GRNsight has detected that one or more " +
                "of the opening quotes in your file are missing.<br><br>",
            suggestedFix:
                "Check on <b>line " +
                error.line +
                "</b> at <b>column " +
                error.column +
                "</b>. " +
                'It is possible this error was caused by the following character: "<b>' +
                error.char +
                '</b>". ' +
                "If there doesn't seem to be any syntactic errors here, be sure to check the few surrounding lines " +
                "to make sure that everything is in line with our " +
                '<a href="http:\/\/dondi.github.io/GRNsight/documentation.html" target="_blank">documentation page</a>.',
        };
    },
};

var errorMessageToGraphmlError = {
    "Invalid attribute name": graphmlErrors.GRAPHML_INVALID_ATTRIBUTE_NAME,
    "Unexpected close tag": graphmlErrors.GRAPHML_UNMATCHED_CLOSE_TAG,
    "Forward-slash in opening tag not followed by >":
        graphmlErrors.GRAPHML_MISSING_CLOSE_TAG_AFTER_FORWARD_SLASH,
    "Invalid tagname in closing tag.": graphmlErrors.GRAPHML_UNFINISHED_CLOSING_TAG,
    "Unclosed root tag": graphmlErrors.GRAPHML_MISSING_GRAPHML_CLOSE_TAG,
    "No whitespace between attributes": graphmlErrors.GRAPHML_UNPAIRED_QUOTE,
    "Invalid character in entity name": graphmlErrors.GRAPHML_INVALID_CHARACTER_IN_NAME,
    "Unencoded <": graphmlErrors.GRAPHML_UNENCODED_TAG,
    "Invalid characters in closing tag": graphmlErrors.GRAPHML_INCOMPLETE_CLOSING_TAG,
    "Unquoted attribute value": graphmlErrors.GRAPHML_MISSING_OPEN_QUOTE,
};

var pairError = function (error) {
    return errorMessageToGraphmlError.hasOwnProperty(error.error)
        ? errorMessageToGraphmlError[error.error](error)
        : graphmlErrors.GRAPHML_GENERAL_SYNTAX_ERROR(error);
};

module.exports = {
    graphmlErrors: graphmlErrors,
    errorMessageToGraphmlError: errorMessageToGraphmlError,
    pairError: pairError,
};
