import { MicrocensusPage } from './app.po';

describe('microcensus App', function() {
  let page: MicrocensusPage;

  beforeEach(() => {
    page = new MicrocensusPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
