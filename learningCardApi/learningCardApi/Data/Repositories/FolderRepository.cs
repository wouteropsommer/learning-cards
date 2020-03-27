using learningCardApi.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace learningCardApi.Data.Repositories
{
    public class FolderRepository : IFolderRepository
    {

        private readonly LearningCardContext _context;
        private readonly DbSet<Folder> _folders;

        public FolderRepository(LearningCardContext dbContext)
        {
            _context = dbContext;
            _folders = dbContext.Folders;
        }

        public IEnumerable<Folder> GetAll()
        {
            return _folders.ToList();  
        }

        public Folder GetBy(int id)
        {
            return _folders.SingleOrDefault(f => f.Id == id);
        }
        public void Add(Folder folder)
        {
            _folders.Add(folder);
        }

        public void Delete(Folder folder)
        {
            _folders.Remove(folder);
        }

        public void Update(Folder folder)
        {
            _context.Update(folder);
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }
    }
}
