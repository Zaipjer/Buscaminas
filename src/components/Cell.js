import React from 'react';
import { mineColor } from '../util/MineColor';
import bomb from '../images/bxs-bomb.svg';
import flag from '../images/bxs-flag.svg';

const Cell = (props) => {

    const style = {
        width: whCell(props.lengthBoard),
        height: whCell(props.lengthBoard),
        background: props.details.revealed
            ? props.details.value === 'X'
                ? mineColor()
                : bombCheckPattern(props.details.x, props.details.y)
            : checkPattern(props.details.x, props.details.y),
        color: numColorCode(props.details.value)
    }

    return (
        <div
            onContextMenu={(e) => props.updateFlag(e, props.details.x, props.details.y)}
            onClick={() => props.revealCell(props.details.x, props.details.y)}
            style={style}
            className="cellStyle"
        >
            {props.details.revealed ?
                props.details.value !== 'X' ?
                    props.details.value
                    : null
                : null
            }
            {props.details.flagged ?
                <img src={flag} alt="Flag" />
                : null
            }
            {props.details.revealed ?
                props.details.value === 'X' ?
                    !props.details.flagged ?
                        <img src={bomb} alt="Bomb" />
                        : null
                    : null
                : null
            }

            {/*props.details.value !== 0 && props.details.value */}
        </div>
    );
}

export default Cell;

const bombCheckPattern = (x, y) => {
    if (x % 2 === 0 && y % 2 === 0) {
        return "#e5c29f"
    } else if (x % 2 === 0 && y % 2 !== 0) {
        return "#e1b890"
    } else if (x % 2 !== 0 && y % 2 === 0) {
        return "#e1b890"
    } else {
        return "#e5c29f"
    }
}

const checkPattern = (x, y) => {
    if (x % 2 === 0 && y % 2 === 0) {
        return "#aad751"
    } else if (x % 2 === 0 && y % 2 !== 0) {
        return "#9ace39"
    } else if (x % 2 !== 0 && y % 2 === 0) {
        return "#9ace39"
    } else {
        return "#aad751"
    }
}

const numColorCode = (num) => {
    if (num === 1) {
        return "#1976d2";
    } else if (num === 2) {
        return "#388d3c";
    } else if (num === 3) {
        return "#d33030";
    } else if (num === 4) {
        return "#7c21a2";
    } else if (num >= 5) {
        return "#1976d2";
    } else {
        return "transparent";
    }
}

const whCell = (length) => {
    if (length === 10) {
        return "40px"
    } else if (length === 14) {
        return "30px"
    } else if (length === 20) {
        return "22px"
    }
}