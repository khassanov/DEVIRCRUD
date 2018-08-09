angular.module('crud')
    .directive('customOnChange', function(){

        return {
            restrict: 'A',
            link: function(scope, element, attrs){

                element.bind('change', scope.$eval(attrs.customOnChange));

            }
        };
    });
