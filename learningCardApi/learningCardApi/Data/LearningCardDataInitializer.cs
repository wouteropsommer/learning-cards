using learningCardApi.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace learningCardApi.Data
{    
    public class LearningCardDataInitializer
    {
        private readonly LearningCardContext _dbContext;
        private readonly UserManager<IdentityUser> _identityUserManager;

        public LearningCardDataInitializer(LearningCardContext dbContext, UserManager<IdentityUser> userManager)
        {
            _dbContext = dbContext;
            _identityUserManager = userManager;
        }

        public async Task InitializeData()
        {
            _dbContext.Database.EnsureDeleted();
            if (_dbContext.Database.EnsureCreated())
            {
                User gebruiker1 = new User { Email = "web4@hogent.be", FirstName = "Admin", LastName = "nistrator" };
                _dbContext.Add(gebruiker1);
                await CreateUser(gebruiker1.Email, "Test123@!");

                List<CardSet> cardSets = new List<CardSet>();
                CardSet set1 = new CardSet("Hoofdstuk1", 1, gebruiker1.Id);
                CardSet set2 = new CardSet("Engels basis", 0, gebruiker1.Id);
                CardSet set3 = new CardSet("QUIZ", 0, gebruiker1.Id);
                LearningCard l1 = new LearningCard("bonjour", "hallo", set1.Id);
                LearningCard l2 = new LearningCard("Sortir", "Uitgaan", set1.Id);
                LearningCard l3 = new LearningCard("Rire", "Lachen", set1.Id);
                LearningCard l4 = new LearningCard("Anniversaire", "Verjaardag", set1.Id);

                set1.Cards.Add(l1);
                set1.Cards.Add(l2);
                set1.Cards.Add(l3);
                set1.Cards.Add(l4);

                LearningCard l5 = new LearningCard("Table", "tafel", set2.Id);
                LearningCard l6 = new LearningCard("Fast", "Snel", set2.Id);
                LearningCard l7 = new LearningCard("Strong", "Sterk", set2.Id);
                LearningCard l8 = new LearningCard("Mouse", "Muis", set2.Id);

                set2.Cards.Add(l5);
                set2.Cards.Add(l6);
                set2.Cards.Add(l7);
                set2.Cards.Add(l8);

                LearningCard l9 = new LearningCard("In welk jaar werd de Berlijnse muur vernield?", "1989", set3.Id);
                LearningCard l10 = new LearningCard("Welke Griekse astronoom beweerde dat de zon rond de aarde draait?", "Ptolomeus", set3.Id);
                LearningCard l11 = new LearningCard("In welke Duitse stad pleegde Adolf Hitler zelfmoord toen de oorlog verloren bleek?", "Berlijn", set3.Id);
                LearningCard l12 = new LearningCard("Wie vond de barometer uit? ", "Torricelli", set3.Id);

                set3.Cards.Add(l9);
                set3.Cards.Add(l10);
                set3.Cards.Add(l11);
                set3.Cards.Add(l12);

                //cardSets.Add(set1);
                //cardSets.Add(set2);
                //cardSets.Add(set3);
                //cardSets.Add(set4);

                Folder folder1 = new Folder("FRANS", 0, gebruiker1.Id);
                Folder folder2 = new Folder("ENGELS", 0, gebruiker1.Id);
                Folder folder3 = new Folder("DUITS", 0, gebruiker1.Id);
                Folder folder4 = new Folder("SPAANS", 0, gebruiker1.Id);

                gebruiker1.Folders.Add(folder1);
                gebruiker1.Folders.Add(folder2);
                gebruiker1.Folders.Add(folder3);
                gebruiker1.Folders.Add(folder4);

                gebruiker1.CardSets.Add(set1);
                gebruiker1.CardSets.Add(set2);
                gebruiker1.CardSets.Add(set3);

                _dbContext.SaveChanges();

            }
        }

        private async Task CreateUser(string email, string password)
        {
            var identityUser = new IdentityUser { UserName = email, Email = email };
            await _identityUserManager.CreateAsync(identityUser, password);
        }



    }
}
