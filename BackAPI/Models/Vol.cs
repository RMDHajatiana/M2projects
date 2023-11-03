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

        [StringLength(6)]
        public string? Num_vol { get; set; }


        [Column("id_aeronef")]
        public int AvionID { get; set; }

        [Column("statut")]

        public string ? Statut { get; set; }


        [Column("id_itineraire")]
        public int ItineraireID { get; set; }

        [Column("date_depart")]
        public DateOnly Date_depart { get; set; }

        [Column("heure_depart")]
        public TimeOnly Heure_depart { get; set; }


        public   Avion ? Avion { get; set; }

        public  Itineraire ? Itineraire { get; set; }

        public ICollection<Tarif>? Tarifs { get; set; }

        public ICollection<Reservation>? Reservations { get; set; }


    }
}
