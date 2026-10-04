"use strict";
// ─── Utility Functions ───
Object.defineProperty(exports, "__esModule", { value: true });
exports.cn = cn;
exports.useDebounce = useDebounce;
exports.useLocalStorage = useLocalStorage;
exports.useOnClickOutside = useOnClickOutside;
exports.truncate = truncate;
exports.formatDate = formatDate;
exports.timeAgo = timeAgo;
exports.getTimeOfDay = getTimeOfDay;
exports.shuffle = shuffle;
exports.weightedRandom = weightedRandom;
exports.pickRandom = pickRandom;
exports.randomInt = randomInt;
// classnames utility - combines class names conditionally
function cn() {
    var classes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        classes[_i] = arguments[_i];
    }
    return classes.filter(Boolean).join(' ');
}
// debounce hook
function useDebounce(value, delay) {
    // In a real implementation, this would use useState and useEffect
    // For now, we return the value directly (client-side implementation)
    return value;
}
// localStorage hook
function useLocalStorage(key, initialValue) {
    // In a real implementation, this would use useState and useEffect
    // For now, we return the initial value and a setter
    var setter = function (value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        }
        catch (error) {
            console.error('Failed to save to localStorage:', error);
        }
    };
    return [initialValue, setter];
}
// onClickOutside hook
function useOnClickOutside(ref, handler) {
    // In a real implementation, this would use useEffect
}
// truncate text
function truncate(text, maxLength) {
    if (text.length <= maxLength)
        return text;
    return text.slice(0, maxLength) + '...';
}
// format date
function formatDate(dateString) {
    var options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}
// time ago
function timeAgo(dateString) {
    var seconds = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000);
    var interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
        return interval + ' years ago';
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + ' months ago';
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + ' days ago';
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + ' hours ago';
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + ' minutes ago';
    }
    return Math.floor(seconds) + ' seconds ago';
}
// get time of day
function getTimeOfDay() {
    var hour = new Date().getHours();
    if (hour >= 6 && hour < 12)
        return 'morning';
    if (hour >= 12 && hour < 17)
        return 'afternoon';
    if (hour >= 17 && hour < 20)
        return 'evening';
    return 'night';
}
// shuffle array
function shuffle(array) {
    var _a;
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [array[j], array[i]], array[i] = _a[0], array[j] = _a[1];
    }
    return array;
}
// weighted random
function weightedRandom(items) {
    var totalWeight = items.reduce(function (sum, item) { return sum + item.weight; }, 0);
    var random = Math.random() * totalWeight;
    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
        var _a = items_1[_i], item = _a.item, weight = _a.weight;
        if (random < weight)
            return item;
        random -= weight;
    }
    return items[items.length - 1].item;
}
// pick random
function pickRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}
// random integer
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
