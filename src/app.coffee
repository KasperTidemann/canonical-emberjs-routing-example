$ ->
	# Create a new App namespace:

	App = Em.Application.create()

	# Create the application controller alongside the application view that's
	# found in the index.html file:

	App.ApplicationController = Em.Controller.extend()
	App.ApplicationView = Em.View.extend
		templateName: 'application'

	# Create the logo view for showing the Ember logo in the example:

	App.LogoView = Em.View.extend
		templateName: 'logo'
		classNames: ['logo']

	# Create the tab view for showing the three tabs in the example:

	App.TabView = Em.View.extend
		templateName: 'tab'
		classNames: ['tabs']

	# Create the slider view for showing the slider below the tabs:

	App.SliderView = Em.View.extend
		templateName: 'slider'
		classNames: ['slider']

	# Create the tab1 controller (the "Canonical" tab) alongside the view:

	App.Tab1Controller = Em.Controller.extend()
	App.Tab1View = Em.View.extend
		templateName: 'tab1'
		classNames: ['content']

	# Create the tab2 controller (the "routing" tab) alongside the view:

	App.Tab2Controller = Em.Controller.extend()
	App.Tab2View = Em.View.extend
		templateName: 'tab2'
		classNames: ['content']

	# Create the tab3 controller (the "example" tab) alongside the view:

	App.Tab3Controller = Em.Controller.extend()
	App.Tab3View = Em.View.extend
		templateName: 'tab3'
		classNames: ['content']

	# Create the router containing the 'root' state plus four sub-states
	# handling 1) the default index state and 2) the showing of the three
	# tabs and their associated views in the 'application' outlet:

	App.Router = Em.Router.extend
		enableLogging: true
		location: 'hash'

		root: Em.Route.extend

			# These three actions are defined to allow us to call them from
			# the index.html "tab" template like so: {{action goToTab1}}

			goToTab1: Ember.Route.transitionTo('tab1')
			goToTab2: Ember.Route.transitionTo('tab2')
			goToTab3: Ember.Route.transitionTo('tab3')

			index: Em.Route.extend
				route: '/'
				redirectsTo: 'tab1'

			tab1: Em.Route.extend
				route: '/tab1'

				connectOutlets: (router, context) ->
					router.get('applicationController').connectOutlet
						name: 'tab1'

				enter: ->

					# On the initial load, Ember will not have rendered the App.TabView yet (with
					# the classNames ['tabs'], therefore div.tabs in the HTML), so we need to wait
					# till the next run loop at which point the div.tabs will have been inserted
					# into the DOM - and be available to us:

					Em.run.next ->
						$('div.tabs').addClass 'tab1'
						$('div.slider div.foreground').stop().animate {'width': '90px'}, 1000
						$('div.slider div.handle').stop().animate {'left': '82px'}, 1000

				exit: ->
					$('div.tabs').removeClass 'tab1'

			tab2: Em.Route.extend
				route: '/tab2'

				connectOutlets: (router, context) ->
					router.get('applicationController').connectOutlet
						name: 'tab2'

				enter: ->
					Em.run.next ->
						$('div.tabs').addClass 'tab2'
						$('div.slider div.foreground').stop().animate {'width': '180px'}, 1000
						$('div.slider div.handle').stop().animate {'left': '172px'}, 1000

				exit: ->
					$('div.tabs').removeClass 'tab2'

			tab3: Em.Route.extend
				route: '/tab3'

				connectOutlets: (router, context) ->
					router.get('applicationController').connectOutlet
						name: 'tab3'

				enter: ->
					Em.run.next ->
						$('div.tabs').addClass 'tab3'
						$('div.slider div.foreground').stop().animate {'width': '271px'}, 1000
						$('div.slider div.handle').stop().animate {'left': '263px'}, 1000

				exit: ->
					$('div.tabs').removeClass 'tab3'

	# Here, we expose the App namespace to the global namespace. This is done
	# because of CoffeeScript initially compiling line 4,
	# 
	#	App = Em.Application.create()
	# 
	# ... into the following:
	#
	# var App;
  # App = Em.Application.create();
  #
  # ... in the compiled app.js file. The var App; part defines the App variable
  # as belonging to only the local scope, which is the anonymous function inside
  # the $() function call - and this is what we make up for below via the global
  # namespace exposure:

	window.App = App;

	# Finally, initialize our glorious Ember application:
	App.initialize()