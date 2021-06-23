import {HighlightSearchPipe} from './highlight-search.pipe';

describe('HighlightSearchPipe', () => {
  it('create an instance', () => {
    const pipe = new HighlightSearchPipe();
    expect(pipe).toBeTruthy();
  });

  it('should enclose text with html span tag', () => {
    // given
    const pipe = new HighlightSearchPipe();
    const text = 'highlight me';
    const highlightFilter = 'm';

    // when
    const highlightedText = pipe.transform(text, highlightFilter);

    // then
    expect(highlightedText).toEqual('highlight <span class="highlighted-text">m</span>e');
  });

  it('should enclose the same filter string multiple times', () => {
    // given
    const pipe = new HighlightSearchPipe();
    const text = 'highlight me';
    const highlightFilter = 'h';

    // when
    const highlightedText = pipe.transform(text, highlightFilter);

    // then
    expect(highlightedText).toEqual('<span class="highlighted-text">h</span>ig<span class="highlighted-text">h</span>lig<span class="highlighted-text">h</span>t me');
  });

  it('should be case insensitive when searching but case sensitive when replacing', () => {
    // given
    const pipe = new HighlightSearchPipe();
    const text = 'Highlight me';
    const highlightFilter = 'h';

    // when
    const highlightedText = pipe.transform(text, highlightFilter);

    // then
    expect(highlightedText).toEqual('<span class="highlighted-text">H</span>ig<span class="highlighted-text">h</span>lig<span class="highlighted-text">h</span>t me');
  });
});
