import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App';

import { cleanup, render, waitFor } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import 'regenerator-runtime/runtime'

describe('App', () => {
    global.fetch = () => {return Promise.resolve('', 200)}

    it("renders without crashing", async () => {
        const div = document.createElement("div");
        await waitFor(() => {
            ReactDOM.render(<App/>, div);
            ReactDOM.unmountComponentAtNode(div);
        })
    })

    it("should render the h2 tag", async() => {
        const { getByTestId } = render(<App/>);

        await waitFor(() => {
            expect(getByTestId("header-text")).toHaveTextContent("React Slider");
        });
    })

    it("should render the links to the exercise components", async() => {
        const { getByTestId } = render(<App/>);

        
        await waitFor(() => {
            expect(getByTestId("route-1")).toBeInTheDocument();
            expect(getByTestId("route-2")).toBeInTheDocument();
        })
    })

    afterEach(() => {
        global.fetch = fetch;
        cleanup();
    })
})
