let xhr = new XMLHttpRequest();
let formValues = new getSetFormValues();

function jsonPost(json_req, url){
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let json_res = JSON.parse(xhr.responseText);
            alert(json_res);
        }else{
            alert("Failed to send POST: "+url+json_req)
        }
    };
    xhr.send(json_req);
}

function ListenSubmit(form_id,submit_id){
    let form = document.getElementById(form_id);
    let submit = document.getElementById(submit_id);
    submit.addEventListener('click', (event) => {
        event.preventDefault();
        let params = formValues.get(form);
        let request = JSON.stringify(params, null, ' ');
        
        jsonPost(request, "");
        alert("XMLHttpRequest sent with: " + request);
    });
}

ListenSubmit("id-inventory-form", "id-inventory-submit");
ListenSubmit("id-report-form", "id-report-submit");