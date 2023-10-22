using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BackAPI.Models
{
    [Table("itineraire")]
    public class Itineraire
    {
        [Key]
        [Column("id_itineraire")]
        public int Id_itineraire { get; set; }

        [Column("aeroport_depart")]
        public string? Aeroport_depart { get; set; }

        [Column("aeroport_arrive")]
        public string? Aeroport_arrive { get; set; }

        public ICollection<Vol> ? Vols { get; set; }

    }
}
