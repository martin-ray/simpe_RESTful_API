
post_button.onclick = function(){
    const userAction = async () => {
        const response = await fetch(url_input.value, {
            headers: {
                'Content-Type': 'application/json'
              }
        });
        const res_text = await response.text(); //.json(); //extract JSON from the http response
        res.value = String(res_text);
        // do something with myJson
    }
    userAction()
}