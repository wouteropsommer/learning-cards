﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace learningCardApi.Models
{
    public interface IUserRepository
    {
        User GetBy(string email);
        IEnumerable<User> GetAll();
        void Add(User user);
        void Delete(User user);
        void Update(User user);
        void SaveChanges();
    }
}
