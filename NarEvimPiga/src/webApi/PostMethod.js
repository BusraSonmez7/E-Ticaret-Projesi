import axios from "axios";

const PostMethod = async (props) => {

    let base_url = 'https://narevim.com/apiv1';
    let xapikey = 'Va97j7z83nMXzhmmdHLPG9Nuef3J6BgC';
    let contentType = 'application/x-www-form-urlencoded';

    const axios = require('axios');
    const qs = require('qs');

    const data = qs.stringify(props.data);
    
    const config = {
        method: 'post',
        url: `${base_url}/${props.path}`,
        headers: { 
          'X-API-KEY': xapikey, 
          'Content-Type': contentType
        },
        data : data
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

export default PostMethod;