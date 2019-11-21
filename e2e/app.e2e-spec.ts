import { FoodfluentPage } from './app.po';

describe('foodfluent App', () => {
  let page: FoodfluentPage;

  beforeEach(() => {
    page = new FoodfluentPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
