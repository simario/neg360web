App.Profile = {
    chart: null,
    chartData: [1,3,5,7],
    types: {},
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

        $("#profileChartContainer").empty();
        $("#profileChartContainer").append('<canvas id="canvas" width="300" height="250"></canvas>');
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
        $('#profileModalSaveButton').on('click', function(event) {
            App.Profile.save(event);
        });
    },
    createType: function(title, create, assert, empathy, claim, description) {
        return {
            title: title,
            create: create,
            assert: assert,
            empathy: empathy,
            claim: claim,
            description: description
        }
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
    save: function(event) {
        var createVal  = parseInt($('#create').val()) || 0;
        var assertVal  = parseInt($('#assert').val()) || 0;
        var empathyVal = parseInt($('#empathy').val()) || 0;
        var claimVal   = parseInt($('#claim').val()) || 0;
        var total = createVal + assertVal + empathyVal + claimVal;
        if(total === 16) {
            var lowest = 100;
            var type = null;
            for (var i = 0; i < App.Profile.types.length; i++) {
                var createCentroid  = App.Profile.types[i].create;
                var assertCentroid  = App.Profile.types[i].assert;
                var empathyCentroid = App.Profile.types[i].empathy;
                var claimCentroid   = App.Profile.types[i].claim;

                var dist = Math.sqrt(
                    Math.pow((createVal - createCentroid), 2) +
                    Math.pow((assertVal - assertCentroid), 2) +
                    Math.pow((empathyVal - empathyCentroid), 2) +
                    Math.pow((claimVal - claimCentroid), 2)
                );
                if (dist < lowest) {
                    lowest = dist;
                    type = App.Profile.types[i];
                }
            }

            $('#profileDescription').html(type.description);
            App.Profile.chartData = [createVal, empathyVal, claimVal, assertVal];
            App.Profile.createChart();
        } else {
            event.preventDefault();
            event.stopImmediatePropagation();

            alert('Remember, numbers must sum to 16. Please try again.');
        }


    },
    init: function() {
        var footerAlert = $('#profileModalFooterAlert');
        footerAlert.hide();

        App.Profile.types = [
            App.Profile.createType('Relational Negotiator', 3.222857143, 4.64, 5.382857143, 2.754285714,
            'The ratings you entered most closely match those of Relational Negotiator. You are more confident about your interpersonal skills (self-advocacy and empathy) than most people are. But you are less sure about how well you do in regard to creating value and claiming your share of it.'),
            App.Profile.createType('Empathetic Value-Creator', 4.861538462, 2.77948718, 5.528205128, 2.830769231,
            'The ratings you entered most closely match those of Empathetic Value-Creator. Your relative confidence about understanding other parties’ motivations and feelings is coupled with confidence about finding value-creating solutions.'),
            App.Profile.createType('Outcome-Focused Negotiator', 4.756363636, 3.403636364, 3.636363636, 4.203636364,
            'The ratings you entered most closely match those of Outcome-Focused Negotiator. You have greater confidence than most people about creating value in negotiation and claiming your share of it.'),
            App.Profile.createType('Assertive Value-Claimer', 2.542857143, 5.257142857, 3.657142857, 4.542857143,
            'The ratings you entered most closely match those of Assertive Value-Claimer. You have above average confidence in asserting your interests and maximizing your slice of the pie.'),
            App.Profile.createType('Assertive Value-Creator', 4.628571429, 5.447619048, 3.085714286, 2.838095238,
            'The ratings you entered most closely match those of Assertive Value-Creator. You have above average confidence in asserting your interests, but are less sure about maximizing your own value in deal.')
        ];


        App.Profile.createChart();
        App.Profile.createListeners();
    }
};

$(document).ready(function () {
    App.Profile.init();
});