(function() {
    'use strict';

    angular
        .module('app.widgets')
        .directive('acTextarea', acTextarea);

    function acTextarea () {
        // Provides suggestions for completing words.
        // Usage:
        //  <div data-autocomplete ng-model="myModelName">

        var directive = {
            link: link,
            restrict: 'E',
            template: '<textarea ng-model="textInput"></textarea>' +
            '<div ng-show="hints.length > 0" class="hints">' +
            '<div ng-repeat="hint in hints track by $index" ng-click="pickHint($index)" ng-mouseover="selectHint($index)" ng-class="{active: $index == selectedIndex}">{{hint}}</div></div>'

        };
        return directive;


        function link(scope, element, attrs) {

            scope.allHints = getRandomWords();
            scope.hints = [];
            scope.lastWord = '';
            scope.pickHint = pickHint;
            scope.selectHint = selectHint;
            scope.selectedIndex = 0;

            console.log(scope.allHints);

            var words = [],
                lastWord = '';



            //prevent tabbing out of text field
            element.bind("keydown", function (event) {
                if (event.keyCode == 9) {
                    event.preventDefault();
                }
            });

            element.bind("keyup", function (event) {

                var input = scope.textInput;

                if (event.keyCode == 9) {  // tab key event

                    pickHint(scope.selectedIndex);

                } else if(event.keyCode == 38) {  // up arrow key event

                    if (scope.selectedIndex > 0) {
                        scope.selectedIndex = scope.selectedIndex - 1;
                    }

                } else if(event.keyCode == 40) { // down arrow key event

                    if (scope.selectedIndex < scope.hints.length - 1 ) {
                        scope.selectedIndex = scope.selectedIndex + 1;
                    }

                } else if(event.keyCode == 32 || event.keyCode == 13) { // space/return key - onto next word

                    resetHints();

                } else {

                    scope.lastWord = getLastWord(input);

                    setHints(scope.lastWord);
                }

                scope.$apply();

            });

            function setHints(str) {

                var hints = [];

                if (str.length > 0) {

                    angular.forEach(scope.allHints, function (val) {

                        if (startsWith(val, str)) {
                            hints.push(val);
                        }

                    });

                }
                scope.hints = hints;

            }

            function pickHint(i) {

                // Complete the last word typed using the selected hint
                scope.textInput = completeWord(scope.textInput, scope.hints[i]);

                // Reset the Selected Index
                resetHints();

                // Set focus back to textarea after mouse click
                if (event.type === 'click') {
                    event.toElement.parentElement.parentElement.firstChild.focus();
                }

            }

            function selectHint(i) {
                scope.selectedIndex = i;
            }

            function resetHints() {
                // Reset the Selected Index
                scope.selectedIndex = 0;

                // Empty the the hints array
                scope.hints = [];
            }

            function startsWith(whole, part) {

                return whole.indexOf(part) == 0;

            }

            function getLastWord(str) {

                // convert string to array
                //words = str.split(' ');

                // return last word in array
                //return words[words.length-1];

                return str.slice(
                    str.lastIndexOf(' ') + 1
                )

            }

            function completeWord(str, pick) {

                // convert string to array
                words = str.split(' ');

                // drop last word in array
                words.splice(-1,1);

                // add the new word (the user pick)
                words.push(pick);

                // convert pack to string and return
                return words.join(" ");

            }

            function getRandomWords() {
                return 'patroclus halmaheira plated rybinsk barbica preeffective girard overrepresent matzah submitted sinicized temporiser expertness nonmitigative billon wheezing picayunishness evidenced bakshish prebelief witches hankeringly tobacconist outribbing brachycephaly legendizing epoxies shofar lashio plectron legerdemain lunulate debra iliamna berried blepharitic concord giggliest smoker uncivil blemish obturated theodor pyrrhotite bacchylides myelination katalase taloned stanchable geez doddering'.split(' ');
            }

        }

    }
})();