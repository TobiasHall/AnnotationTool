using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AnnotationTool.Models.ViewModels
{
    public class UniversalDataToolViewModel
    {
        public UdtInterface UdtInterface { get; set; }
        public string JsonString { get; set; }
        public string IntFace { get; set; }
        public string JsonLabels { get; set; }

        public UniversalDataToolViewModel(UdtInterface udtInterface)
        {
            this.UdtInterface = udtInterface;
            JsonString = JsonConvert.SerializeObject(new UdtInterface());

            IntFace = "image_segmentation";
            List<string> hejsan = new List<string>() { "Cat", "Dog" };
            JsonLabels = JsonConvert.SerializeObject(hejsan);

        }
    }
}
