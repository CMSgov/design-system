/**
 * KSS nests the raw data, so this helper extracts it for us
 * @param  {KssSection} kssSection
 * @return {Object}
 */
module.exports = (kssSection) => kssSection.data;