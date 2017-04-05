import { CartoscopePage } from './app.po';

describe('cartoscope App', function() {
  let page: CartoscopePage;

  beforeEach(() => {
    page = new CartoscopePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
