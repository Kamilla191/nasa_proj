export const setLat = (lat: number): { type: string; payload: number } => ({
    type: 'SET_LAT',
    payload: lat,
});

export const setLon = (lon: number): { type: string; payload: number } => ({
    type: 'SET_LON',
    payload: lon,
});

export const setDim = (dim: number): { type: string; payload: number } => ({
    type: 'SET_DIM',
    payload: dim,
});

export const setDate = (date: string): { type: string; payload: string } => ({
    type: 'SET_DATE',
    payload: date,
});

export const setImageUrl = (url: string): { type: string; payload: string } => ({
    type: 'SET_IMAGE_URL',
    payload: url,
});

export const setError = (error: string): { type: string; payload: string } => ({
    type: 'SET_ERROR',
    payload: error,
});