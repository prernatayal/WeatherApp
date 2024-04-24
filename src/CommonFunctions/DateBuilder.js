export const dateBuilder = (date) => {

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[date.getDay()];
    let dates = date.getDate();
    let month = months[date.getMonth()];
    let year = date.getFullYear();

    return (`${day} ${dates} ${month} ${year}`)

}