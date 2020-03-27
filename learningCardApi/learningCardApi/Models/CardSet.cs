using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace learningCardApi.Models
{
    public class CardSet
    {
        #region Props
        public int Id { get; set; }
        public int Parent { get; set; }
        public string Title { get; set; }
        public int UserId { get; set; }
        public ICollection<LearningCard> Cards { get; set; }
        #endregion


        public CardSet(string title, int parent, int userId)
        {
            Title = title;
            Parent = parent;
            Cards = new List<LearningCard>();
            UserId = userId;
        }
    }
}
