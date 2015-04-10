App.Scorecard = {
    createListeners: function() {
        $('#scorecardModalSaveButton').on('click', function() {
            App.Scorecard.save();
        });
    },
    save: function() {
        var name = $('#negotiationName').val();
        var type = $('#negotiationTypeSelect').val();
        var importance = $('#sliderImportant').slider('getValue');
        var aggreement = $('input[name=negotationAgreement]:checked', '#scorecardForm').val()
        var satisfaction = $('#sliderSatisfied').slider('getValue');

        console.log('name : ' + name);
        console.log('type : ' + type);
        console.log('importance : ' + importance);
        console.log('aggreement : ' + aggreement);
        console.dir(satisfaction);
    },
    init: function() {
        var footerAlert = $('#scorecardModalFooterAlert');
        footerAlert.hide();


        $('#sliderImportant').slider({});
        $('#sliderSatisfied').slider({});

        App.Scorecard.createListeners();
    }
};

$(document).ready(function () {
    App.Scorecard.init();
});