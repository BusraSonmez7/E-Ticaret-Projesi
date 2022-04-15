import axios from "axios";

const GetMethod = async (props) => {

    let base_url = 'https://narevim.com/apiv1';
    let xapikey = 'ApiKey';
    const config = {
        method: 'get',
        url: `${base_url}/${props.path}`,
        headers: { 
          'X-API-KEY': xapikey,
          'Cookie': props.cookie,
        },
    };

    try {
        const res = await axios(config)
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
        console.log(error);
        });  

        return res;

    } catch (error) {
        console.log(error);
    }   


}

export default GetMethod;
