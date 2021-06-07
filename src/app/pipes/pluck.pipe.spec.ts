import {PluckPipe} from './pluck.pipe';

describe('PluckPipe', () => {
  it('create an instance', () => {
    const pipe = new PluckPipe();
    expect(pipe).toBeTruthy();
  });

  it('should puck values from a list of objects by the name of the property', () => {
    // given
    const pipe = new PluckPipe();
    const objectList = [{id: '1', name: 'a'}, {id: '2', name: 'b'}];

    // when
    const pluckedByName = pipe.transform(objectList, 'name');

    // then
    expect(pluckedByName).toEqual(['a', 'b']);
  });
});
