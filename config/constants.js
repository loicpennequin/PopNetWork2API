/**
* Application global constants
*
* @author Daria <lo.pennequin@gmail.com>
*/

module.exports = Object.freeze({
    WWW_URL: process.env.NODE_ENV === 'production' ? 'https://pop-network.herokuapp.com' : 'http://localhost:3000',
    API_URL: process.env.NODE_ENV === 'production' ? 'https://pop-network-api.herokuapp.com' : 'http://localhost:8000',
    FEEDS: Object.freeze({
        INITIAL_AMOUNT : 10,
        ITEMS_PER_FETCH : 5
    }),
    USERS: Object.freeze({
        ITEMS_PER_SEARCH : 3
    })

});
