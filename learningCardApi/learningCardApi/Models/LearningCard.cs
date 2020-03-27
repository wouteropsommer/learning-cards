using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace learningCardApi.Models
{
    public class LearningCard
    {
        public int Id { get; set; }
        public string Front { get; set; }
        public string Back { get; set; }
        public int CardSetId { get; set; }

        public LearningCard(string front, string back, int cardSetId)
        {
            Front = front;
            Back = back;
            CardSetId = cardSetId;
        }
    }
}
