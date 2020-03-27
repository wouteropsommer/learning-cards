using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace learningCardApi.Models
{
    public interface IFolderRepository
    {
        Folder GetBy(int id);
        IEnumerable<Folder> GetAll();
        void Add(Folder folder);
        void Delete(Folder folder);
        void Update(Folder folder);
        void SaveChanges();
    }
}
