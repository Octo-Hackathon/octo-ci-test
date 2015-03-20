'use strict';

describe('main tests', function() {
  beforeEach(function() {module('routerApp');});

	  describe('basic test', function($rootScope) {
	    it('vendor', inject(function($rootScope, $state, $injector, $compile) {

	      var config = $state.get('vendor');
	      expect(config.url).toEqual('/vendor');

	      
	      }));
	  });

  });