using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackAPI.Models
{

    [Table("parametre")]
    public class Parametre
    {
        [Column("id")]
        public int Id { get; set; }

        [Column("taxes")]
        public double Taxes { get; set; }
    }
}
