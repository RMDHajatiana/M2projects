using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Recettes.Models
{

    [Table("vol")]
    public class Vol
    {
        [Key]

        [Column("num_vol")]
        public int Num_vol { get; set; }

        [Column("AppareildeTransport")]
        public int Id_aeronef { get; set; }
        public Avion? Avion { get; set; }


        [Column("Itineraire")]
        public int Code_escale { get; set; }
        public Itineraire? Itineraire { get; set; }


        [Column ("nom_compagnie_aerienne")]
        public string? Nom_compagnie { get; set; }

        [Column("duree_vol")]
        public string? Duree_vol { get; set; }

        [Column("date_depart")]
        public DateOnly Date_depart { get; set; }

        [Column("heure_depart")]
        public TimeOnly Heure_depart { get; set; }
    }
}
