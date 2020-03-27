using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace learningCardApi.Models
{
    public interface ILearningCardRepository
    {
        LearningCard GetBy(int id);
        IEnumerable<LearningCard> GetAll();
        void Add(LearningCard learningCard);
        void Delete(LearningCard learningCard);
        void Update(LearningCard learningCard);
        void SaveChanges();
    }
}
