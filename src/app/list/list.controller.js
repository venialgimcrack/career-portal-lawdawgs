class JobListController {
    constructor(SharedData, SearchService, evergreen) {
        'ngInject';

        this.SearchService = SearchService;
        this.SharedData = SharedData;

        // Set the view state
        this.SharedData.viewState = 'overview-closed';

        this.evergreen = evergreen;

        this.SearchService.currentDetailData = null;
    }

    loadMoreData() {
        this.SearchService.searchParams.reloadAllData = false;
        this.SearchService.findJobs();
    }

    clearSearchParamsAndLoadData() {
        this.SearchService.helper.clearSearchParams();
        this.SearchService.searchParams.reloadAllData = true;
        this.SearchService.findJobs();
    }
}

export default JobListController;
