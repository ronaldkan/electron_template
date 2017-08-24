(function() {
    var app = angular.module('mainApp');

    app.factory('statusModel', ['$rootScope', function($rootScope) {
        var model = {};

        model.tableConfig = {
            'S1': {'top': 75, 'left': 20},
            'S2': {'top': 75, 'left': 110},
            'S3': {'top': 75, 'left': 200},
            'S4': {'top': 75, 'left': 290},
            'S5': {'top': 175, 'left': 60},
            'S6': {'top': 175, 'left': 150},
            'S7': {'top': 175, 'left': 240},
            'F1': {'top': 75, 'left': 400},
            'F2': {'top': 75, 'left': 490}, 
            'F3': {'top': 75, 'left': 580},
            'F4': {'top': 75, 'left': 690},
            'F5': {'top': 75, 'left': 780},
            'F6': {'top': 75, 'left': 870},
            'F7': {'top': 75, 'left': 960},
            'F8': {'top': 75, 'left': 1050},
            'F9': {'top': 75, 'left': 1140},
            'N1': {'top': 175, 'left': 400},
            'N2': {'top': 175, 'left': 490},
            'N3': {'top': 175, 'left': 580},
            'N4': {'top': 175, 'left': 690},
            'N5': {'top': 175, 'left': 780},
            'N6': {'top': 175, 'left': 870},
            'N7': {'top': 175, 'left': 960}
        };

        model.table = {};

        model.clearTable = function(tableId) {
            model.table[tableId] = {
                'display': [],
                'order': {},
                'currentOrders': {},
                'invoiceId': "",
                'receiptInfo': {
                    'totalAmount': 0.00,
                    'firstOrder': "",
                    'discountAmount': 0.00,
                    'discountPct': "",
                    'cash': "",
                    'nets': "",
                    "change": "",
                    "checkoutTime": "",
                    "deposit": "0.00" 
                }
            };;
        };

        model.initializeTables = function() {
            _.forEach(_.keys(model.tableConfig), function(ids) {
                model.table[ids] = {
                'display': [],
                'order': {},
                'currentOrders': {},
                'invoiceId': "",
                'receiptInfo': {
                    'totalAmount': 0.00,
                    'firstOrder': "",
                    'discountAmount': 0.00,
                    'discountPct': "",
                    'cash': "",
                    'nets': "",
                    "change": "",
                    "checkoutTime": "",
                    "deposit": "0.00"
                }
            };;
            });
        };

        return model;
    }]);
})();