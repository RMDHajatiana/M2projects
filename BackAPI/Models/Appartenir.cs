using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BackAPI.Models
{
    [Table("appartenir")]
    public class Appartenir
    {
        [Key]

        [Column("id_apart")]
        public int Id_apart { get; set; }

        [Column("id_aeronef")]
        public int Id_aeronef { get; set; }
        public Avion? Avion { get; set; }

        [Column("id_classe")]
        public int Id_classe { get; set; }
        public ClasseService? ClasseService { get; set; }

        [Column("capacite")]
        public int Capacite { get; set; }
    }
}
