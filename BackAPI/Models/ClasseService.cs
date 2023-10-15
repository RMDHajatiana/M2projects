using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BackAPI.Models
{
    [Table("classeservice")]
    public class ClasseService
    {
        [Key]
        [Column("id_classe")]
        public int Id_classe { get; set; }

        [Column("num_siege")]
        public int Num_siege { get; set; }

        [Column("type_classe")]
        public string? Type_classe { get; set; }
    }
}
