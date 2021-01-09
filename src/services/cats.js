import axios from 'axios';

let api = 'https://api.thecatapi.com/v1';


export default {

    getCatBreeds() {
        return axios({
            method: 'get',
            url: api + '/breeds'
        });
    },

    getCatBreedList(param) {

        return axios({
            headers: {
                "x-api-key": 'DEMO-API-KEY',
            },
            method: 'get',
            url: api + `/images/search?order=${param.order}&limit=${param.limit}&page=${param.page}&breed_id=${param.keyword}`
        });
    },

    getCatDetails(param) {

        return axios({
            method: 'get',
            url: api + `/images/${param.id}`
        });
    }
}
