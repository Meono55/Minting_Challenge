import { getMatrix } from './api.js';
import { processMatrix } from './matrixProcessor.js';

async function main() {
    try {
        const matrix = await getMatrix();

        await processMatrix(matrix.goal);

        console.log("Processing complete");
    } catch (error) {
        console.error("An error occured in the main function: ", error);
    }
}

main();