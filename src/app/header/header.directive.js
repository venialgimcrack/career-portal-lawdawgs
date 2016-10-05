class CareerPortalHeaderController {
    constructor(configuration, $location, SharedData) {
        'ngInject';

        this.SharedData = SharedData;
        this.$location = $location;
        this.configuration = configuration;
    }

    toggleFilters() {
        var $portalCanvas = document.querySelector('.portal-canvas');
        var $mask = document.querySelector('#mask');

        if ($portalCanvas) {
            $portalCanvas.classList.toggle('show-nav');
        }

        if ($mask) {
            $mask.classList.toggle('active');
        }
    }

    goBack() {
        this.$location.path('/jobs');
    }

    hasEvergreen() {
        return this.SharedData.evergreenDetailData !== null;
    }

    applyModal() {
        if (this.hasEvergreen()) {
            this.SharedData.modalState = 'open';
            this.SharedData.evergreenApply = true;
        }
    }
}

class CareerPortalHeader {
    constructor() {
        'ngInject';

        let directive = {
            restrict: 'E',
            templateUrl: 'app/header/header.html',
            scope: false,
            controller: CareerPortalHeaderController,
            controllerAs: 'header',
            bindToController: true,
            replace: true
        };

        return directive;
    }
}

export default CareerPortalHeader;
