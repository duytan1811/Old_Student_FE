export function convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            if (reader.result) {
                resolve(reader.result.toString());
            } else {
                reject(new Error("Failed to convert file to Base64"));
            }
        };

        reader.onerror = () => {
            reject(new Error("File reading error"));
        };

        reader.readAsDataURL(file);
    });
}