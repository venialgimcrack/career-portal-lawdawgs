function routerConfig($stateProvider, $urlRouterProvider) {
    'ngInject';

    var loadEvergreenData = function (SearchService, SharedData, $q, $location) {

        var deferred = $q.defer(),
            searchObj = $location.search(),
            evergreenJobId = parseInt(searchObj.evergreen, 10);

        if (!!evergreenJobId) {

            SearchService.loadJobData(evergreenJobId, function (evergreenJob) {

                SharedData.evergreenDetailData = null;
                SharedData.evergreenDetailData = evergreenJob;

                deferred.resolve(evergreenJob);

            }, function () {
                deferred.resolve(null);
            });

        } else {
            deferred.resolve(null);
        }

        return deferred.promise;
    };

    $stateProvider
        .state('jobs', {
            url: '/jobs',
            templateUrl: 'app/list/list.html',
            controller: 'JobListController',
            controllerAs: 'list',
            resolve: {
                evergreen: loadEvergreenData
            }
        })
        .state('detail', {
            url: '/jobs/:id',
            templateUrl: 'app/detail/detail.html',
            controller: 'JobDetailController',
            controllerAs: 'detail',
            resolve: {
                job: function (SearchService, $stateParams, $q) {
                    var deferred = $q.defer();

                    SearchService.loadJobData($stateParams.id, function (job) {
                        // Unset details
                        SearchService.currentDetailData = null;
                        // Set details
                        SearchService.currentDetailData = job;
                        deferred.resolve(job);
                    }, function () {
                        deferred.resolve(null);
                    });

                    return deferred.promise;
                },

                evergreen: loadEvergreenData
            }
        });

    $urlRouterProvider.otherwise('/jobs');
}

export default routerConfig;
