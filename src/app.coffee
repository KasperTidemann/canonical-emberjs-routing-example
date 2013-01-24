# Application:
App = Em.Application.create LOG_TRANSITIONS: true

# Views:
App.LogoView = Em.View.extend
	templateName: 'logo'
	classNames: ['logo']

App.TabView = Em.View.extend
	templateName: 'tab'
	classNames: ['tabs']

App.SliderView = Em.View.extend
	templateName: 'slider'
	classNames: ['slider']

App.Tab1View = Em.View.extend
	templateName: 'tab1'
	classNames: ['content']

App.Tab2View = Em.View.extend
	templateName: 'tab2'
	classNames: ['content']

App.Tab3View = Em.View.extend
	templateName: 'tab3'
	classNames: ['content']

# Router:
App.Router.map ->
	@route 'index', 
	@route 'tab1'
	@route 'tab2'
	@route 'tab3'

# Routes:
App.ApplicationRoute = Em.Route.extend
	events:
		goToTab1: ->
			@transitionTo 'tab1'

		goToTab2: ->
			@transitionTo 'tab2'

		goToTab3: ->
			@transitionTo 'tab3'

App.IndexRoute = Em.Route.extend
	redirect: ->
		@transitionTo 'tab1'

App.Tab1Route = Em.Route.extend
	enter: ->
		Em.run.next ->
			$('div.tabs').addClass 'tab1'
			$('div.slider div.foreground').stop().animate {'width': '90px'}, 1000
			$('div.slider div.handle').stop().animate {'left': '82px'}, 1000

	exit: ->
		$('div.tabs').removeClass 'tab1'

App.Tab2Route = Em.Route.extend
	enter: ->
		Em.run.next ->
			$('div.tabs').addClass 'tab2'
			$('div.slider div.foreground').stop().animate {'width': '180px'}, 1000
			$('div.slider div.handle').stop().animate {'left': '172px'}, 1000

	exit: ->
		$('div.tabs').removeClass 'tab2'

App.Tab3Route = Em.Route.extend
	enter: ->
		Em.run.next ->
			$('div.tabs').addClass 'tab3'
			$('div.slider div.foreground').stop().animate {'width': '271px'}, 1000
			$('div.slider div.handle').stop().animate {'left': '263px'}, 1000

	exit: ->
		$('div.tabs').removeClass 'tab3'