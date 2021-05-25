let samples = []

function setSamples(type) {
    if (type === "text_classification" || type === "text_entity_recognition") {
        samples = [
            {
                document: "Apple Inc., i vardagslag benämnt Apple, är ett amerikanskt dator- och hemelektronikföretag grundat 1976 av Steve Jobs, Steve Wozniak och Ronald Wayne. Företaget har cirka 147 000 anställda och omsatte 2020 nästan 274.52 miljarder amerikanska dollar.",
                annotation: []
            },
            {
                document: "Google LLC är ett amerikanskt multinationellt internetföretag inriktat på Internetrelaterade produkter och tjänster som omfattar annonsering på nätet, en sökmotor, molntjänster, mjukvaru- och hårdvaruprodukter. Google grundades 4 september 1998 av Larry Page och Sergey Brin när de båda var doktorander på Stanford University i Kalifornien.",
                annotation: []
            },
            {
                document: "amsunggruppen är Sydkoreas största chaebol och en av världens största företagsgrupperingar. Själva Samsung grundades 1938 av Lee Byung-chul (företaget ägnade sig från början åt livsmedelshandel och produktion av nudlar), och högkvarteret ligger i Seocho Samsung Town i Seoul, Sydkorea. Företagets VD och styrelseordförande är Lee Kun-hee.",
                annotation: []
            }
        ]
    } else {
        samples = [
            {
                imageUrl: "https://media.gettyimages.com/photos/dog-and-cat-picture-id151350785"
            },
            {
                imageUrl: "https://media.gettyimages.com/photos/guess-who-rules-the-roost-in-that-house-picture-id500927195"
            },
            {
                imageUrl: "https://media.gettyimages.com/photos/she-simply-loves-animals-picture-id499806311"
            }
        ]
    }
}



function getLabels() {
    const allTextInputs = document.querySelectorAll('#addedLabel')
    let labels = []
    allTextInputs.forEach(function (el) {
        if (!!el.value) {
            labels.push({id: el.value})
        }
    })
    
    return labels
}

function getAnnotationType() {
    const source = document.querySelector('input[name="source"]:checked').value
    const type = document.querySelector('input[name="type"]:checked').value

    let returnType = ""
    if (source === "text" && type === "classification") {
        returnType = "text_classification"
    } else if (source === "text" && type === "label") {
        returnType = "text_entity_recognition"
    } else if (source === "picture" && type === "classification") {
        returnType = "image_classification"
    } else {
        returnType = "image_segmentation"
    }

    return returnType
}

function getInterface() {
    
    const interface =
    {
        type: getAnnotationType(),
        labels: getLabels()
    }    

    return interface
}

function loadUdt() {

    const interface = getInterface()
    setSamples(interface.type)

    window.UniversalDataTool.open({
        container: document.getElementById("udt"),

        udt: {
            interface: interface,
            samples: samples
        },

        // Called when sample is saved
        onSaveSample: (index, sample) => {
            samples[sample].annotation = index.annotation
            console.log(index, sample);
        }

    });
}








function loadPicture() {
    window.UniversalDataTool.open({
        container: document.getElementById("udt"),

        // Your UDT dataset
        // https://github.com/UniversalDataTool/udt-format
        udt: {
            interface: {
                type: "image_classification",
                labels: [
                    {
                        id: "cat",
                        description: "Feline Mammal"
                    },
                    {
                        id: "dog",
                        description: "Canine Mammal"
                    }
                ],
                multipleRegions: true,
                minimumRegionSize: 0.01,
                overlappingRegions: true,
                regionMinAcceptableDifference: 0.1
            },
            samples: [
                {
                    imageUrl: "https://media.gettyimages.com/photos/dog-and-cat-picture-id151350785",
                    //annotation: [
                    //    {
                    //        regionType: "bounding-box",
                    //        id: "05310267439433325",
                    //        centerX: 0.23655172413793105,
                    //        centerY: 0.4405480875381518,
                    //        width: 0.2524137931034483,
                    //        height: 0.36241314371063055,
                    //        classification: "valid",
                    //        color: "#f44336"
                    //    }
                    //]
                },
                {
                    imageUrl: "https://media.gettyimages.com/photos/guess-who-rules-the-roost-in-that-house-picture-id500927195"
                },
                {
                    imageUrl: "https://media.gettyimages.com/photos/she-simply-loves-animals-picture-id499806311"
                }
            ]
        },

        // Called when sample is saved
        onSaveSample: (index, sample, event) => {
            console.log(index, sample);
        }

    });
}


 

function loadText() {
    window.UniversalDataTool.open({
        container: document.getElementById("udt"),

        // Your UDT dataset
        // https://github.com/UniversalDataTool/udt-format
        udt: {
            interface: {
                type: "text_entity_recognition", // or "named_entity_recognition"

                description: "# MarkdownDescription", // optional
                overlapAllowed: false, // optional

                // You can also provide labels as a string, e.g. ["food", "hat"]
                labels: [
                    {
                        id: "food",
                        displayName: "Food", // optional
                        description: "Edible item." // optional
                    },
                    {
                        id: "hat",
                        displayName: "Hat", // optional
                        description: "Something worn on the head." // optional
                    }
                ]
            },
            samples: [
                {
                    document: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem.Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid."
                }
            ]

        },

        // Called when sample is saved
        onSaveSample: (index, sample) => {
            console.log(index, sample);
        }
    });
}

function loadTextClassification() {
    window.UniversalDataTool.open({
        container: document.getElementById("udt"),

        // Your UDT dataset
        // https://github.com/UniversalDataTool/udt-format
        udt: {
            interface: {
                type: "text_classification",
                description: "# MarkdownDescription",
                multiple: false,
                labels: [
                    {
                        id: "gryffindor",
                        displayName: "Gryffindor",
                        description: "Daring, strong nerve and chivalry."
                    },
                    {
                        id: "slytherin",
                        displayName: "Slytherin",
                        description: "Cunning and ambitious. Possibly dark wizard."
                    }
                ]
            },
            samples: [
                // These are all different types of task data that are acceptable
                {
                    document: "Harry",
                    annotation: "gryffindor"
                },
                {
                    document: "Malfoy",
                }
            ]
            

        },

        // Called when sample is saved
        onSaveSample: (index, sample) => {
            console.log(index, sample);
        },

        onModifySample: (index, sample) => {
            console.log(index, sample);

        }
    });
}


function loadPredictions() {
    window.UniversalDataTool.open({
        container: document.getElementById("udt"),

        // Your UDT dataset
        // https://github.com/UniversalDataTool/udt-format
        udt: {
            interface: {
                type: "text_entity_recognition", // or "named_entity_recognition"

                description: "# MarkdownDescription", // optional
                overlapAllowed: false, // optional

                // You can also provide labels as a string, e.g. ["food", "hat"]
                labels: [
                    {
                        id: "food",
                        displayName: "Food", // optional
                        description: "Edible item." // optional
                    },
                    {
                        id: "hat",
                        displayName: "Hat", // optional
                        description: "Something worn on the head." // optional
                    }
                ],

                // Optional: The regex that captures a single word
                wordSplitRegex: "[a-zA-ZÀ-ÿ]+"
            },
            samples: [
                {
                    document: "This text document is broken into selectable chunks.",

                    // annotation can be undefined for new samples
                    annotation: {
                        entities: [
                            {
                                text: "text document",
                                label: "hat",
                                start: 5,
                                end: 18
                            },
                            {
                                text: "selectable chunks",
                                label: "food",
                                start: 34,
                                end: 51
                            }
                        ]
                    }
                },
                {
                    document: "En annan text",

                    // annotation can be undefined for new samples
                    annotation: {
                        entities: [
                            {
                                text: "En",
                                label: "hat",
                                start: 0,
                                end: 1
                            },
                            {
                                text: "text",
                                label: "food",
                                start: 9,
                                end: 12
                            }
                        ]
                    }
                }
            ]

        },

        // Called when sample is saved
        onSaveSample: (index, sample) => {
            console.log(index, sample);
        }
    });
}
