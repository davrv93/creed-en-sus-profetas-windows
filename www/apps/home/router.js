app.config(function($stateProvider, $urlRouterProvider) {


    // $ionicConfigProvider.backButton.previousTitleText(false);
    // $ionicConfigProvider.backButton.icon('ion-chevron-left');
    // $ionicConfigProvider.backButton.text('')


    $stateProvider

        .state('app', {
            views: {
                'homeView': {
                    templateUrl: "apps/home/view/home.html",
                    controller: 'HomeCtrl',
                    cache: false

                },
                'toolbar': {
                    templateUrl: "apps/home/view/toolbar.html",
                    controller: 'AppCtrl',
                    abstract: true,
                    cache: false
                },
                'menuLanguage': {
                    templateUrl: "apps/home/view/menu.html",
                    controller: 'RightCtrl',
                    cache: false
                }

            },
            url: "/app",
            abstract: false,
            cache: false,

        })
        .state('app.reader', {
            template: '<ui-view><ui-view/>',
            url: "/reader",
            abstract: true,
            cache: false,

        })

        .state('app.reader.bible', {
            url: "/tab_bible",
            cache: false,
            templateUrl: "apps/reader/view/tab-bible.html",
            controller: "ReaderCtrl"




        })


        .state('app.home', {
            url: "/home",
            views: {
                'menuContent': {
                    templateUrl: "apps/home/view/home.html",
                    controller: 'HomeCtrl'
                }
            }
        })
        .state('app.settings', {
            url: "/settings",
            views: {
                'menuContent': {
                    templateUrl: "apps/home/view/settings.html"
                }
            }
        })
        .state('app.settings_locale', {
            url: "/settings_locale",
            views: {
                'menuContent': {
                    templateUrl: "apps/home/view/locale.html",
                    controller: 'LocaleCtrl'
                }
            }
        })
        .state('app.reader_spirit_prophecy', {
            url: "/reader_spirit_prophecy",
            views: {
                'menuContent': {
                    templateUrl: "apps/reader/view/reader_spirit_prophecy.html"
                }
            }
        })
        .state('app.bible', {
            url: "/bible",
            views: {
                'menuContent': {
                    templateUrl: "apps/reader/view/bible.html"
                }
            }
        })
    // .state('app.reader_bible', {
    //     url: "/reader_bible",
    //     views: {
    //         'menuContent': {
    //             templateUrl: "apps/reader/view/reader_bible.html"
    //         }
    //     }
    // }).state('app.reader_bible.tab_bible', {
    //     url: "/tab_bible",
    //     cache: false,
    //     views: {
    //         'tabBible': {
    //             templateUrl: "apps/reader/view/tab-bible.html",
    //             controller: "ReaderCtrl"
    //         }
    //     }
    // }).state('app.reader_bible.tab_commentary', {
    //     url: "/tab_commentary",
    //     cache: false,
    //     views: {
    //         'tabCommentary': {
    //             templateUrl: "apps/reader/view/tab-commentary.html",
    //             controller: "CommentaryVerseCtrl"
    //         }
    //         // },
    //         // 'tabCommentaryContent': {
    //         //     templateUrl: "apps/reader/view/tab-commentary-content.html",
    //         //     // controller: "ReaderCtrl"
    //         // }
    //     }
    // })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app');
});