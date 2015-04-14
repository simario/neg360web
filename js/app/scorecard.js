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
        var agreement = $('input[name=negotationAgreement]:checked', '#scorecardForm').val()
        var importance = $('#sliderImportant').parent().find('.tooltip-inner').html();
        var satisfaction = $('#sliderSatisfied').parent().find('.tooltip-inner').html();
        var scorecardType = $('#scorecardType');
        var agreementReached = $('#agreementReached');
        var scorecardTitle = $('#scorecardTitle');



        App.Scorecard.importanceGauge.data('text', importance);
        App.Scorecard.importanceGauge.data('percent', importance);
        App.Scorecard.satisfactionGauge.data('text', satisfaction);
        App.Scorecard.satisfactionGauge.data('percent', satisfaction);

        agreementReached.html(agreement);
        scorecardType.html(type);
        scorecardTitle.html(name);
        
        App.Scorecard.importanceGauge.empty();
        App.Scorecard.satisfactionGauge.empty();
        App.Scorecard.importanceGauge.circliful();
        App.Scorecard.satisfactionGauge.circliful();
    },
    init: function() {
        var footerAlert = $('#scorecardModalFooterAlert');
        footerAlert.hide();

        $('#sliderImportant').slider();
        $('#sliderSatisfied').slider();
        App.Scorecard.importanceGauge = $('#importance2').circliful();
        App.Scorecard.satisfactionGauge = $('#satisfaction2').circliful();
        App.Scorecard.createListeners();
    }
};

$(document).ready(function () {
    App.Scorecard.init();
});