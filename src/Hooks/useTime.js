export const useGetTime = (value) => {
    let date1 = new Date(value).getTime()
    let date2 = new Date().getTime()
    const differenceinSeconds = date2 - date1;

    const minutes = Math.floor(differenceinSeconds / (1000 * 60));
    if (minutes < 1) return "just Now"

    const hours = Math.floor(differenceinSeconds / (1000 * 60 * 60));
    if (hours < 1) return "less than a Hour"

    const days = Math.floor(differenceinSeconds / (1000 * 60 * 60 * 24));
    if (days < 1) return `${hours} hours ago`

    const months = Math.floor(differenceinSeconds / (1000 * 60 * 60 * 30 * 24));
    if (months < 30) return `${days} days ago`
}

export const GetTime = (value) => {
    let time = new Date(value);

    let fullYear = time.getFullYear()
    // let year = time.getFullYear() % 100
    let month = time.getMonth()
    let day = time.getDate()
    // let week = Math.ceil(day / 7);
    let hours = time.getHours()
    // let minutes = time.getMinutes()
    // let seconds = time.getSeconds()
    // let milliseconds = time.getMilliseconds()

    // return { fullYear, year, month, week, day, hours, minutes, seconds, milliseconds }
    return day + "-" + month + "-" + fullYear + " / " + (hours > 12 ? hours - 12 : hours) + ":" + hours + " " + (hours > 12 ? "PM" : "AM")
}