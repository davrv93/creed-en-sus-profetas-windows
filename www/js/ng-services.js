var ngServices = angular.module("ngServices", []);


ngServices.directive('coreProgress', function() {
    return {
        restrict: 'E',

        template: '<div class="cargando_fondo" ng-show="state"></div>' +
            '<div class="cargando_valores" ng-show="state">' +
            '<center><p><md-progress-circular class="md-primary" md-mode="indeterminate"  md-diameter="100"></md-progress-circular>' +
            '</p></center>' +
            '</div>',

        scope: {
            state: "="
        },
        link: function(scope) {}
    }
});


ngServices.directive('fastRepeat', function($compile) {
    return {
        restrict: 'E',
        scope: {
            data: '=',
            event: '=',
            datas: '='

        },
        link: function(scope, el, attrs) {
            scope.$watchCollection('data.data', function(newValue, oldValue) {
                var template = document.getElementById('table-template').text;
                var rendered = Handlebars.compile(template);
                var context = scope.data;
                var html = rendered(context);
                el.children().remove();
                el.append(html);
                $compile(el.contents())(scope);


                console.log(scope)


            })
        }
    }
})

ngServices.directive('mainTemplate', function($compile) {
    return {
        restrict: 'E',
        scope: {
            data: '=',
            event: '=',
            status: '=',
            labels: '='

        },
        link: function(scope, el, attrs) {
            var template = document.getElementById('main-templates').text;
            var rendered = Handlebars.compile(template);
            var context = scope.labels;
            var html = rendered(context);
            //el.children().remove();                
            html = $compile(html)(scope);
            el.append(html);
        }
    }
})

ngServices.directive('mainButtons', function($compile) {
    return {
        restrict: 'E',
        scope: {
            data: '=',
            event: '=',
            status: '=',
            labels: '='

        },
        link: function(scope, el, attrs) {
            console.log(scope)

            var template = document.getElementById('main-buttons').text;
            var rendered = Handlebars.compile(template);
            var context = scope.labels;
            var html = rendered(context);
            //el.children().remove();                
            html = $compile(html)(scope);
            el.append(html);
        }
    }
})

ngServices.directive('modalLanguage', function($compile) {
    return {
        restrict: 'E',
        scope: {
            data: '=',
            event: '=',
            status: '=',
            labels: '='

        },
        link: function(scope, el, attrs) {
            var template = document.getElementById('modal-language').text;
            var rendered = Handlebars.compile(template);
            var context = scope.labels;
            var html = rendered(context);
            html = $compile(html)(scope);
            el.append(html);
        }
    }
})

ngServices.directive('modalUpdate', function($compile) {
    return {
        restrict: 'E',
        scope: {
            data: '=',
            event: '=',
            status: '=',
            labels: '='

        },
        link: function(scope, el, attrs) {

            var template = document.getElementById('modal-update').text;
            var rendered = Handlebars.compile(template);
            var context = scope.labels;
            var html = rendered(context);
            html = $compile(html)(scope);
            el.append(html);
        }
    }
})
