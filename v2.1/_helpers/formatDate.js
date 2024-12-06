function formatThaiDate(date) {
    const thaiMonths = [
        "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
        "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];

    const day = date.getDate();
    const month = thaiMonths[date.getMonth()];
    const year = date.getFullYear() + 543; // แปลง ค.ศ. เป็น พ.ศ.

    return `${day} ${month} พ.ศ. ${year}`;
}

module.exports = {
    formatThaiDate
}