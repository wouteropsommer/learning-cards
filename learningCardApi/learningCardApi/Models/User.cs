using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace learningCardApi.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public ICollection<CardSet> CardSets { get; set; }
        public ICollection<Folder> Folders { get; set; }

        public User(string firstName, string lastName, string email)
        {
            FirstName = firstName;
            LastName = lastName;
            Email = email;

            CardSets = new List<CardSet>();
            Folders = new List<Folder>();
        }
        public User(List<CardSet> sets, List<Folder> folders)
        {
            this.CardSets = sets;
            this.Folders = folders;
        }
        public User()
        {
            CardSets = new List<CardSet>();
            Folders = new List<Folder>();
        }
    }
}
