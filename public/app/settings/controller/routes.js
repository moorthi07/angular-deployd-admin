//app.constant('PALETTES', ['red', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'green', 'light-green', 'lime', 'yellow', 'amber', 'orange', 'deep-orange', 'brown', 'grey', 'blue-grey']);

app.constant('PALETTES', ['red', 'purple', 'deep-purple', 'indigo']);

app.config(['$stateProvider', '$mdThemingProvider', 'PALETTES', function ($stateProvider, $mdThemingProvider, PALETTES) {

    $mdThemingProvider.alwaysWatchTheme(true);


    PALETTES.forEach(function (primary, i) {
        PALETTES.forEach(function (accent, j) {
            PALETTES.forEach(function (warn, k) {
                if (i !== j || j !== k || i !== k) {
                    $mdThemingProvider.theme(primary + '_' + accent + '_' + warn)
                        .primaryPalette(primary)
                        .accentPalette(accent)
                        .warnPalette(warn);
                }

            });
        });
    });


    $stateProvider
        .state('dashboard.settings', {
            url: '/settings',
            templateUrl: '/dist/app/settings/partials/dashboard.settings.html',
            controller: 'settingsCtrl',
            resolve: {
                role: ['$q', 'Users', function ($q, Users) {
                    var defer = $q.defer();
                    Users.me(function (me) {
                        if (me.admin) {
                            defer.resolve(200);
                        } else {
                            defer.reject(403);
                        }
                    });

                    return defer.promise;
                }]
            }
        });
}]);

app.run(['$rootScope', 'Settings', function ($rootScope, Settings) {
    Settings.query(function (settings) {
        settings.forEach(function (setting) {
            if (setting.active) {
                $rootScope.settings = setting;
            }
        });
    });
}]);