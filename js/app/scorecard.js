App.Scorecard = {
    importanceGauge: undefined,
    satisfactionGauge: undefined,
    importance: 0,
    satisfaction: 0,
    agreementYes: 0,
    agreementNo: 0,
    agreementNotYet: 0,
    typeProOut: 0,
    typeProColl: 0,
    typePersonal: 0,
    typeComm: 0,
    typeFam: 0,
    createListeners: function() {
        $('#scorecardModalSaveButton').on('click', function() {
            App.Scorecard.save();
        });
    },
    save: function() {
        var name = $('#negotiationName').val();
        var type = $('#negotiationTypeSelect').val();
        var agreement = $('input[name=negotationAgreement]:checked', '#scorecardForm').val()
        var scorecardType = $('#scorecardType');
        var agreementReached = $('#agreementReached');
        var scorecardTitle = $('#scorecardTitle');

        App.Scorecard.importance = $('#sliderImportant').parent().find('.tooltip-inner').html();
        App.Scorecard.satisfaction = $('#sliderSatisfied').parent().find('.tooltip-inner').html();
        App.Scorecard.importanceGauge.data('text', App.Scorecard.importance);
        App.Scorecard.importanceGauge.data('percent', App.Scorecard.importance);
        App.Scorecard.satisfactionGauge.data('text', App.Scorecard.satisfaction);
        App.Scorecard.satisfactionGauge.data('percent', App.Scorecard.satisfaction);
        App.Scorecard.importanceGauge.empty();
        App.Scorecard.satisfactionGauge.empty();
        App.Scorecard.importanceGauge.circliful();
        App.Scorecard.satisfactionGauge.circliful();

        agreementReached.html(agreement);
        scorecardType.html(type);
        scorecardTitle.html(name);

        switch (type) {
            case "Professional, with outside parties (vendors, customers, stakeholders, etc.)":
                App.Scorecard.typeProOut++;
                break;
            case "Professional, with colleagues within your organization":
                App.Scorecard.typeProColl++;
                break;
            case "Personal (such as buying a car or renting an apartment)":
                App.Scorecard.typePersonal++;
                break;
            case "Community (with neighborhood groups, not-for-profits, etc.)":
                App.Scorecard.typeComm++;
                break;
            case "Family (with children parents, partners, spouses, etc.)":
                App.Scorecard.typeFam++;
                break;
        }

        switch (agreement) {
            case "Yes":
                App.Scorecard.agreementYes++;
                break;
            case "No":
                App.Scorecard.agreementNo++;
                break;
            case "Not Yet":
                App.Scorecard.agreementNotYet++;
                break;
        }

        App.BestPractices.update();
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