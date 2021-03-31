import React from 'react';
import Draggable from 'react-draggable';

class Range extends React.Component {
    state = {}

    componentDidMount() {
        const { data } = this.props;
        const { minThumb, maxThumb, slots } = data;

        if (!slots) {
            if (minThumb !== undefined && maxThumb !== undefined) {
                const slotArray =  Array.from({
                    length: maxThumb - minThumb + 1
                }, (_, i) => i + minThumb)


                const minIndex = slotArray.findIndex(slot => slot === minThumb);
                const maxIndex = slotArray.findIndex(slot => slot === maxThumb);

                this.setState({
                    slots: Array.from({
                        length: maxThumb - minThumb + 1
                    }, (_, i) => i + minThumb),
                    minThumb: minIndex,
                    maxThumb: maxIndex
                })
            }
        } else if (!minThumb && !maxThumb) {
            const max = slots.length -1;

            this.setState({
                minThumb: 0,
                maxThumb: max,
                slots
            })
        }
    }

    onInputChange = (e, type) => {
        let value = parseInt(e.target.value);
        const index = this.state.slots.findIndex(slot => slot === value);

        if (index >= 0) {
            if (type === "max") {
                if (index > this.state.minThumb) {
                    this.setState({
                        maxThumb: index
                    })
                }

            } else if (type === "min") {
                if (index < this.state.maxThumb) {
                    this.setState({
                        minThumb: index
                    })
                }
            }
        }

    }

    onDrag = (_, ui, type) => {
        const { x } = ui;
        const value = x / 2 / 10;

        if (type === "max") {
            this.setState({
                maxThumb: value
            })
        } else {
            this.setState({
                minThumb: value
            })
        }
    }

    MinSlider = () => {
        return (
            <Draggable
                grid={[20, 20]}
                defaultPosition={{
                    x: this.state.minThumb * 2 * 10,
                    y: 0
                }}
                bounds={{
                    right: (this.state.maxThumb - 1) * 2 * 10,
                    left: 0
                }}
                position={{
                    x: this.state.minThumb * 2 * 10,
                    y: 0
                }}
                axis="x"
                onDrag={(e, ui) => this.onDrag(e, ui, "min")}>
                <div data-testid="min" className="slider-thumb slider-thumb-min" />
            </Draggable>
        );
    }

    MaxSlider = () => {
        return (
            <Draggable
                data-testid="draggable-max"
                grid={[20, 20]}
                defaultPosition={{
                    x: this.state.maxThumb * 2 * 10,
                    y: 0
                }}
                bounds={{
                    right: (this.state.slots.length - 1) * 2 * 10,
                    left: (this.state.minThumb + 1) * 2 * 10
                }}
                position={{
                    x: this.state.maxThumb * 2 * 10,
                    y: 0
                }}
                onDrag={(e, ui) => this.onDrag(e, ui, "max")}
                axis="x">
                <div data-testid="max" className="slider-thumb slider-thumb-min" />
            </Draggable>
        );
    }

    render() {
        return (
            <>
                {(
                    this.state.slots !== undefined &&
                    this.state.minThumb !== undefined &&
                    this.state.maxThumb !== undefined
                ) && <div className="slider-container" data-testid="slider-container">
                        <div className="slider-scale">
                            {this.state.slots.map(slot => {
                                const min = this.state.slots[0];
                                const max = this.state.slots[this.state.slots.length - 1];

                                if (slot === min) {
                                    if (this.props.normal) {
                                        return (
                                            <div key={slot}
                                                data-testid="slot-scale"
                                                className="slot-scale">
                                                <input
                                                    type={"number"}
                                                    data-testid="min-input"
                                                    onChange={(e) => this.onInputChange(e, "min")}
                                                    style={{ width: "100%" }}
                                                    value={this.state.slots[this.state.minThumb]} />
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div key={slot}
                                                data-testid="slot-scale"
                                                className="slot-scale">
                                                {this.state.slots[this.state.minThumb] + "€"}
                                            </div>
                                        )
                                    }
                                }

                                if (slot === max) {
                                    if (this.props.normal) {
                                        return (
                                            <div key={slot}
                                                data-testid="slot-scale"
                                                className="slot-scale">
                                                <input
                                                    type={"number"}
                                                    data-testid="max-input"
                                                    onChange={(e) => this.onInputChange(e, "max")}
                                                    style={{ width: "100%" }}
                                                    value={this.state.slots[this.state.maxThumb]} />
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div key={slot}
                                                data-testid="slot-scale"
                                                className="slot-scale">
                                                {this.state.slots[this.state.maxThumb] + "€"}
                                            </div>
                                        )
                                    }
                                }

                                return <div key={slot}
                                    data-testid="slot-scale"
                                    className="slot-scale" />


                            })}
                            <this.MinSlider />
                            <this.MaxSlider />
                        </div>
                        <div className="slider">
                            {this.state.slots.map((slot, i) => (
                                <div
                                    data-slot={i}
                                    key={i}
                                    className="slot">
                                    <div data-slot={i} className={`line${slot <= this.state.slots[this.state.maxThumb] && slot >= this.state.slots[this.state.minThumb] ? ' line-selected' : ''}`} />
                                    <span className="scale-mark"></span>
                                </div>
                            ))}
                        </div>
                    </div>}
            </>
        );
    }
}

export default Range;