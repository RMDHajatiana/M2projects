using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BackAPI.Models
{
    [Table("tarif")]
    public class Tarif
    {
        [Key]
        [Column("id_tarif")]
        public int Id_tarif { get; set; }

        [Column("id_classe")]
        public int Id_classe { get; set; }
        public ClasseService? ClasseService { get; set; }

        [Column("id_vol")]
        public int Id_vol { get; set; }
        public Vol? Vol { get; set; }

        [Column("montant_tarif")]
        public double Montant_tarif { get; set; }
    }
}
