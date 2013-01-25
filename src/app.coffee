# Application:
App = Em.Application.create LOG_TRANSITIONS: true

# Controllers:
App.Tab2Controller = Em.Controller.extend
	randomNumber: null

# Views:
App.LogoView = Em.View.extend
	templateName: 'logo'
	classNames: ['logo']

App.TabsView = Em.View.extend
	templateName: 'tabs'
	classNames: ['tabs']

App.TabView = Em.View.extend
	classNames: ['content']

	tabPositions:
		tab1:
			width: '90px'
			left: '82px'
		tab2:
			width: '180px'
			left: '172px'
		tab3:
			width: '271px'
			left: '263px'

	animateTab: ->
		tab = @get('templateName')
		width = @get('tabPositions.' + tab + '.width')
		left = @get('tabPositions.' + tab + '.left')

		Em.run.next ->
			$('div.tabs').removeClass 'tab1 tab2 tab3'
			$('div.tabs').addClass tab
			$('div.slider div.foreground').stop().animate { 'width': width }, 1000
			$('div.slider div.handle').stop().animate { 'left': left }, 1000

	didInsertElement: ->
		@animateTab()

App.SliderView = Em.View.extend
	templateName: 'slider'
	classNames: ['slider']

App.Tab1View = App.TabView.extend
	templateName: 'tab1'		

App.Tab2View = App.TabView.extend
	templateName: 'tab2'

App.Tab3View = App.TabView.extend
	templateName: 'tab3'

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

App.Tab2Route = Em.Route.extend
	renderTemplate: (controller) ->
		@render 'tab2'
		controller.set 'randomNumber', Math.round 10 * Math.random()