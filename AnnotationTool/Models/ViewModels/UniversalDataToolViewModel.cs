using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AnnotationTool.Models.ViewModels
{
    public class UniversalDataToolViewModel
    {
        public List<UdtInterfaceModel> UdtInterfaces { get; set; }

        public UniversalDataToolViewModel(List<UdtInterfaceModel> interfaceModels)
        {
            UdtInterfaces = interfaceModels;
        }
    }
}
