App.Scorecard = {
    importanceGauge: undefined,
    satisfactionGauge: undefined,
    createListeners: function() {
        $('#scorecardModalSaveButton').on('click', function() {
            App.Scorecard.save();
        });
    },
    save: function() {
        var name = $('#negotiationName').val();
        var type = $('#negotiationTypeSelect').val();
        var importance = $('#sliderImportant').slider('getValue');
        var agreement = $('input[name=negotationAgreement]:checked', '#scorecardForm').val()
        var satisfaction = $('#sliderSatisfied').slider('getValue');
        var importanceGauge = $('#importance2');
        var satisfactionGauge = $('#satisfaction2');
        var scorecardType = $('#scorecardType');
        var agreementReached = $('#agreementReached');
        var scorecardTitle = $('#scorecardTitle');

        App.Scorecard.importanceGauge.empty();
        App.Scorecard.satisfactionGauge.empty();

        App.Scorecard.importanceGauge.data('text', 15);
        App.Scorecard.importanceGauge.data('percent', 15);
        App.Scorecard.satisfactionGauge.data('text', 25);
        App.Scorecard.satisfactionGauge.data('percent', 25);

        agreementReached.html(agreement);
        scorecardType.html(type);
        scorecardTitle.html(name);

        App.Scorecard.importanceGauge.circliful();
        App.Scorecard.satisfactionGauge.circliful();
    },
    init: function() {
        var footerAlert = $('#scorecardModalFooterAlert');
        footerAlert.hide();


        $('#sliderImportant').slider({});
        $('#sliderSatisfied').slider({});
        App.Scorecard.importanceGauge = $('#importance2').circliful();
        App.Scorecard.satisfactionGauge = $('#satisfaction2').circliful();

        App.Scorecard.createListeners();
    }
};

$(document).ready(function () {
    App.Scorecard.init();
});