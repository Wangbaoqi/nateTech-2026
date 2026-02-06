const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const customParseFormat = require('dayjs/plugin/customParseFormat');

// 1. 加载插件
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

// 2. 锁定美东时区
const ET_ZONE = "America/New_York";

/**
 * 将 UTC 字符串转为美东时间对象
 * @param {string} utcStr 
 * @returns {dayjs.Dayjs}
 */
const toET = (utcStr) => dayjs(utcStr).tz(ET_ZONE);

/**
 * 格式化为人类可读的美东时间
 * @param {dayjs.Dayjs} d 
 */
const formatET = (d) => d.format('YYYY-MM-DD HH:mm:ss z');

/**
 * 检查合约是否已过期 (相对于美东时间)
 * @param {string} endDateIso 
 */
const isExpired = (endDateIso) => {
    if (!endDateIso) return false;
    const nowET = dayjs().tz(ET_ZONE);
    const endET = toET(endDateIso);
    return nowET.isAfter(endET);
};

module.exports = {
    toET,
    formatET,
    isExpired,
    ET_ZONE
};
