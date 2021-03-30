import React from 'react';
import Range from './Range';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

export default function App() {
    const [normalRange, setNormalRange] = React.useState();
    const [specialRange, setSpeciallRange] = React.useState();

    React.useEffect(() => {
        let _isMounted = true;
        const url = "https://mango-range.free.beeceptor.com";

        fetch(url + "/range-normal")
            .then(res => res.json())
            .then(res => {
                if (_isMounted) {
                    const { max, min } = res;

                    setNormalRange({
                        minThumb: min,
                        maxThumb: max
                    })
                }
            })
            .catch(() => {
                if (_isMounted) {
                    setNormalRange({
                        minThumb: 0,
                        maxThumb: 8
                    })
                }
            })

        fetch(url + "/range-special")
            .then(res => res.json())
            .then(res => {
                if (_isMounted) {
                    const { rangeValues } = res;

                    setSpeciallRange({
                        slots: rangeValues
                    })
                }
            })
            .catch(() => {
                if (_isMounted) {
                    setSpeciallRange({
                        slots: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99]
                    })
                }
            })

        return () => _isMounted = false;
    }, [])

    return (
        <>
            <h2 data-testid="header-text">React Slider</h2>
            <BrowserRouter>
                <Switch>
                    <Route path="/exercise1" >
                        <Link to="/">
                            {'⇐ Go back'}
                        </Link>
                        <Range data={normalRange} normal />
                    </Route>
                    <Route path="/exercise2">
                        <Link to="/">
                            {'⇐ Go back'}
                        </Link>
                        <Range data={specialRange} special />
                    </Route>
                    <Route path="/">
                        <ul>
                            <li>
                                <Link to="/exercise1" data-testid="route-1">
                                    Exercise 1
                                </Link>
                            </li>
                            <li>
                                <Link to="/exercise2" data-testid="route-2">
                                    Exercise 2
                                </Link>
                            </li>
                        </ul>
                    </Route>
                </Switch>
            </BrowserRouter>
        </>
    )
}