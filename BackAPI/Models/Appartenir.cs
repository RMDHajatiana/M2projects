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
        public int AvionID { get; set; }

        [Column("id_classe")]
        public int ClasseServiceID { get; set; }

        [Column("capacite")]
        public int Capacite { get; set; }

        public Avion? Avion { get; set; }
        public ClasseService? ClasseService { get; set; }
    }
}
