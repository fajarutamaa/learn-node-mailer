function generatePromoCode(length = 6) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const randomString = Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    return randomString;
}

module.exports = { generatePromoCode }