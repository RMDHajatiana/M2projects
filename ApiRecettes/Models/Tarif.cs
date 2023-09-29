
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Recettes.Models
{

    [Table ("tarif")]
    public class Tarif
    {
        [Key]

        [Column("code_tarif")]
        public int Code_tarif { get; set; }

        [Column("montant")]
        public double Montant { get; set; }
    }
}
