let samples = []

//function setSamples(type) {
//    if (type.includes('text')) {
//        samples = [
//            {
//                document: "Apple Inc., i vardagslag benämnt Apple, är ett amerikanskt dator- och hemelektronikföretag grundat 1976 av Steve Jobs, Steve Wozniak och Ronald Wayne. Företaget har cirka 147 000 anställda och omsatte 2020 nästan 274.52 miljarder amerikanska dollar.",
//                annotation: []
//            },
//            {
//                document: "Google LLC är ett amerikanskt multinationellt internetföretag inriktat på Internetrelaterade produkter och tjänster som omfattar annonsering på nätet, en sökmotor, molntjänster, mjukvaru- och hårdvaruprodukter. Google grundades 4 september 1998 av Larry Page och Sergey Brin när de båda var doktorander på Stanford University i Kalifornien.",
//                annotation: []
//            },
//            {
//                document: "Samsunggruppen är Sydkoreas största chaebol och en av världens största företagsgrupperingar. Själva Samsung grundades 1938 av Lee Byung-chul (företaget ägnade sig från början åt livsmedelshandel och produktion av nudlar), och högkvarteret ligger i Seocho Samsung Town i Seoul, Sydkorea. Företagets VD och styrelseordförande är Lee Kun-hee.",
//                annotation: []
//            }
//        ]
//    } else {
//        samples = [
//            {
//                imageUrl: "https://media.gettyimages.com/photos/dog-and-cat-picture-id151350785"
//            },
//            {
//                imageUrl: "https://media.gettyimages.com/photos/guess-who-rules-the-roost-in-that-house-picture-id500927195"
//            },
//            {
//                imageUrl: "https://media.gettyimages.com/photos/she-simply-loves-animals-picture-id499806311"
//            }
//        ]
//    }
//}
//function loadSampels(uploadedText) {
//    uploadedText.forEach(function (element) {
//        let temp = {
//            document: element,
//            annotation: []
//        }
//        samples.push(temp)
//    })
//}


//Get the labels from inputfields
function getLabels() {
    const allTextInputs = document.querySelectorAll('#addedLabel')
    let labels = []
    allTextInputs.forEach(function (el) {
        if (!!el.value) {
            labels.push({ id: el.value })
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
        }

    });
}


//Adds row dynamical
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

// remove row
$(document).on('click', '#removeRow', function () {
    $(this).closest('#inputFormRow').remove();
});



//function loadFileAsText() {
//    let fileToLoad = document.getElementById("fileToLoad").files[0];

//    let fileReader = new FileReader();
//    fileReader.onload = function (fileLoadedEvent) {
//        let textFromFileLoaded = fileLoadedEvent.target.result.split('\n')
//        textFromFileLoaded.forEach(function (element) {
//            let temp = {
//                document: element,
//                annotation: []
//            }
//            samples.push(temp)
//        })
//    };

//    fileReader.readAsText(fileToLoad, "UTF-8");
//}

//function loadFileAsImages() {
//    let imagesToLoad = document.getElementById("imagesToLoad").files;

//    for (var i = 0; i < imagesToLoad.length; i++) {
//        let temp = {
//            imageUrl: URL.createObjectURL(imagesToLoad[i]),
//        }
//        samples.push(temp)
//    }
//}

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
