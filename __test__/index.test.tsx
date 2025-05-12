import React from 'react';

import {render} from "@testing-library/react-native";
import Index from '../app/index';


describe("Homeview", () => {
    test('should render', () => {
        const wrapper = render(<Index/>)
        wrapper.getByTestId('home-screen')
    });
})
