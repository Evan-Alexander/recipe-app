import View from './View';
import recipeLinkView from './recipeLinkView';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No results found for your search.  Please try again.';
  _message = '';

  _generateMarkup() {
    console.log(this._data);
    return this._data
      .map(result => recipeLinkView.render(result, false))
      .join('');
  }
}

export default new ResultsView();
