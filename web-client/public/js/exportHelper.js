export var displayExportExcelModal = function () {
    $("#exportExcelNetwork").html("Select the workbooks export type:");
    $("#exportExcelWeighted").html("Weighted");
    $("#exportExcelUnweighted").html("Unweighted");
    // $("#exportExcelExpressionSheets").html("Select");
    $("#exportExcelExpressionSources").html("Select the Expression Data Source:");
    $("#exportExcelExpressionSource-userInput").html("Workbook Name");
    $("#exportExcelExpressionSource-Dahlquist").html("Dahlquist");
    $("#exportExcelExpressionSource-Kitagawa").html("Kitagawa");
    $("#exportExcelExpressionSource-Thorsen").html("Thorsen");
    $("#exportExcelExpressionSource-Barreto").html("Barreto");
    $("#exportExcelExpressionSheets").html("Select Expression Sheets:");


    $("#exportExcelModal").modal("show");
};
