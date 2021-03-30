import React from 'react';
import ReactDOM from 'react-dom';
import Range from "../src/Range";

import { render, waitFor, screen, cleanup, wait } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import 'regenerator-runtime/runtime'

describe('Normal Range', () => {
    const componentProps = {
        slots: [2, 3, 4, 5, 6, 7, 8],
        minThumb: 0,
        maxThumb: 6
    };

    it("renders without crashing", async () => {
        const div = document.createElement("div");
        await waitFor(() => {
            ReactDOM.render(<Range />, div);
            ReactDOM.unmountComponentAtNode(div);
        })
    })

    it("renders min and max sliders", async () => {
        const { getByTestId } = render(<Range data={componentProps} normal />);

        await waitFor(() => {
            expect(getByTestId("min")).toBeInTheDocument();
            expect(getByTestId("max")).toBeInTheDocument();
        })
    })

    it("does not render component if there's no props", async () => {
        render(<Range />);

        await waitFor(() => {
            const child = screen.queryByTestId("slider-container");
            expect(child).not.toBeInTheDocument();
        })
    })

    it("renders the right length of slider", async () => {
        render(<Range data={componentProps} normal />);

        await waitFor(() => {
            const items = screen.getAllByTestId("slot-scale");
            expect(items.length).toEqual(componentProps.slots.length);
        })
    })

    it("min input is correct", async () => {
        const { getByTestId } = render(<Range data={componentProps} normal />);

        await waitFor(() => {
            expect(getByTestId("min-input")).toHaveDisplayValue(componentProps.slots[componentProps.minThumb]);
        })
    })

    it("max input is correct", async () => {
        const { getByTestId } = render(<Range data={componentProps} normal />);

        await waitFor(() => {
            expect(getByTestId("max-input")).toHaveDisplayValue(componentProps.slots[componentProps.maxThumb]);
        })
    })

    afterEach(cleanup);
})

describe('Special Range', () => {

})