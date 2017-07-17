app.controller('CommentaryVerseCtrl', function($scope, $sce, $state, $ionicModal, $ionicScrollDelegate, $http, ionicToast, $cordovaClipboard, $filter, API_READER, $stateParams, $translate, $rootScope, $cordovaSocialSharing, $location) {
    var $translateFilter = $filter('translate');

    $scope.conditionPlayer = false;
    $scope.searchMode = false;
    $scope.headerTitle = $translateFilter('hashtag');
    $scope.filter = { "data_clean": '' };

    $scope.$watch('searchMode', function(newValue, oldValue) {
        if (newValue == true) {
            $scope.headerTitle = $scope.pageTitle + ': ' + $scope.obj_header.chapter;
        } else {
            $scope.headerTitle = $translateFilter('hashtag');
        }
    });

    $scope.searchCancel = function() {
        $scope.searchMode = false;
        $scope.filter = { "data_clean": "" };
        $ionicScrollDelegate.scrollTop();
        $scope.query = '';
    }
    $scope.searchFunction = function() {
        $scope.searchMode = true;

    }

    function removeAccents(str) {
        map = {
            'a': 'á|à|ã|â|À|Á|Ã|Â',
            'e': 'é|è|ê|É|È|Ê',
            'i': 'í|ì|î',
            'o': 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
            'u': 'ú|ù|û|ü|Ú|Ù|Û|Ü',
            'c': 'ç|Ç',
            'n': 'ñ|Ñ'
        };

        angular.forEach(map, function(pattern, newValue) {
            str = str.replace(new RegExp(pattern, 'g'), newValue);
        });

        return str;
    };

    $scope.search = function() {
        $scope.filter = { "data_clean": removeAccents($scope.query) };
        $ionicScrollDelegate.scrollTop();
    }

    $scope.list_underline = [];

    $scope.showActionToast = function() {
        ionicToast.show($translateFilter('reader_msg'), 'bottom', false, 2000);
    };

    $scope.showParamToast = function(param) {
        ionicToast.show($translateFilter(param), 'bottom', false, 2000);
    };

    $scope.closeToast = function() {
        ionicToast.hide();
    };

    function dynamicSort(property) {
        var sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function(a, b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }

    $scope.copyText = function(value) {
        $cordovaClipboard.copy(value).then(function() {
            console.log("Copied text");
        }, function() {
            console.error("There was an error copying");
        });
    }

    $scope.buildVerse = function() {
        console.log('obj_commentary',$scope.obj_commentary)
        $scope.obj_commentary = $scope.obj_commentary.sort(dynamicSort("order"));
        var hashtag = $translateFilter('hashtag_commentary');
        var book = $scope.pageTitle + ': ' + $scope.obj_header.chapter + '\n'
        var verse = "";
        for (key in $scope.obj_commentary) {
            verse += $scope.obj_commentary[key]['word'] + ': ' + $scope.obj_commentary[key]['data'] +'.'+ '\n';

        }
        var text = hashtag + ' ' + book + verse;
        console.log(text);
        return text
    }

    

    
    
    $rootScope.change_language = function(locale) {
        $scope.list_underline = [];
        $translate.use(locale);
        localStorage.language = locale;
    };

    

    $scope.shareSocial = function(option) {
        var message = $scope.buildVerse()
        var image = ''
        var link = ''
        if ($scope.obj_commentary.length == 0) {
            $scope.showActionToast();
        } else {

            if (option == "copy") {
                $scope.showParamToast("share_copy");
                $scope.copyText(message);
            }
            if (option == "facebook") {
                $cordovaSocialSharing
                    .shareViaFacebook(message, image, link)
                    .then(function(result) {
                        $scope.showParamToast("share_facebook");
                        $scope.copyText(message);
                        // Success!
                    }, function(err) {
                        // An error occurred. Show a message to the user
                    });
            }

            if (option == "whatsapp") {
                $cordovaSocialSharing
                    .shareViaWhatsApp(message, image, link)
                    .then(function(result) {
                        $scope.showParamToast("share_whatsapp");
                        $scope.copyText(message);
                        // Success!
                    }, function(err) {
                        // An error occurred. Show a message to the user
                    });
            }
        }
    }

    $scope.goContent = function(param) {
        $state.transitionTo('app.reader_bible.content', { verse: param });

        //$location.path('#/app/reader_bible/tab_commentary/').search({verse: param})
    }

    $scope.getVersesFromChapter = function() {
        $rootScope.progress = true;
        var currentDate = new Date()
        var day = currentDate.getDate();
        var month = currentDate.getMonth() + 1;
        var year = currentDate.getFullYear();


        if (day < 10) {
            day = '0' + day
        }

        if (month < 10) {
            month = '0' + month
        }

        var param_date = year + '-' + month + '-' + day;


        console.log('moment', param_date)
        var req = {
            method: 'GET',
            url: "https://davrv93.pythonanywhere.com/api/believe/verse/get_verses_from_chap/",
            params: {
                language: $translate.use(),
                date: param_date
            }
        }

        $http(req).success(function(res) {
            $scope.obj_header = res;
            $scope.obj_verses = res.obj_verses;
            $scope.pageTitle = $translateFilter(res.book_name);
            console.log('Res', res)
            //if(res.obj_verses.length)
            $rootScope.progress = false;
        }).error(function(err) {
            console.log('Err', err)
            $scope.obj_reading = [{
                'data': $translateFilter('errors.404')
            }];
            $scope.pageTitle = "Error";
            $rootScope.progress = false;
        })
    }

    $scope.getVersesFromChapter();

    $scope.loadTemplate = function() {
        $ionicModal.fromTemplateUrl('my-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });
    }
    $scope.refreshCommentary = function (id){
        $scope.getCommentary(id);
    }

    $scope.openModal = function(param, pageTitle, chapter) {
        var dict_verse = {
            id: param['id'],
            verse: param['verse'],
            pageTitle: pageTitle,
            chapter: chapter
        }
        $scope.param = dict_verse;
        $scope.getCommentary($scope.param['id']);
        $scope.modal.show();
    };
    $scope.closeModal = function() {
        $scope.modal.hide();
    };
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
        // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
        // Execute action
    });

    $scope.getCommentary = function(id) {
        $rootScope.progress = true;

        var req = {
            method: 'GET',
            url: "https://davrv93.pythonanywhere.com/api/believe/verse/get_commentary_from_verse/",
            params: {
                id: id,
            }
        }

        $http(req).success(function(res) {
            $scope.obj_commentary = res;
            console.log('Res', res)
            $rootScope.progress = false;
        }).error(function(err) {
            console.log('Err', err)
            $scope.obj_commentary = [{
                'data': $translateFilter('errors.404')
            }];
            $scope.pageTitle = "Error";
            $rootScope.progress = false;
        })

    }

    $rootScope.change_language = function(locale) {
        $scope.list_underline = [];
        $translate.use(locale);
        localStorage.language = locale;
        $scope.onListReading();
        $scope.getVersesFromChapter();
    };

    $scope.onListReading = function() {
        $rootScope.progress = true;
        var currentDate = new Date()
        var day = currentDate.getDate();
        var month = currentDate.getMonth() + 1;
        var year = currentDate.getFullYear();


        if (day < 10) {
            day = '0' + day
        }

        if (month < 10) {
            month = '0' + month
        }

        var param_date = year + '-' + month + '-' + day;


        console.log('moment', param_date)
        var req = {
            method: 'GET',
            url: "https://davrv93.pythonanywhere.com/api/believe/verse/reading/",
            params: {
                language: $translate.use(),
                date: param_date
            }
        }

        $http(req).success(function(res) {
            $scope.content = res;
            $rootScope.chapter = res['commentary'];
            if (res['commentary'] == undefined) {
                $rootScope.chapter = false;
            }
            console.log(res);
            $scope.obj_header = res.obj_header;
            $scope.obj_reading = res.obj_reading;
            $scope.pageTitle = $translateFilter(res.obj_header.book_name);
            $rootScope.progress = false;
        }).error(function(err) {
            console.log('Err', err)
            $scope.obj_reading = [{
                'data': $translateFilter('errors.404')
            }];
            $scope.pageTitle = "Error";
            $rootScope.progress = false;
        })
    }



    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }

});
