using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BackAPI.Models
{
    [Table("avion")]
    public class Avion
    {
        [Key]
        [Column("id_aeronef")]
        public int Id_aeronef { get; set; }

        [Column("type_aeronef")]
        [StringLength(30)]
        public string? Type_aeronef { get; set; }

        public ICollection<Vol> ? Vols  { get; set; }
        public ICollection<ClasseService> ? ClasseServices { get; set; }
        /*
        [NotMapped]
        public int nb { get; set; }
        */
    }
}
