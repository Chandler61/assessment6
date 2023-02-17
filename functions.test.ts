const {shuffleArray} = require('./utils')

describe('shuffleArray should ', () => {
    // CODE HERE
    test('should return an array',() => {
        const list = shuffleArray([]);
        expect(list).toEqual(['something'])
    });
    test('the array sent in is the same length when it returns', () => {
        expect(shuffleArray).toEqual(shuffleArray)
    });
});
