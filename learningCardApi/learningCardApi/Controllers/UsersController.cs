using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using learningCardApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace learningCardApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        public UsersController(IUserRepository context)
        {
            _userRepository = context;
        }

        [HttpGet]
        public IEnumerable<User> GetUsers()
        {
            return _userRepository.GetAll();
        }

        [HttpGet("{email}")]
        public ActionResult<User> GetUser(string email)
        {
            User user = _userRepository.GetBy(email);
            if (user == null) return NotFound();
            return user;
        }

        [HttpPost]
        public ActionResult<User> PostUser(User user)
        {
            _userRepository.Add(user);
            _userRepository.SaveChanges();

            return CreatedAtAction(nameof(GetUsers), new { id = user.Id }, user);
        }
            // PUT: api/User/5
        [HttpPut("{id}")]
        public IActionResult PutUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }
            _userRepository.Update(user);
            _userRepository.SaveChanges();
            return NoContent();
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public ActionResult<User> DeleteUser(string email)
        {
            User user = _userRepository.GetBy(email);
            if (user == null)
            {
                return NotFound();
            }
            _userRepository.Delete(user);
            _userRepository.SaveChanges();
            return user;
        }
    }
}