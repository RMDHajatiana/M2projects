using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Recettes.Models
{

    [Table("itineraire")]
    public class Itineraire
    {
        [Key]
        [Column("code_escale")]
        public int Code_escale { get; set; }

        [Column("aeroport_depart")]
        public string? Aeroport_depart { get; set; }

        [Column("aeroport_arrive")]
        public string? Aeroport_arrive { get; set; }
    }
}
