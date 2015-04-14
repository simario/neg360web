App.BestPractices = {

    createCharts: function() {
        $("#agreeCanvasContainer").empty();
        $("#importanceCanvasContainer").empty();
        $("#typeCanvasContainer").empty();

        $("#agreeCanvasContainer").append('<canvas id="agree-canvas" width="150" height="150" ></canvas>');
        $("#importanceCanvasContainer").append('<canvas id="importance-canvas" width="150" height="150"></canvas>');
        $("#typeCanvasContainer").append('<canvas id="type-canvas" width="150" height="150" style="text-align: left"></canvas>');

        var agreementPieData = [
            {
                value: 1 + App.Scorecard.agreementYes,
                color: "#2ee478",
                highlight: "#58E993",
                title: "Yes",
            },
            {
                value: 1 + App.Scorecard.agreementNo,
                color:"#DF5353",
                highlight: "#E57575",
                title: "No"
            },
            {
                value: App.Scorecard.agreementNotYet,
                color:"#ff9f33",
                highlight: "#FFB25C",
                title: "Not Yet"
            }
        ];

        var typePieData = 	[
            {
                value: 1  + App.Scorecard.typeProOut,
                color:"#ff9f33",
                highlight: "#FFB25C",
                title: "Prof(Outside)",
            },
            {
                value: 1 + App.Scorecard.typeProColl,
                color: "#445ae1",
                highlight: "#697BE7",
                title: "Prof(Inside)"
            },
            {
                value: App.Scorecard.typePersonal,
                color: "#2ee478",
                highlight: "#58E993",
                title: "Personal"
            },
            {
                value: App.Scorecard.typeComm,
                color:"#DF5353",
                highlight: "#E57575",
                title: "Community"
            },
            {
                value: App.Scorecard.typeFam,
                color: "#aaeeee",
                highlight: "#BBF1F1",
                title: "Family"
            }
        ];

        var importanceBarData = {
            labels : [1,2,3],
            datasets : [
                {
                    title : "Importance",
                    fillColor : "#ff9f33",
                    strokeColor : "#ff9f33",
                    highlightFill: "#FFB25C",
                    highlightStroke: "#FFB25C",
                    data : [40, App.Scorecard.importance, 70]
                },
                {
                    title : "Satisfaction",
                    fillColor : "#445ae1",
                    strokeColor : "#445ae1",
                    highlightFill : "#697BE7",
                    highlightStroke : "#697BE7",
                    data : [50, App.Scorecard.satisfaction,40]
                }
            ]

        };

        var agree = document.getElementById("agree-canvas").getContext("2d");
        window.myAgreePieChart = new Chart(agree).Pie(agreementPieData,{
            responsive: true,
            animateScale : false,
            maintainAspectRatio: true,
            animateRotate : true,
            animateScale : false,
            animationByData : false,
            animationSteps : 200,
            legend : true,
            animationEasing: "linear",
            annotateDisplay : true
        });
        var type = document.getElementById("type-canvas").getContext("2d");
        window.myTypePieChart = new Chart(type).Pie(typePieData,{
            responsive: true,
            animateScale : false,
            maintainAspectRatio: true,
            animateRotate : true,
            animateScale : false,
            animationByData : false,
            animationSteps : 200,
            legend : true,
            animationEasing: "linear",
            annotateDisplay : true
        });
        var importance = document.getElementById("importance-canvas").getContext("2d");
        window.myImportanceBarChart = new Chart(importance).Bar(importanceBarData,{
            responsive: true,
            maintainAspectRatio: true,
            scaleOverride: true,
            scaleSteps: 5,
            scaleStepWidth: 20,
            scaleStartValue: 0,
            animationSteps : 200,
            legend : true,
            inGraphDataShow : true,
            annotateDisplay : true
        });

        /*
         var agreelegend = window.myAgreePieChart.generateLegend();
         $("#agreelegend").html(agreelegend);

         var typelegend = window.myTypePieChart.generateLegend();
         $("#typelegend").html(typelegend);

         var importancelegend = window.myImportanceBarChart.generateLegend();
         $("#importancelegend").html(importancelegend);
         */
    },
    update: function() {
        App.BestPractices.createCharts();
    },
    init: function() {
        this.createCharts();
    }
};

$(document).ready(function () {
    App.BestPractices.init();
});