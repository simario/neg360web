App.Profile = {
    chart: null,
    chartData: [1,3,5,7],
    createChart: function() {
        var radarChartData = {
            labels: ['CREATING VALUE', 'EMPATHY', 'CLAIMING VALUE', 'ASSERT'],
            datasets: [
                {
                    label: "My Negotiation Profile",
                    fillColor: "rgba(255,159,51,0.2)",
                    strokeColor: "rgba(255,159,51,1)",
                    pointColor: "rgba(255,159,51,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(255,159,51,1)",
                    data: App.Profile.chartData
                }
            ]
        };

        var ctx = $("#canvas").get(0).getContext("2d");
        App.Profile.chart = new Chart(ctx).Radar(radarChartData, {
            responsive: true,
            maintainAspectRatio: false,
            angleLineColor : "rgba(255,255,255,.5)",
            scaleShowLine : false,
            scaleShowLabels : false,
            pointLabelFontSize : 14,
            pointLabelFontColor : "white",
            animationSteps: 200,
            scaleOverride: true,
            scaleSteps: 2,
            scaleStepWidth: 4,
            datasetStrokeWidth : 4,
            pointDotRadius : 4,
            annotateDisplay : true,
            scaleStartValue: 0
        });
    },
    createListeners: function() {
        $('#create').change(function () {
            App.Profile.calc();
        });
        $('#assert').change(function () {
            App.Profile.calc();
        });
        $('#empathy').change(function () {
            App.Profile.calc();
        });
        $('#claim').change(function () {
            App.Profile.calc();
        });
        $('#profileModalSaveButton').on('click', function() {
            App.Profile.save();
        });
    },
    calc: function() {
        var createVal  = parseInt($('#create').val()) || 0;
        var assertVal  = parseInt($('#assert').val()) || 0;
        var empathyVal = parseInt($('#empathy').val()) || 0;
        var claimVal   = parseInt($('#claim').val()) || 0;
        var total = createVal + assertVal + empathyVal + claimVal;
        var footerAlert = $('#profileModalFooterAlert');

        $('#profileTotal').html(total);

        if (total <= 16) {
            footerAlert.hide();
        } else {
            footerAlert.show();
        }
    },
    save: function() {
        var createVal  = parseInt($('#create').val()) || 0;
        var assertVal  = parseInt($('#assert').val()) || 0;
        var empathyVal = parseInt($('#empathy').val()) || 0;
        var claimVal   = parseInt($('#claim').val()) || 0;

        App.Profile.chartData = [createVal, empathyVal, claimVal, assertVal];
        App.Profile.createChart();
    },
    init: function() {
        var footerAlert = $('#profileModalFooterAlert');
        footerAlert.hide();
        App.Profile.createChart();
        App.Profile.createListeners();
    }
};

$(document).ready(function () {
    App.Profile.init();
});