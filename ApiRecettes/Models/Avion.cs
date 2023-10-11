using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Recettes.Models
{

    [Table ("avion")]
    public class Avion
    {
        [Key]
        [Column("id_aeronef") ]
        public int Id_aeronef { get; set; }

        [Column("type_aeronef")]
        public string? Type_aeronef { get; set; }

        [Column("capacite")]
        public int Capacite { get; set; }
    }
}
