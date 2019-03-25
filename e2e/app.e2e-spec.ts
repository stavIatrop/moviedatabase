import { AppPage } from './app.po';

<<<<<<< HEAD
describe('c1 App', () => {
=======
describe('movie-database App', () => {
>>>>>>> 70f208448a3b108d6fcacce238506d19430a9093
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
