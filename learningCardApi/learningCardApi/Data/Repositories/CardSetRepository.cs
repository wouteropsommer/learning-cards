using learningCardApi.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace learningCardApi.Data.Repositories
{
    public class CardSetRepository : ICardSetRepository
    {
        private readonly LearningCardContext _context;
        private readonly DbSet<CardSet> _cardSets;

        public CardSetRepository(LearningCardContext dbContext)
        {
            _context = dbContext;
            _cardSets = dbContext.CardSets;
        }

        public IEnumerable<CardSet> GetAll()
        {
            return _cardSets.ToList();
        }

        public CardSet GetBy(int id)
        {
            return _cardSets.SingleOrDefault(c => c.Id == id);
        }

        public void Add(CardSet cardSet)
        {
            _cardSets.Add(cardSet); 
        }

        public void Delete(CardSet cardSet)
        {
            _cardSets.Remove(cardSet);
        }
        public void Update(CardSet cardSet)
        {
            _context.Update(cardSet);
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }

        
    }
}
