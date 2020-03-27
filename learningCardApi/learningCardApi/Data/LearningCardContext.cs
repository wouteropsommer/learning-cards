

using learningCardApi.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace learningCardApi.Data
{
    public class LearningCardContext : IdentityDbContext
    {
        public LearningCardContext(DbContextOptions<LearningCardContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<User>()
                .HasMany(a => a.Folders)
                .WithOne();
            builder.Entity<User>()
                .HasMany(a => a.CardSets)
                .WithOne();
            builder.Entity<CardSet>()
                .HasMany(a => a.Cards)
                .WithOne();

            builder.Entity<User>().Property(u => u.FirstName).IsRequired().HasMaxLength(50);
            builder.Entity<User>().Property(u => u.LastName).IsRequired().HasMaxLength(50);
            builder.Entity<User>().Property(u => u.Email).IsRequired().HasMaxLength(100);
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Folder> Folders { get; set; }
        public DbSet<CardSet> CardSets { get; set; }
        public DbSet<LearningCard> LearningCards { get; set; }
    }
}
