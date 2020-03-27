using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace learningCardApi.Models
{
    public interface ICardSetRepository
    {
        CardSet GetBy(int id);
        IEnumerable<CardSet> GetAll();
        void Add(CardSet cardSet);
        void Delete(CardSet cardSet);
        void Update(CardSet cardSet);
        void SaveChanges();
    }
}
