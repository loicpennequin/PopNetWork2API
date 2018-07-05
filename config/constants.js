/**
* Application global constants
*
* @author Daria <lo.pennequin@gmail.com>
*/

module.exports = Object.freeze({
    WWW_URL: process.env.NODE_ENV === 'production' ? 'https://pop-network.herokuapp.com/' : 'http://localhost:3000',
    BLOGS: Object.freeze({
        MAX_BLOGS: 5
    })
});
