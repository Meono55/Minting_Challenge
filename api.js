const candidateId = process.env.CANDIDATE_ID;

export async function createMegaverse (apiEndpoint, row, col, options = {}, maxRetries = 5) {
    let retryCount = 0;
    let delay = 1000;
    
    while (retryCount < maxRetries) {
        try {

            let requestBody = {
                row: row,
                column: col,
                candidateId: candidateId,
                ...options
            };

            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(requestBody)
            });
    
            if(!response.ok) {
                // Implemented exponential backoff strategy becaue multiple requests are being made at a frequent pace.
                if(response.status === 429) {
                    retryCount++;
                    await new Promise(resolve => setTimeout(resolve, delay));
                    delay *= 2;
                } else {
                    throw new Error(`HTTP error! Status: ${response.status}`)
                }
            } else {
                return await response.json();
            }
    
        } catch(error) {
            if(retryCount >= maxRetries) throw error;
            console.error(`Failed to create Polyanet at (${row}, ${col}):`, error);
        }
    }
}

export async function getMatrix() {
    try {
        const response = await fetch(`https://challenge.crossmint.io/api/map/${candidateId}/goal`);
        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const matrix = await response.json();
        return matrix;
    } catch (error) {
        console.error("Failled to fetch matrix:", error);
        throw error;
    }
}
