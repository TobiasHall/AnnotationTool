const imgs = [
    "https://images.unsplash.com/photo-1589536386711-5300f262657f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1614947153104-e46b2b7e36fa?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1611102130252-6ba137b7c478?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1461555806864-d8b528023e7c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1492683962492-deef0ec456c0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
]

let counter = 0
function changeImage() {
    counter++
    if (counter > 4) {
        counter = 0
    }
    loadPicture()
}

$(document).ready(function () {    
    /*loadPicture(counter)*/
})

let file
let lines
document.getElementById('upload').addEventListener('change', readFileAsString)
function readFileAsString() {
    let files = this.files
    if (files.length === 0) {
        console.log('No file is selected')
        return
    }

    let reader = new FileReader()
    reader.onload = function (event) {
        file = event.target.result
        lines = file.split(/\r\n|\n/)
    };
    reader.readAsText(files[0])
}



function loadPicture() {
    let labelStudio = new LabelStudio('label-studio', {

        config: `
            <View>
                <Header value="Label the image with blocks"/>
                <Image name="img" value="$image"></Image>
                <RectangleLabels name="tag" toName="img">
                    <Label value="Fork" background="blue"/>
                    <Label value="Knife" background="red"/>
                    <Label value="Spoon" background="green"/>                 
                    <Label value="Plate" background="Purple"/>
                </RectangleLabels>
            </View>
        `,

        interfaces: [
            "update",
            "submit",
            "controls",
            "side-column",
            "annotations:menu",
            "annotations:add-new",
            "annotations:delete",
            "predictions:menu",
        ],

        messages: {
            done: "Nu är du klar!",
            NO_COMP_LEFT: "No more annotations",
            NO_NEXT_TASK: "No more data available for labeling",
            NO_ACCESS: "You don't have access to this task"
        },

        user: {
            pk: 1,
            firstName: "James",
            lastName: "Dean"
        },

        task: {
            annotations: [],
            predictions: [],
            id: 1,
            data: {
                image: imgs[counter],           
            }
        },

        onLabelStudioLoad: function (LS) {
            let c = LS.annotationStore.addAnnotation({
                userGenerate: true
            });
            LS.annotationStore.selectAnnotation(c.id);
        },
        
        onSubmitAnnotation: function (LS, annotation) {
            // retrive an annotation 
            console.log(annotation.serializeAnnotation())
            let annot = annotation.serializeAnnotation()
            

            changeImage()            
        }

    })
}



function loadText() {

    let labelStudio = new LabelStudio('label-studio', {
        config: `
    <View>
        <Labels name="ner" toName="text">
          <Label value="Person"></Label>
          <Label value="Organization"></Label>
          <Label value="Fact"></Label>
          <Label value="Money"></Label>
          <Label value="Date"></Label>
          <Label value="Time"></Label>
          <Label value="Ordinal"></Label>
          <Label value="Percent"></Label>
          <Label value="Product"></Label>
          <Label value="Language"></Label>
          <Label value="Location"></Label>
        </Labels>
        <Text name="text" value="$text"></Text>
    </View>
    `,

        interfaces: [
            "update",
            "controls",
            "side-column",
            "annotations:menu",
            "annotations:add-new",
            "annotations:delete",
            "predictions:menu",
        ],

        messages: {
            done: "Nu är du klar!",
            NO_COMP_LEFT: "No more annotations",
            NO_NEXT_TASK: "No more data available for labeling",
            NO_ACCESS: "You don't have access to this task"
        },

        user: {
            pk: 1,
            firstName: "James",
            lastName: "Dean"
        },
        task: {
            annotations: [],
            predictions: [],
            id: 1,
            data: {
                text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem.Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,             tenetur error, harum nesciunt ipsum debitis quas aliquid.Reprehenderit,             quia.Quo neque error repudiandae fuga? Ipsa laudantium molestias eos  sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum.Perspiciatis  minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora.Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maximedoloremque.Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo ",
            }
        },

        onLabelStudioLoad: function (LS) {
            let c = LS.annotationStore.addAnnotation({
                userGenerate: true
            });
            LS.annotationStore.selectAnnotation(c.id);
        },
        
        onSubmitAnnotation: function (LS, annotation) {
            // retrive an annotation 
            
            let annot = annotation.serializeAnnotation()
            let textToSave = new Array()

            for (var i = 0; i < annot.length; i++) {
                textToSave.push(annot[i].value.text)                
            }
        }

    })    
}



function loadPredictions() {

    let labelStudio = new LabelStudio('label-studio', {
        config: `
    <View>
  <Labels name="ner" toName="text">
    <Label value="Person"/>
    <Label value="Organization"/>
    <Label value="Date"/>
    <Label value="Time"/>
    <Label value="Product"/>
    <Label value="Location"/>
  </Labels>
  <Text name="text" value="$text"/>
</View>
    `,

        interfaces: [
            "update",
            "controls",
            "side-column",
            "annotations:menu",
            "annotations:add-new",
            "annotations:delete",
            "predictions:menu",
        ],

        messages: {
            done: "Nu är du klar!",
            NO_COMP_LEFT: "No more annotations",
            NO_NEXT_TASK: "No more data available for labeling",
            NO_ACCESS: "You don't have access to this task"
        },

        user: {
            pk: 1,
            firstName: "James",
            lastName: "Dean"
        },
        task: {
            annotations: [],
            predictions: [                
                {
                    "model_version": "model 1",
                    "created_ago": "2 weeks, 6 days",
                    "result": [
                        {
                            "from_name": "ner",
                            "id": "beFiQTT1cU",
                            "source": "$text",
                            "to_name": "text",
                            "type": "labels",
                            "value": {
                                "end": 354,
                                "labels": [
                                    "Date"
                                ],
                                "start": 343,
                                "text": "February 22"
                            }
                        },
                        {
                            "from_name": "ner",
                            "id": "beFiQTSs1cU",
                            "source": "$text",
                            "to_name": "text",
                            "type": "labels",
                            "value": {
                                "end": 61,
                                "labels": [
                                    "Location"
                                ],                                
                                "start": 45,
                                "text": "Bahia cocoa zone"
                            }
                        },
                        {
                            "from_name": "ner",
                            "id": "beFiBTSs1cU",
                            "source": "$text",
                            "to_name": "text",
                            "type": "labels",
                            "value": {
                                "end": 228,
                                "labels": [
                                    "Person"
                                ],
                                "start": 212,
                                "text": "Comissaria Smith"
                            }
                        },
                        {
                            "from_name": "ner",
                            "id": "UeFHJTSs1cU",
                            "source": "$text",
                            "to_name": "text",
                            "type": "labels",
                            "value": {
                                "end": 106,
                                "labels": [
                                    "Date"
                                ],
                                "start": 99,
                                "text": "January"
                            }
                        },
                        {
                            "from_name": "ner",
                            "id": "UeFiRDSs1cU",
                            "source": "$text",
                            "to_name": "text",
                            "type": "labels",
                            "value": {
                                "end": 505,
                                "labels": [
                                    "Product"
                                ],
                                "start": 500,
                                "text": "cocoa"
                            }
                        }
                    ]
                }
            ],
            id: 1,
            data: {
                "text": "Showers continued throughout the week in the Bahia cocoa zone, alleviating the drought since early January and improving prospects for the coming temporao, although normal humidity levels have not been restored, Comissaria Smith said in its weekly review.\n\nThe dry period means the temporao will be late this year. Arrivals for the week ended February 22 were 155,221 bags of 60 kilos making a cumulative total for the season of 5.93 mln against 5.81 at the same stage last year. Again it seems that cocoa delivered earlier on consignment was included in the arrivals figures."
            }
        },

        onLabelStudioLoad: function (LS) {
            
        },

        onSubmitAnnotation: function (LS, annotation) {
            // retrive an annotation 

            let annot = annotation.serializeAnnotation()
            let textToSave = new Array()            
            for (var i = 0; i < annot.length; i++) {
                textToSave.push(annot[i].value.text)
            }            
        },

        onUpdateAnnotation: function (LS, annotation) {
            // retrive an annotation 

            let annot = annotation.serializeAnnotation()
            let textToSave = new Array()

            for (var i = 0; i < annot.length; i++) {
                textToSave.push(annot[i].value.text)
            }
        }

    })
}










