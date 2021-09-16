const revealed = (arr, x, y, newNonMinesCount) => {
    //console.log(arr[y][x]);

    if (arr[y][x].revealed) {
        return { arr, newNonMinesCount };
    }
    let flipped = [];
    flipped.push(arr[y][x]);
    while (flipped.length !== 0) {
        let single = flipped.pop();

        if (!single.revealed) {
            newNonMinesCount--;
            single.revealed = true;
        }

        if (single.value) {
            break;
        }

        // setTimeOut( () =>
        // Agregar al arreglo las celdas que tengan 0
        // Top Left
        if (
            single.x > 0 &&
            single.y > 0 &&
            arr[single.y - 1][single.x - 1].value === 0 &&
            !arr[single.y - 1][single.x - 1].revealed &&
            !arr[single.y - 1][single.x - 1].flagged
        ) {
            flipped.push(arr[single.y - 1][single.x - 1]);
        }
        // Botttom Right
        if (
            single.y < arr.length - 1 &&
            single.x < arr[0].length - 1 &&
            arr[single.y + 1][single.x + 1].value === 0 &&
            !arr[single.y + 1][single.x + 1].revealed &&
            !arr[single.y + 1][single.x + 1].flagged
        ) {
            flipped.push(arr[single.y + 1][single.x + 1]);
        }
        // Top Right
        if (
            single.x < arr[0].length - 1 &&
            single.y > 0 &&
            arr[single.y - 1][single.x + 1].value === 0 &&
            !arr[single.y - 1][single.x + 1].revealed &&
            !arr[single.y - 1][single.x + 1].flagged
        ) {
            flipped.push(arr[single.y - 1][single.x + 1]);
        }
        // Bottom Left
        if (
            single.x > 0 &&
            single.y < arr.length - 1 &&
            arr[single.y + 1][single.x - 1].value === 0 &&
            !arr[single.y + 1][single.x - 1].revealed &&
            !arr[single.y + 1][single.x - 1].flagged
        ) {
            flipped.push(arr[single.y + 1][single.x - 1]);
        }

        // Left
        if (
            single.x > 0 &&
            arr[single.y][single.x - 1].value === 0 &&
            !arr[single.y][single.x - 1].revealed &&
            !arr[single.y][single.x - 1].flagged
        ) {
            flipped.push(arr[single.y][single.x - 1]);
        }
        // Right
        if (
            single.x < arr[0].length - 1 &&
            arr[single.y][single.x + 1].value === 0 &&
            !arr[single.y][single.x + 1].revealed &&
            !arr[single.y][single.x + 1].flagged
        ) {
            flipped.push(arr[single.y][single.x + 1]);
        }
        // Top
        if (
            single.y > 0 &&
            arr[single.y - 1][single.x].value === 0 &&
            !arr[single.y - 1][single.x].revealed &&
            !arr[single.y - 1][single.x].flagged
        ) {
            flipped.push(arr[single.y - 1][single.x]);
        }
        // Bottom
        if (
            single.y < arr.length - 1 &&
            arr[single.y + 1][single.x].value === 0 &&
            !arr[single.y + 1][single.x].revealed &&
            !arr[single.y + 1][single.x].flagged
        ) {
            flipped.push(arr[single.y + 1][single.x]);
        }

        // Comience a revelar elementos
        if (
            single.x > 0 &&
            single.y > 0 &&
            !arr[single.y - 1][single.x - 1].revealed &&
            !arr[single.y - 1][single.x - 1].flagged
        ) {
            //Revelar Top Left

            arr[single.y - 1][single.x - 1].revealed = true;
            newNonMinesCount--;
        }

        if (single.y > 0 && !arr[single.y - 1][single.x].revealed && !arr[single.y - 1][single.x].flagged) {
            // Revelar Top
            arr[single.y - 1][single.x].revealed = true;
            newNonMinesCount--;
        }

        if (
            single.x < arr[0].length - 1 &&
            single.y > 0 &&
            !arr[single.y - 1][single.x + 1].revealed &&
            !arr[single.y - 1][single.x + 1].flagged
        ) {
            // Revelar Top Right
            arr[single.y - 1][single.x + 1].revealed = true;
            newNonMinesCount--;
        }

        if (single.x > 0 && !arr[single.y][single.x - 1].revealed && !arr[single.y][single.x - 1].flagged) {
            // Revelar Left
            arr[single.y][single.x - 1].revealed = true;
            newNonMinesCount--;
        }

        if (single.x < arr[0].length - 1 && !arr[single.y][single.x + 1].revealed && !arr[single.y][single.x + 1].flagged) {
            // Revelar Right
            arr[single.y][single.x + 1].revealed = true;
            newNonMinesCount--;
        }

        if (
            single.x > 0 &&
            single.y < arr.length - 1 &&
            !arr[single.y + 1][single.x - 1].revealed &&
            !arr[single.y + 1][single.x - 1].flagged
        ) {
            // Revelar Bottom Left
            arr[single.y + 1][single.x - 1].revealed = true;
            newNonMinesCount--;
        }

        if (single.y < arr.length - 1 && !arr[single.y + 1][single.x].revealed && !arr[single.y + 1][single.x].flagged) {
            // Revelar Bottom
            arr[single.y + 1][single.x].revealed = true;
            newNonMinesCount--;
        }

        if (
            single.x < arr[0].length - 1 &&
            single.y < arr.length - 1 &&
            !arr[single.y + 1][single.x + 1].revealed &&
            !arr[single.y + 1][single.x + 1].flagged
        ) {
            // Revelar Bottom Right
            arr[single.y + 1][single.x + 1].revealed = true;
            newNonMinesCount--;
        }
    }
    //   console.log(arr);
    return { arr, newNonMinesCount };

}

export default revealed;