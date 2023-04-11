import {act} from "@testing-library/react";
import {goToTop} from "./utils.js";


describe('Utils Tests Suit', function () {
    test('Test if goToTop scrolls', () => {

        // arrange
        const mockScroll = jest.fn();

        Object.defineProperty(global.window, 'scrollTo', {value: mockScroll});

        act(() => {
            goToTop();
        })

        expect(mockScroll)
            .toHaveBeenCalledWith(
                {
                    top: 0,
                    behavior: 'smooth',
                });

    })
})
