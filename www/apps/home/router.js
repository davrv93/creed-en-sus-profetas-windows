app.config(function($stateProvider, $urlRouterProvider) {


    // $ionicConfigProvider.backButton.previousTitleText(false);
    // $ionicConfigProvider.backButton.icon('ion-chevron-left');
    // $ionicConfigProvider.backButton.text('')


    $stateProvider

        .state('app', {            
            url: "/app",
            abstract: false,
//            templateUrl:"apps/home/view/root.html",
            views: {
                'homeView': {
                    templateUrl: "apps/home/view/home.html",
                    controller: 'HomeCtrl',
                    cache: false

                },
                'toolbar': {
                    templateUrl: "apps/home/view/toolbar.html",
                    controller: 'AppCtrl',
                    
                    cache: false
                },
                'menuLanguage': {
                    templateUrl: "apps/home/view/menu.html",
                    controller: 'RightCtrl',
                    cache: false
                }

            },

            cache: false,

        })
        .state('app.bible', {            
            url: "/bible",
            cache: false,
            views: {
                'homeView': {
                    templateUrl: "apps/reader/view/tab-bible.html",
                    controller: 'ReaderCtrl',
                    cache: false

                },
                'toolbar': {
                    templateUrl: "apps/reader/view/toolbar-reader.html",
                    controller: 'AppCtrl',
                    cache: false

                },
                'menuLanguage': {
                    templateUrl: "apps/home/view/menu.html",
                    controller: 'RightCtrl',
                    cache: false
                },
                'leftsidenav@bible':{
                      templateUrl: "apps/home/view/left-sidenav.html",
                    controller: 'RightCtrl',
                    cache: false
                }
                
            }
        })

        .state('app.egw', {            
            url: "/egw",
            cache: false,
            views: {
                'homeView': {
                    templateUrl: "apps/reader/view/reader_spirit_prophecy.html",
                    controller: 'SpiritProphecyReadCtrl',
                    cache: false

                },
            }
        })


        
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app');
});