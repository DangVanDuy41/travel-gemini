export const getLocation = async (text: string) => {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?city=${text}&country=Vietnam&format=json&addressdetails=1`, {
            headers: {
                'User-Agent': 'YourAppName/1.0 (email@example.com)' // Thêm User-Agent hợp lệ
            }
        });

        if (!response.ok) {
            throw new Error(`Lỗi API: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Lỗi:', error);
        return null;
    }
}