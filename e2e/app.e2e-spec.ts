import { SSYSGw2Page } from './app.po';

describe('ssysgw2 App', function() {
  let page: SSYSGw2Page;

  beforeEach(() => {
    page = new SSYSGw2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
