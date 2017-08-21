app.controller('ReaderCtrl', function($scope, $sce, $state, $http, 
    ionicToast, $filter, API_READER, $stateParams, 
    ngAudio,$translate, $rootScope) {
    var $translateFilter = $filter('translate');
    $scope.supported = false;
    $rootScope.conditionPlayer = false;
    $scope.searchMode = false;
    $scope.headerTitle = $translateFilter('hashtag');
    $scope.filter = { "data_clean": '' };
    // var tab_commentary = document.getElementById('tab_commentary')
    // console.log(tab_commentary)

    $scope.$watch('searchMode', function(newValue, oldValue) {
        if (newValue == true) {
            $scope.headerTitle = $scope.pageTitle + ': ' + $scope.obj_header.chapter;
        } else {
            $scope.headerTitle = $translateFilter('hashtag');
        }
    });

    $scope.setAria = function(){
        $scope.cabecera= $translateFilter('aria.cabecera')+ $scope.pageTitle + $scope.obj_header.chapter;
    }

    $scope.copied = function() {
        console.log('Copied!');
    };

    $scope.fail = function(err) {
        console.error('Error!', err);
    };

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

    $scope.showActionToast = function(param) {
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
        if($scope.obj_header!=undefined)
        {
        $scope.list_underline = $scope.list_underline.sort(dynamicSort("id"));
        var hashtag = $translateFilter('hashtag');
        var book = $scope.pageTitle + ': ' + $scope.obj_header.chapter + '\n'
        var verse = "";
        for (key in $scope.list_underline) {
            verse += $scope.list_underline[key]['verse'] + '. ' + $scope.list_underline[key]['data'] + '\n';

        }
        var text = hashtag + ' ' + book + verse;
        }
        
        return text
    }


    $scope.inObject = function(target, data) {

        var condition = true;
        for (key in data) {
            if (data[key]['id'] == target['id']) {
                condition = true;
                $scope.list_underline.splice(key, 1);

            } else {
                condition = false;
            }

        }
        if (condition === false) {
            var obj_underline = {
                'id': target['id'],
                'verse': target['verse'],
                'data': target['data']
            };
            $scope.list_underline.push(obj_underline);
        }
        //console.log($scope.list_underline)
    }

    $scope.fillObjUnderline = function(x) {
        //x['id']       
        if ($scope.list_underline.length === 0) {
            //console.log('true')
            var obj_underline = {
                'id': x['id'],
                'verse': x['verse'],
                'data': x['data']
            }
            $scope.list_underline.push(obj_underline)
        } else {
            $scope.inObject(x, $scope.list_underline);
        }
    };

    $scope.setClass = function(i, x) {
        var title = document.getElementById('title' + i);
        var BackgroundColorHighlight = "#337BDF";
        var BackgroundColor = "#8082C6";
        var HexBackgroundColor = "rgb(51, 123, 223)";
        $scope.fillObjUnderline(x);

        if (title.style.backgroundColor === HexBackgroundColor) {
            title.style.backgroundColor = BackgroundColor;
        } else {
            title.style.backgroundColor = BackgroundColorHighlight;
        }
    }

    $rootScope.change_language = function(locale) {
        $scope.list_underline = [];
        $translate.use(locale);
        localStorage.language = locale;
        $scope.onListReading();
        if ($rootScope.conditionPlayer) {
            $rootScope.conditionPlayer = true;
            $scope.handlePlayer();
        }

        $rootScope.conditionPlayer = false;
    };


    $scope.handlePlayer = function() {
        if ($rootScope.conditionPlayer) {
            $rootScope.conditionPlayer = false;
            $scope.sound.stop();
        } else {
            $rootScope.conditionPlayer = true;
            $scope.sound.play();
        }
        console.log('conditionPlayer', $rootScope.conditionPlayer)
    };

    console.log($state.$current);

    $scope.$watch(function() {
        return $state.$current
    }, function(newVal, oldVal) {
        //do something with values
        $scope.sound.stop();        
        $rootScope.conditionPlayer = false;
        
    })

    $scope.HighLight = function() {
        var elementId = event.srcElement.id;
        var elementHtml = document.getElementById(elementId)
        var BackgroundColorHighlight = "#337BDF";
        var BackgroundColor = "#8082C6";
        var HexBackgroundColor = "rgb(51, 123, 223)";

        if (elementHtml.style.backgroundColor === HexBackgroundColor) {
            elementHtml.style.backgroundColor = BackgroundColor;
        } else {
            elementHtml.style.backgroundColor = BackgroundColorHighlight;
        }
    }

    $scope.shareSocial = function(option) {
        var message = $scope.buildVerse()
        var image = ''
        var link = ''
        if ($scope.list_underline.length == 0) {
            $scope.showActionToast();
        } else {

            if (option == "copy") {
                $scope.copyText(message);
            }
            if (option == "twitter") {
                $cordovaSocialSharing
                    .shareViaTwitter(message, image, link)
                    .then(function(result) {
                        // Success!

                    }, function(err) {
                        // An error occurred. Show a message to the user
                    });
            }
            if (option == "facebook") {
                $cordovaSocialSharing
                    .shareViaFacebook(message, image, link)
                    .then(function(result) {
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
                        $scope.copyText(message);
                        // Success!
                    }, function(err) {
                        // An error occurred. Show a message to the user
                    });
            }
        }
    }


    $scope.onListBook = function() {
        //var query = Book.query();
        API_READER.Book.list().$promise.then(function(data) {
            $scope.book = data;
            // Do whatever when the request is finished
        });
    }

    $scope.onListTestament = function() {
        //var query = Book.query();
        API_READER.Testament.list().$promise.then(function(data) {
            $scope.testament = data;
            // Do whatever when the request is finished
        });
    }

    $scope.onListReading = function() {
        console.log('onListReading')
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

            $scope.audio = 'http://davrv93.pythonanywhere.com/' + $scope.content.audio
            $scope.sound = ngAudio.load($scope.audio); // returns NgAudioObject
            console.log($scope.sound)
            
            //console.log(res);
            $scope.obj_header = res.obj_header;
            $scope.obj_reading = res.obj_reading;
            console.log(res.obj_header.book_name)
            $scope.pageTitle = $translateFilter(res.obj_header.book_name);
            $rootScope.progress = false;
            $scope.setAria();
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
    $scope.onListReading();

    if (annyang) {
            // Let's define our first command. First the text we expect, and then the function it should call
            annyang.setLanguage('es-US')
            var commands = {
                'Escuchar reavivados por su palabra': function() {
                    $scope.handlePlayer();
                    $scope.$apply();

                },
                


            };

            // Add our commands to annyang
            annyang.addCommands(commands);
            annyang.debug();
            // Start listening. You can call this here, or attach this call to an event, button, etc.
            annyang.start();
        }


});