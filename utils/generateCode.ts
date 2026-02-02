import User from '@/models/User';

/**
 * Generates a unique alphanumeric code for a user.
 * Format: ICE-XXXXXX
 * @returns {Promise<string>} A unique code string.
 */
export async function generateUniqueUserCode(): Promise<string> {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let isUnique = false;
    let finalCode = '';

    while (!isUnique) {
        let code = '';
        for (let i = 0; i < 3; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        const year = new Date().getFullYear();
        finalCode = `${year}-ICEHUB-${code}`;

        // Wait for DB to check if code exists
        const existingCode = await User.findOne({ uniqueCode: finalCode });
        if (!existingCode) {
            isUnique = true;
        }
    }

    return finalCode;
}
