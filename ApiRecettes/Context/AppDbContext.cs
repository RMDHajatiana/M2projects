using Microsoft.EntityFrameworkCore;
using Recettes.Models;

namespace Recettes.Models
{
    public class AppDbContext: DbContext
    {

        public AppDbContext()
        { }
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) 
        { }

        public DbSet<Tarif> Tarif { get; set; }
        public DbSet<Traiter> Traiter { get; set; }
        public DbSet<Itineraire> Itineraire { get; set; }
        public DbSet<Reservation> Reservation { get; set; }
        public DbSet<ClasseService> ClasseService { get; set; }
        public DbSet<Avion> Avion { get; set; }
        public DbSet<Vol> Vols { get; set; }
        public DbSet<Personne> Personne { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Reservation>().HasOne(r => r.ClasseService).WithMany().HasForeignKey(r => r.Code_classe);

            modelBuilder.Entity<Reservation>().HasOne(r => r.Vol).WithMany().HasForeignKey(r => r.Num_vol);

            modelBuilder.Entity<Reservation>().HasOne(r => r.Tarif).WithMany().HasForeignKey(r => r.Code_tarif);

            modelBuilder.Entity<Reservation>().HasOne(r => r.Personne).WithMany().HasForeignKey(r => r.Id_perso);

            modelBuilder.Entity<Vol>().HasOne(r => r.Avion).WithMany().HasForeignKey(r => r.Id_aeronef);

            modelBuilder.Entity<Vol>().HasOne(r => r.Itineraire).WithMany().HasForeignKey(r => r.Code_escale);

            modelBuilder.Entity<Traiter>().HasOne(r => r.Tarif).WithMany().HasForeignKey(r => r.Code_tarif);

            modelBuilder.Entity<Traiter>().HasOne(r => r.Personne).WithMany().HasForeignKey(r => r.Id_perso);

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(" Host=localhost; Port=5432; Database=test; Username=postgres; Password=0000 ");
        }

    }
}
