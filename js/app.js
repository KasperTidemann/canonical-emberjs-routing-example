var App;

App = Em.Application.create({
  LOG_TRANSITIONS: true
});

App.LogoView = Em.View.extend({
  templateName: 'logo',
  classNames: ['logo']
});

App.TabView = Em.View.extend({
  templateName: 'tab',
  classNames: ['tabs']
});

App.SliderView = Em.View.extend({
  templateName: 'slider',
  classNames: ['slider']
});

App.Tab1View = Em.View.extend({
  templateName: 'tab1',
  classNames: ['content']
});

App.Tab2View = Em.View.extend({
  templateName: 'tab2',
  classNames: ['content']
});

App.Tab3View = Em.View.extend({
  templateName: 'tab3',
  classNames: ['content']
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

App.Tab1Route = Em.Route.extend({
  enter: function() {
    return Em.run.next(function() {
      $('div.tabs').addClass('tab1');
      $('div.slider div.foreground').stop().animate({
        'width': '90px'
      }, 1000);
      return $('div.slider div.handle').stop().animate({
        'left': '82px'
      }, 1000);
    });
  },
  exit: function() {
    return $('div.tabs').removeClass('tab1');
  }
});

App.Tab2Route = Em.Route.extend({
  enter: function() {
    return Em.run.next(function() {
      $('div.tabs').addClass('tab2');
      $('div.slider div.foreground').stop().animate({
        'width': '180px'
      }, 1000);
      return $('div.slider div.handle').stop().animate({
        'left': '172px'
      }, 1000);
    });
  },
  exit: function() {
    return $('div.tabs').removeClass('tab2');
  }
});

App.Tab3Route = Em.Route.extend({
  enter: function() {
    return Em.run.next(function() {
      $('div.tabs').addClass('tab3');
      $('div.slider div.foreground').stop().animate({
        'width': '271px'
      }, 1000);
      return $('div.slider div.handle').stop().animate({
        'left': '263px'
      }, 1000);
    });
  },
  exit: function() {
    return $('div.tabs').removeClass('tab3');
  }
});
