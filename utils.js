export function isValidMatrix(matrix) {
    if(!Array.isArray(matrix) || matrix.length === 0) {
        return false;
    }
    let length = matrix[0].length;
    return matrix.every(row => Array.isArray(row) && row.length === length);
}