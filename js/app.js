/*
	#1: Application creation:

	Explanation: here, we create our application and turn on logging between transitions:
*/

var App = Em.Application.create({
  LOG_TRANSITIONS: true
});

/*
	#2: Controllers:

	Explanation: in Ember.js, your controllers are created automagically in the router per
	default. However, in some cases, you may want to extend a controller explicitly in order
	to implement some functionality inside the controller.

	Below, we're extending the Tab2Controller that belongs to the '/tab2' route in order to
	have it contain a random number.
*/

App.Tab2Controller = Em.Controller.extend({
  randomNumber: null
});

/* 
	#3: Views:

	Explanation: this section contains the views that we're extending. Notice that we're only
	extending the views that are not created by the router itself. Or, in other words:

	When you create a new route, a controller and a view will be created for you automagically
	(among other things). This is covered in detail here:

	http://emberjs.com/guides/concepts/naming-conventions/

	Now, while that is great and saves us from typing a whole bunch of code, sometimes we
	may want to render (and reuse) views that are not part of the router automagic. I don't
	actually reuse the views below, but the point is that by defining the App.LogoView below,
	we can render it wherever we want via the {{view}} helper like so: {{view App.LogoView}}.
*/

App.LogoView = Em.View.extend({
  templateName: 'logo',
  classNames: ['logo']
});

App.TabsView = Em.View.extend({
  templateName: 'tabs',
  classNames: ['tabs']
});

App.TabView = Em.View.extend({
  classNames: ['content'],
	
  tabPositions: {
    tab1: {
      width: '90px',
      left: '82px'
    },
    tab2: {
      width: '180px',
      left: '172px'
    },
    tab3: {
      width: '271px',
      left: '263px'
    }
  },
	
  animateTab: function() {
    var left, tab, width;
    tab = this.get('templateName');
    width = this.get('tabPositions.' + tab + '.width');
    left = this.get('tabPositions.' + tab + '.left');
		
    Em.run.next(function() {
      $('div.tabs').removeClass('tab1 tab2 tab3');
      $('div.tabs').addClass(tab);
      $('div.slider div.foreground').stop().animate({
        'width': width
      }, 1000);
      $('div.slider div.handle').stop().animate({
        'left': left
      }, 1000);
    });
  },
	
  didInsertElement: function() {
    this.animateTab();
  }
});

App.SliderView = Em.View.extend({
  templateName: 'slider',
  classNames: ['slider']
});

App.Tab1View = App.TabView.extend({
  templateName: 'tab1'
});

App.Tab2View = App.TabView.extend({
  templateName: 'tab2'
});

App.Tab3View = App.TabView.extend({
  templateName: 'tab3'
});

/*
	#4: The router:

	Explanation: the router of the application defines the routes that are accessible in
	the browser. By default, this.route('index') maps to '/', this.route('tab1') maps to
	'/tab1' etc.
*/

App.Router.map(function() {
  this.route('index', { path: '/' });
  this.route('tab1');
  this.route('tab2');
  this.route('tab3');
});

/*
	#5: The application route:

	Explanation: we're extending a specific route below, namely the application route. But
	what is that exactly?

	All Ember.js applications have an application route that sits on top of all other routes,
	so to speak. It's the main route and is normally implicitly created and not implemented
	like we do below. So, why is it there?

	1) If you take a look at the "tabs" template in the index.html file, notice how we make use
	of the {{action}} helper: <div {{action goToTab1}}>, for instance.

	2) By doing so, when clicking on a tab, the associated action is sent to the route
	in question. This means that if you're at '/tab2' in the browser, the "goToTab1" action
	will be sent to the App.Tab1Route in the code - but that's not defined here!

	3) If no route has been defined and therefore, no events object is present on the route,
	the event itself - "goToTab1" - bubbles upwards to the application route.

	4) So, instead of adding the events: { ... } object to Tab1Route, Tab2Route, and Tab3Route
	explicitly, we take advantage of the fact that events bubble upwards to the next route,
	which in this case is the ApplicationRoute.

	(And yes, sorry for the lengthy explanation, but I hope this clears up things.)
*/

App.ApplicationRoute = Em.Route.extend({
  events: {
    goToTab1: function() {
      this.transitionTo('tab1');
    },
    goToTab2: function() {
      this.transitionTo('tab2');
    },
    goToTab3: function() {
      this.transitionTo('tab3');
    }
  }
});

/*
	# 6: The index route:

	Explanation: the index route is extended explicitly in order to have it redirect to the first
	tab when the user visits '/' in the browser.
*/

App.IndexRoute = Em.Route.extend({
  redirect: function() {
    this.transitionTo('tab1');
  }
});

/*
	#7: The tab2 route:

	Explanation: remember that all routes are extended automagically by the Ember.js router, right?
	Again, that's great for saving typing, but what if we want for the browser to do something
	specific when entering a route?

	In this case, when entering '/tab2', a random number is displayed in the "tab2" view. And this
	random number is generated in the below App.Tab2Route. By default, the controller part maps
	to the Tab2Controller, so all we need to do is to set the random number on the controller like
	so:
*/

App.Tab2Route = Em.Route.extend({
  renderTemplate: function(controller) {
    this.render('tab2');
    controller.set('randomNumber', Math.round(10 * Math.random()));
  }
});