/**
 * @memberof module:DiscordAPI
 */

/**
 * Extension of Array that adds simple utilities.
 */
class List extends Array {

    constructor() {
        super(...arguments);
    }

    /**
     * Allows multiple filters at once
     * @param {...callable} filters - set a filters to filter the list by
     */
    get(...filters) {
        return this.find(item => {
            for (let filter of filters) {
                for (let key in filter) {
                    if (filter.hasOwnProperty(key)) {
                        if (item[key] !== filter[key]) return false;
                    }
                }
            }
            return true;
        });
    }
}

export default List;