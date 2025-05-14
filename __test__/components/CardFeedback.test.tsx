import React from 'react';

import {render} from "@testing-library/react-native";
import CardFeedback from "../../components/CardFeedback";


describe("Homeview", () => {
    test('should render', () => {
        const wrapper = render(<CardFeedback/>)
        wrapper.getByTestId('CardFeedback')
    });
})
