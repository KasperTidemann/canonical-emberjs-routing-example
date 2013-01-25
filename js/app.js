var App;

App = Em.Application.create({
  LOG_TRANSITIONS: true
});

App.Tab2Controller = Em.Controller.extend({
  randomNumber: null
});

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
    return Em.run.next(function() {
      $('div.tabs').removeClass('tab1 tab2 tab3');
      $('div.tabs').addClass(tab);
      $('div.slider div.foreground').stop().animate({
        'width': width
      }, 1000);
      return $('div.slider div.handle').stop().animate({
        'left': left
      }, 1000);
    });
  },
  didInsertElement: function() {
    return this.animateTab();
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

App.Router.map(function() {
  this.route('index', this.route('tab1'));
  this.route('tab2');
  return this.route('tab3');
});

App.ApplicationRoute = Em.Route.extend({
  events: {
    goToTab1: function() {
      return this.transitionTo('tab1');
    },
    goToTab2: function() {
      return this.transitionTo('tab2');
    },
    goToTab3: function() {
      return this.transitionTo('tab3');
    }
  }
});

App.IndexRoute = Em.Route.extend({
  redirect: function() {
    return this.transitionTo('tab1');
  }
});

App.Tab2Route = Em.Route.extend({
  renderTemplate: function(controller) {
    this.render('tab2');
    return controller.set('randomNumber', Math.round(10 * Math.random()));
  }
});