module.exports = {
    getStartOfDay() {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        return startOfDay;
    },

    getEndOfDay() {
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);
        return endOfDay;
    },
};
