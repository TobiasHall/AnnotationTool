using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AnnotationTool.Models
{
    public class UdtInterface
    {
        public string Type { get; set; }
        public List<string> Labels { get; set; }
        public Sample Sampels { get; set; }
        public string EnTomProp { get; set; }

        public UdtInterface()
        {
            Type = "image_segmentation";
            Labels = new List<string>() { "Cat", "Dog"};
            Sampels = new Sample();
        }
    }
}
