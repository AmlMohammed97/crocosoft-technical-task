import { isYotubeVideoUrlValid } from './quizUtils';

describe('quizUtils', () => {
    test(`isYotubeVideoUrlValid with valid url`, () => {
        const isValid = isYotubeVideoUrlValid('https://www.youtube.com/watch?v=e6EGQFJLl04');
        expect(isValid).toBeTruthy();
    });
    test(`isYotubeVideoUrlValid with invalid url`, () => {
        const isValid = isYotubeVideoUrlValid('https://www.youtube.com');
        expect(isValid).toBeFalsy();
    });
});