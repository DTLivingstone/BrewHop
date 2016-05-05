(function(module) {
  var aboutController = {};

  aboutController.index = function() {
    $('#about').show().siblings().hide();
  };

  module.aboutController = aboutController;
})(window);
