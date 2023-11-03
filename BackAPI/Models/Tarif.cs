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
        public int ClasseServiceID { get; set; }

        [Column("id_vol")]
        public int VolID { get; set; }

        [Column("montant_tarif")]
        public double Montant_tarif { get; set; }

        public Vol? Vol { get; set; }
        public ClasseService? ClasseService { get; set; }
    }
}
