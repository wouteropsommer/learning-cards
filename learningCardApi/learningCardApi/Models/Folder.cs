using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace learningCardApi.Models
{
    public class Folder
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Parent { get; set; }
        public int UserId { get; set; }

        public Folder(string name, int parent, int userId)
        {
            Name = name;
            Parent = parent;
            UserId = userId;
        }
    }
}
