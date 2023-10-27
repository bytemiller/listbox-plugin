/**
 * Convert css styles in object to css string.
 *
 * @param {object} styles - css styles in object.
 * @return {string} - css string ('display: flex; flex-direction: center').
 */
export function css(styles) {
    let cssString = '';
    for (let [key, value] of Object.entries(styles))
        cssString += `${key}: ${value}; `;
    return cssString;
}