(function(module) {
  var profileController = {
    index: function() {
      FilterUniqueBreweryIds(breweryView.initProfilePage);
      $('main > section').hide();
      $('#').show();
    }
  };

  module.profileController = profileController;
})(window);
