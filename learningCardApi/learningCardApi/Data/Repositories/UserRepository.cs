using learningCardApi.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace learningCardApi.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly LearningCardContext _context;
        private readonly DbSet<User> _users;

        public UserRepository(LearningCardContext dbContext)
        {
            _context = dbContext;
            _users = dbContext.Users;
        }
        public IEnumerable<User> GetAll()
        {
            return _users.Include(u => u.Folders).Include(u => u.CardSets).ToList();  //INCLUDES NOG TOEVOEGEN!!
        }

        public User GetBy(string email)
        {
            return _users.Include(u => u.Folders).Include(u => u.CardSets).SingleOrDefault(u => u.Email == email);
        }
        public void Add(User user)
        {
            _users.Add(user);
        }

        public void Delete(User user)
        {
            _users.Remove(user);
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }

        public void Update(User user)
        {
            _context.Update(user);
        }
    }
}
