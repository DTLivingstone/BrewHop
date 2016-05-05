page('/', breweryController.index);
page('/:categoryId', breweryController.loadByBeer, breweryController.index);
page('/about', aboutController.index);
page('/profile/:breweryName', profileController.index);

page();
