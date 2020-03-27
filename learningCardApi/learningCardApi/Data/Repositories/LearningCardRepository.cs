using learningCardApi.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace learningCardApi.Data.Repositories
{
    public class LearningCardRepository: ILearningCardRepository {
    
    private readonly LearningCardContext _context;
    private readonly DbSet<LearningCard> _learningCards;

    public LearningCardRepository(LearningCardContext dbContext)
    {
        _context = dbContext;
        _learningCards = dbContext.LearningCards;
    }

    public IEnumerable<LearningCard> GetAll()
    {
        return _learningCards.ToList();
    }

    public LearningCard GetBy(int id)
    {
        return _learningCards.SingleOrDefault(f => f.Id == id);
    }
    public void Add(LearningCard learningCard)
    {
        _learningCards.Add(learningCard);
    }

    public void Delete(LearningCard learningCard)
    {
        _learningCards.Remove(learningCard);
    }

    public void Update(LearningCard learningCard)
    {
        _context.Update(learningCard);
    }

    public void SaveChanges()
    {
        _context.SaveChanges();
    }
}
}

