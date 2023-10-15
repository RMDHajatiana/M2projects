using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BackAPI.Models
{
    [Table("vol")]
    public class Vol
    {
        [Key]

        [Column("id_vol")]
        public int Id_vol { get; set; }

        [Column("num_vol")]
        public string? Num_vol { get; set; }

        [Column("id_aeronef")]
        public int Id_aeronef { get; set; }
        public Avion? Avion { get; set; }


        [Column("id_itineraire")]
        public int Id_itineraire { get; set; }
        public Itineraire? Itineraire { get; set; }


        [Column("remboursement")]
        public double Remboursement { get; set; }


        [Column("date_depart")]
        public DateTime Date_depart { get; set; }

        [Column("heure_depart")]
        public DateTime Heure_depart { get; set; }
    }
}
