using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Recettes.Models
{

    [Table("classeservice")]
    public class ClasseService
    {
        [Key]
        [Column("code_classe")]
        public int Code_classe { get; set; }

        [Column("num_siege")]
        public int Num_siege { get; set; }

        [Column("type_classe")]
        public string? Type_classe { get; set; }
    }
}
    
