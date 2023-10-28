/**
 * Get a item duplicates count.
 *
 * @param {array} arr - array.
 * @return {number} - count.
 */
export function getDuplicatesCount(arr, item) {
    let count = 0;
    arr.forEach(el => { if (el.id === item.id) count++; });
    return count;
}