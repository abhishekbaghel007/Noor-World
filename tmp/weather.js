"use strict";
// ─── Weather Helpers ───
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDisplayDate = void 0;
exports.mapWeatherCode = mapWeatherCode;
exports.weatherEmoji = weatherEmoji;
exports.weatherDescription = weatherDescription;
exports.weatherColor = weatherColor;
exports.weatherMood = weatherMood;
exports.fetchWeather = fetchWeather;
exports.getUserLocation = getUserLocation;
// Map Open-Meteo weather codes to our conditions
// Based on WMO weather interpretation codes (WW)
function mapWeatherCode(code) {
    if (code === 0)
        return 'clear';
    if ([1, 2, 3].includes(code))
        return 'partly-cloudy';
    if ([45, 48].includes(code))
        return 'foggy';
    if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code))
        return 'rainy';
    if ([71, 73, 75, 77, 85, 86].includes(code))
        return 'snowy';
    if ([95, 96, 99].includes(code))
        return 'stormy';
    return 'cloudy'; // default fallback
}
// Get emoji for weather condition
function weatherEmoji(condition) {
    switch (condition) {
        case 'sunny': return '☀️';
        case 'cloudy': return '☁️';
        case 'partly-cloudy': return '⛅';
        case 'rainy': return '🌧️';
        case 'snowy': return '❄️';
        case 'stormy': return '⛈️';
        case 'clear': return '🌙';
        case 'foggy': return '🌫️';
        default: return '☁️';
    }
}
// Get description for weather condition
function weatherDescription(condition) {
    switch (condition) {
        case 'sunny': return 'Sunny';
        case 'cloudy': return 'Cloudy';
        case 'partly-cloudy': return 'Partly cloudy';
        case 'rainy': return 'Rainy';
        case 'snowy': return 'Snowy';
        case 'stormy': return 'Stormy';
        case 'clear': return 'Clear';
        case 'foggy': return 'Foggy';
        default: return 'Cloudy';
    }
}
// Get color for weather condition (for UI)
function weatherColor(condition) {
    switch (condition) {
        case 'sunny': return '#f4c94b'; // yellow
        case 'cloudy': return '#a0aec0'; // gray
        case 'partly-cloudy': return '#f6ad55'; // orange
        case 'rainy': return '#63b3ed'; // blue
        case 'snowy': return '#bee3f8'; // light blue
        case 'stormy': return '#fc8181'; // red
        case 'clear': return '#fbd38d'; // light yellow
        case 'foggy': return '#9ca3af'; // gray-400
        default: return '#a0aec0';
    }
}
// Get suggested mood based on weather
function weatherMood(condition) {
    switch (condition) {
        case 'sunny': return 'happy';
        case 'cloudy': return 'just-because';
        case 'partly-cloudy': return 'just-because';
        case 'rainy': return 'difficult';
        case 'snowy': return 'just-because';
        case 'stormy': return 'difficult';
        case 'clear': return 'just-because';
        case 'foggy': return 'just-because';
        default: return 'just-because';
    }
}
// Fetch weather from Open-Meteo (free API, no key needed)
function fetchWeather(latitude, longitude) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto')];
                case 1:
                    response = _a.sent();
                    if (!response.ok)
                        throw new Error('Failed to fetch weather');
                    return [4 /*yield*/, response.json()];
                case 2:
                    data_1 = _a.sent();
                    return [2 /*return*/, {
                            current: {
                                temperature: data_1.current_weather.temperature,
                                windspeed: data_1.current_weather.windspeed,
                                weathercode: data_1.current_weather.weathercode,
                                condition: mapWeatherCode(data_1.current_weather.weathercode)
                            },
                            daily: data_1.daily ? data_1.daily.map(function (item, index) { return ({
                                date: data_1.daily.time[index],
                                maxTemp: data_1.daily.temperature_2m_max[index],
                                minTemp: data_1.daily.temperature_2m_min[index],
                                weathercode: data_1.daily.weathercode[index],
                                condition: mapWeatherCode(data_1.daily.weathercode[index])
                            }); }) : []
                        }];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error fetching weather:', error_1);
                    // Return fallback data
                    return [2 /*return*/, {
                            current: {
                                temperature: 20,
                                windspeed: 5,
                                weathercode: 0
                            }
                        }];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Get user's current location
function getUserLocation() {
    return new Promise(function (resolve, reject) {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation not supported'));
            return;
        }
        navigator.geolocation.getCurrentPosition(function (position) {
            resolve({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        }, function (error) {
            reject(error);
        });
    });
}
// Re-export from utils for convenience
var dates_1 = require("./dates");
Object.defineProperty(exports, "formatDisplayDate", { enumerable: true, get: function () { return dates_1.formatDisplayDate; } });
