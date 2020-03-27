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
    public class FolderController : ControllerBase
    {
        private readonly IFolderRepository _folderRepository;
        public FolderController(IFolderRepository context)
        {
            _folderRepository = context;
        }

        [HttpGet]
        public IEnumerable<Folder> GetFolders()
        {
            return _folderRepository.GetAll();
        }

        [HttpGet("{id}")]
        public ActionResult<Folder> GetFolder(int id)
        {
            Folder folder = _folderRepository.GetBy(id);
            if (folder == null) return NotFound();
            return folder;
        }

        [HttpGet("{userId},{parent}")]
        public IEnumerable<Folder> getFolderWitchCorrectParent(int userId, int parent)
        {
            return _folderRepository.GetAll().Where(f => f.UserId == userId && f.Parent == parent);
        }

        [HttpPost]
        public ActionResult<Folder> PostFolder(Folder folder)
        {
            _folderRepository.Add(folder);
            _folderRepository.SaveChanges();

            return CreatedAtAction(nameof(GetFolder), new { id = folder.Id }, folder);
        }

        [HttpPut("{id}")]
        public IActionResult PutFolder(int id, Folder folder)
        {
            if (id != folder.Id)
            {
                return BadRequest();
            }
            _folderRepository.Update(folder);
            _folderRepository.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult<Folder> DeleteFolder(int id)
        {
            Folder folder = _folderRepository.GetBy(id);
            if (folder == null)
            {
                return NotFound();
            }
            _folderRepository.Delete(folder);
            _folderRepository.SaveChanges();
            return folder;
        }
    }

}