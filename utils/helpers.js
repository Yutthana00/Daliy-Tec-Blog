module.exports = {
    format_date: (date) => {
        return date.toLocaleDataString();
    },

    format_date: (date) => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    },
};

// Date format as MM/DD/YYYY