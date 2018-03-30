export function DateToJsonDate(date) {
    var jsonDate = {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear()
    }

    return jsonDate;
}

export function JsonDateToDate(jsonDate) {
    var date = new Date(parseInt(jsonDate.year), parseInt(jsonDate.month) - 1, parseInt(jsonDate.day), null, null, null, null);
    return date;
}

export function TransferFactorUnitKeyToText(value) {
    var factorUnitText = value === "thoi_luong" ? "Thời lượng" : (value === "khung_gio" ? "Khung giờ" : "Vị trí");
    return factorUnitText;
}