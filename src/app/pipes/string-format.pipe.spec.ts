import {StringFormatPipe} from './string-format.pipe';

describe('StringFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new StringFormatPipe();
    expect(pipe).toBeTruthy();
  });

  it('should puck values from a list of objects by the name of the property', () => {
    // given
    const pipe = new StringFormatPipe();
    const formatString = 'A ${1} B ${0} C';
    const args = ['X', 'y'];

    // when
    const formatted = pipe.transform(formatString, ...args);

    // then
    expect(formatted).toEqual('A y B X C');
  });
});
