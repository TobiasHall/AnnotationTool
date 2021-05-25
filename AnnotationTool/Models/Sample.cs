namespace AnnotationTool.Models
{
    public class Sample
    {
        public string Type { get; set; }
        public string Source { get; set; }


        public Sample()
        {
            Type = "imageUrl:";
            Source = "https://media.gettyimages.com/photos/dog-and-cat-picture-id151350785";
        }

    }
}