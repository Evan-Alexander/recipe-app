import View from './View';
import recipeLinkView from './recipeLinkView';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet, bookmark a recipe to get started!';
  _message = '';

  addhandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data
      .map(bookmark => recipeLinkView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
