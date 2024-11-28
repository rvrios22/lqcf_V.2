const getMonthName = (monthIndex) => {
    const monthsOfYear = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    if (monthIndex < 0 || monthIndex > 11) {
        throw new Error("Invalid month index. Must be between 0 and 11.");
    }
    return monthsOfYear[monthIndex];
}


const dateFormater = (dateString) => {
    const date = new Date(dateString)
    const day = date.getDate()
    const monthidx = date.getMonth()
    const month = getMonthName(monthidx)
    const year = date.getFullYear()

    return `${month} ${day}, ${year}`
}


export default dateFormater