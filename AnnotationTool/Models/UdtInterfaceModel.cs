using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AnnotationTool.Models
{
    public class UdtInterfaceModel
    {
        [Key]
        public int Id { get; set; }
        public string Type { get; set; }
        public string Name { get; set; }



        public override string ToString()
        {
            return Type;
        }
    }
}
