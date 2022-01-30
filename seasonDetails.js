// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    self.baseUri = ko.observable('http://192.168.160.58/Formula1/api/Seasons/Season?year=');
    self.displayName = 'Season Details';
    self.error = ko.observable('');
    self.passingMessage = ko.observable('');
    //--- Data Record
    self.Year = ko.observable('');
    self.ImageUrl = ko.observable('');
    self.Name = ko.observable('');
    self.Country = ko.observable('');
    self.Location = ko.observable('');
    self.Races = ko.observableArray('');
    self.Url = ko.observable('');
    self.Alt = ko.observable('');
    self.Lng = ko.observable('');
    self.Lat = ko.observable('');
    self.Date = ko.observable('');

    //--- Page Events
    self.activate = function (id) {
        console.log('CALL: getCircuit...');
        var composedUri = self.baseUri() + id;
        ajaxHelper(composedUri, 'GET').done(function (data) {
            console.log(data);
            self.Year(data.Year);
            self.ImageUrl(data.ImageUrl);
            self.Name(data.Name);
            self.Country(data.Country);
            self.Location(data.Location);
            self.Races(data.Races);
            self.Url(data.Url);
            self.Alt(data.Alt);
            self.Lng(data.Lng);
            self.Lat(data.Lat);
            self.Date(data.Date);
            hideLoading();
        });
    };
    //--- Internal functions
    function ajaxHelper(uri, method, data) {
        self.error(''); // Clear error message
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null,
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("AJAX Call[" + uri + "] Fail...");
                hideLoading();
                self.error(errorThrown);
            }
        });

    }
    function showLoading() {
        $('#myModal').modal('show', {
            backdrop: 'static',
            keyboard: false
        });
    }
    function hideLoading() {
        $('#myModal').on('shown.bs.modal', function (e) {
            $("#myModal").modal('hide');
        })
    }

    function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };
    //--- start ....
    showLoading();
    var pg = getUrlParameter('id');
    console.log(pg);
    if (pg == undefined)
        self.activate(1);
    else {
        self.activate(pg);
    }
};



$(document).ready(function () {
    console.log("ready!");
    ko.applyBindings(new vm());
    
});