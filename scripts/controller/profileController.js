(function(module) {
  var profileController = {
    index: function() {
      FilterUniqueBreweryIds(breweryView.initProfilePage);
      $('main > section').hide();
      $('#profiles').show();
    },

    loadByBreweryId: function(ctx, next) {
      console.log(ctx);
    }
  };

  module.profileController = profileController;
})(window);
