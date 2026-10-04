"use strict";
// ─── Date Helpers ───
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimeOfDay = void 0;
exports.isBirthday = isBirthday;
exports.formatDisplayDate = formatDisplayDate;
exports.isSameDay = isSameDay;
exports.daysSince = daysSince;
// Check if a date is today's birthday
function isBirthday(dateString) {
    var date = new Date(dateString);
    var today = new Date();
    return date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth();
}
// Format date for display
function formatDisplayDate(dateString) {
    return new Date(dateString).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}
// Check if two dates are the same day
function isSameDay(date1, date2) {
    var d1 = new Date(date1);
    var d2 = new Date(date2);
    return d1.getDate() === d2.getDate() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getFullYear() === d2.getFullYear();
}
// Days between two dates
function daysSince(dateString) {
    var date = new Date(dateString);
    var today = new Date();
    var timeDiff = today.getTime() - date.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
}
// Get time of day (re-export from utils)
var utils_1 = require("./utils");
Object.defineProperty(exports, "getTimeOfDay", { enumerable: true, get: function () { return utils_1.getTimeOfDay; } });
