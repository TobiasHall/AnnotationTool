let samples = []

//Get the labels from inputfields
function getLabels() {
    const allTextInputs = document.querySelectorAll('#addedLabel')
    let labels = []
    allTextInputs.forEach(function (el) {
        if (!!el.value) {
            labels.push({
                id: el.value.toLowerCase(),
                displayName: el.value
            })
        }
    })
    return labels
}

//Loads Universal Data Tool
function loadUdt() {    

    window.UniversalDataTool.open({
        container: document.getElementById("udt"),

        udt: {
            namn: document.getElementById('project-name').value,
            interface: {
                type: document.querySelector('input[name="rdoAnnotation"]:checked').value,
                labels: getLabels()
            },
            samples: samples
        },

        // Called when sample is saved
        onSaveSample: (index, sample) => {
            samples[sample].annotation = index.annotation
            console.log(index, sample);

            //postToPostgreSql(index.annotation)
        }

    });    
}

//https://github.com/vitaly-t/pg-promise
//Can't get it to work.
function postToPostgreSql(annotation) {
    const initOptions = {/* options as documented below */ };
    const pgp = require('pg-promise')(/* initialization options */);

    const cn = {
        host: 'localhost',
        port: 5433,
        database: 'udt',
        user: 'postgre',
        password: '296582'
    };

    const db = pgp(cn);
        
    db.one(`'INSERT INTO annotation(json) VALUES(${annotation})'`)        
        .catch(error => {
            console.log(error);
        });
}


//Adds new input for labels dynamical
$("#addRow").click(function () {
    var html = '';
    html += '<div id="inputFormRow">';
    html += '<div class="input-group mb-3">';
    html += '<input id="addedLabel" type="text" name="title[]" class="form-control m-input" placeholder="Skapa kategorier" autocomplete="off">';
    html += '<div class="input-group-append">';
    html += '<button id="removeRow" type="button" class="btn btn-danger"><i class="bi bi-x-lg"></i></button>';
    html += '</div>';
    html += '</div>';

    $('#newRow').append(html);
});

// remove row from labels
$(document).on('click', '#removeRow', function () {
    $(this).closest('#inputFormRow').remove();
});

//Upload files to browser
function uploadFiles() {
    let fileToUpload = document.getElementById("myFile").files;
    samples = []

    for (var i = 0; i < fileToUpload.length; i++) {
        if (fileToUpload[i].type.includes('image')) {

            let temp = {
                imageUrl: URL.createObjectURL(fileToUpload[i]),
            }
            samples.push(temp)

        }
        else if (fileToUpload[i].type.includes('text') && fileToUpload.length === 1) {
            let fileReader = new FileReader();
            fileReader.onload = function (fileLoadedEvent) {
                let textFromFileLoaded = fileLoadedEvent.target.result.split('\n')
                textFromFileLoaded.forEach(function (element) {
                    let temp = {
                        document: element,
                        annotation: []
                    }
                    samples.push(temp)
                })

            };

            fileReader.readAsText(fileToUpload[i], "UTF-8");

        }
        else {
            window.alert('Välj endast en textfil eller flera bilder')
            break
        }
    }
}
