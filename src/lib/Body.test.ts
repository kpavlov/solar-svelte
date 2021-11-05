import {Body} from "./Body";

test('create Body', () => {
    let sut = new Body('id1', 'name1', 123, '#aabbcc');
    expect(sut).toHaveProperty('id', 'id1')
    expect(sut).toHaveProperty('name', 'name1')
    expect(sut).toHaveProperty('radius', 123)
    expect(sut).toHaveProperty('color', '#aabbcc')
});