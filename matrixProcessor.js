import { createMegaverse } from "./api.js";
import { isValidMatrix } from "./utils.js";

const API_URL = 'https://challenge.crossmint.io/api/';

export async function processMatrix(matrix) {
    if(!isValidMatrix(matrix)) {
        throw Error('Invalid matrix structure');
    }
    
    const rowLength = matrix[0].length;
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < rowLength; col++) {
            if (matrix[row][col] === 'POLYANET') {
                await createMegaverse(`${API_URL}polyanets`,row, col);
            }
            if(matrix[row][col].includes("_SOLOON")) {
                let color = matrix[row][col].split("_")[0];
                await createMegaverse(`${API_URL}soloons`,row, col, {color: color.toLowerCase()});
            }
            if(matrix[row][col].includes("_COMETH")) {
                let direction = matrix[row][col].split("_")[0];
                await createMegaverse(`${API_URL}comeths`,row, col, {direction: direction.toLowerCase()});
            }
        }
    }
}