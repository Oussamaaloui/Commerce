namespace Commerce1.Models
{
    public class Personne
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public string Adress { get; set; }
        public Personne(string name, int age, string adress, int id)
        {
            Name = name;
            Age = age;
            Adress = adress;
            Id = id ;
        }
    }
}
