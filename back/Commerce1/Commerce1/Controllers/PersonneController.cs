using Commerce1.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Xml.Linq;

namespace Commerce1.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PersonneController : ControllerBase
    {
        private static List<Personne> personneList= new();
       
        [HttpGet]
        public IEnumerable<Personne> Get() {
            return personneList;
        }
        [HttpGet ("{id}")]
        public IActionResult Get(int id)
        {
            var p = personneList.Where(P => P.Id == id).FirstOrDefault();
            if (p is null)
            {
                return NotFound();
            }
            else
            { 
                return Ok(p);
            }
        }
        [HttpPut]
        
       public Personne Create(string name, int age, string adress) {
        var id= personneList.Count+1;
            var p1= new Personne(name, age, adress, id);
            personneList.Add(p1);
            return p1;
        }
        [HttpDelete]
        public IActionResult Delete(int id)
        {
            var p = personneList.Where(P => P.Id == id).FirstOrDefault();
            if (p is null)
            {
                return NotFound();
            }
            else
            {
                personneList.Remove(p);
                return NoContent();
            }

        }
    }
}
