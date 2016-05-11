(function(module) {
  var aboutController = {};

  aboutController.index = function() {
    aboutView.index();
  };

  module.aboutController = aboutController;
})(window);
