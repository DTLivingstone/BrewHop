page('/', breweryController.index);
page('/:categoryId', breweryController.loadByBeer, breweryController.index);
page('/about', aboutController.index);
page('/profile/:breweryId',
  profileController.loadByBreweryId,
  profileController.index);

page();
